import * as Yup from 'yup';
import { addMonths, format, parseISO } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { Op } from 'sequelize';
import Enrollment from '../models/Enrollment';
import Plan from '../models/Plan';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

class EnrollmentController {
  async index(req, res) {
    const enrollments = await Enrollment.findAll();

    return res.json(enrollments);
  }

  async store(req, res) {
    // Data validation
    const schema = Yup.object({
      student_id: Yup.number()
        .required()
        .integer(),
      plan_id: Yup.number()
        .required()
        .integer(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed.' });
    }

    /**
     * Check if the student does not have another plan active in the same period.
     */
    const startDate = parseISO(req.body.start_date);
    const enrollmentExists = await Enrollment.findOne({
      where: {
        student_id: req.body.student_id,
        start_date: { [Op.lte]: startDate },
        end_date: { [Op.gte]: startDate },
      },
    });
    if (enrollmentExists) {
      return res
        .status(400)
        .json({ error: 'The student is already enrolled in another plan.' });
    }

    /**
     * Calculated fields.
     */
    const plan = await Plan.findByPk(req.body.plan_id);
    const totalPrice = plan.price * plan.duration;
    const endDate = addMonths(startDate, plan.duration);

    /**
     * Save the new enrollment.
     */
    const enrollment = await Enrollment.create({
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
      start_date: req.body.start_date,
      end_date: endDate,
      price: totalPrice,
    });

    /**
     * Send an e-mail to the student.
     */
    const student = await Student.findByPk(req.body.student_id);
    const formattedEndDate = format(endDate, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: '[GymPoint] Informações sobre o seu novo plano',
      html: `Olá ${student.name}!<br><br>
        Aqui estão os detalhes do seu novo plano na GymPoint:<br>
        - Nome do plano: ${plan.title}<br>
        - Data de término: ${formattedEndDate}<br>
        - Valor pago: ${totalPrice}<br><br>
        Seja bem-vindo a GymPoint!`,
    });

    return res.json(enrollment);
  }

  async update(req, res) {
    // Data validation
    const schema = Yup.object({
      student_id: Yup.number()
        .required()
        .integer(),
      plan_id: Yup.number()
        .required()
        .integer(),
      start_date: Yup.date().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed.' });
    }

    /**
     * Check if the student does not have another plan active in the same period.
     */
    const startDate = parseISO(req.body.start_date);
    const enrollmentExists = await Enrollment.findOne({
      where: {
        id: { [Op.ne]: req.params.id },
        student_id: req.body.student_id,
        start_date: { [Op.lte]: startDate },
        end_date: { [Op.gte]: startDate },
      },
    });
    if (enrollmentExists) {
      return res
        .status(400)
        .json({ error: 'The student is already enrolled in another plan.' });
    }

    /**
     * Calculated fields.
     */
    const plan = await Plan.findByPk(req.body.plan_id);
    const totalPrice = plan.price * plan.duration;
    const endDate = addMonths(startDate, plan.duration);

    /**
     * Update the enrollment.
     */
    const enrollment = await Enrollment.findByPk(req.params.id);
    await enrollment.update({
      student_id: req.body.student_id,
      plan_id: req.body.plan_id,
      start_date: req.body.start_date,
      end_date: endDate,
      price: totalPrice,
    });

    /**
     * Send an e-mail to the student.
     */
    const student = await Student.findByPk(req.body.student_id);
    const formattedEndDate = format(endDate, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: '[GymPoint] Informações sobre mudanças no plano',
      html: `Olá ${student.name}!<br><br>
        Aqui estão os detalhes do seu plano na GymPoint:<br>
        - Nome do plano: ${plan.title}<br>
        - Data de término: ${formattedEndDate}<br>
        - Valor pago: ${totalPrice}<br><br>
        Bora malhar!<br>
        Equipe GymPoint`,
    });

    return res.json(enrollment);
  }

  async delete(req, res) {
    const enrollment = await Enrollment.findByPk(req.params.id);
    if (!enrollment) {
      return res
        .status(400)
        .json({ error: 'This enrollment does not exists.' });
    }

    await enrollment.destroy();

    return res.send();
  }
}

export default new EnrollmentController();
