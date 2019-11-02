import ptBR from 'date-fns/locale/pt-BR';
import { format } from 'date-fns';
import HelpOrder from '../models/HelpOrder';
import Student from '../models/Student';
import Mail from '../../lib/Mail';

class HelpOrderController {
  async index(req, res) {
    const orders = await HelpOrder.findAll({
      where: { student_id: req.params.id },
    });

    return res.json(orders);
  }

  async list(req, res) {
    const orders = await HelpOrder.findAll({
      where: { answer: null },
    });

    return res.json(orders);
  }

  async store(req, res) {
    if (req.body.question === '') {
      return res.status(400).json({ error: 'Please write something.' });
    }

    const order = await HelpOrder.create({
      student_id: req.params.id,
      question: req.body.question,
    });

    return res.json(order);
  }

  async answer(req, res) {
    if (req.body.answer === '') {
      return res.status(400).json({ error: 'Please write something.' });
    }

    const order = await HelpOrder.findByPk(req.params.id);
    await order.update({
      answer: req.body.answer,
      answer_at: new Date(),
    });

    /**
     * Send an e-mail to the student.
     */
    const student = await Student.findByPk(order.student_id);
    const formattedDate = format(order.answer_at, "dd 'de' MMMM 'de' yyyy", {
      locale: ptBR,
    });
    await Mail.sendMail({
      to: `${student.name} <${student.email}>`,
      subject: '[GymPoint] Sua pergunta foi respondida',
      html: `Olá ${student.name}!<br><br>
        Em ${formattedDate} respondemos sua pergunta.<br><br>
        P: ${order.question}<br>
        R: ${order.answer}<br><br>
        Conte sempre conosco!<br>
        Equipe GymPoint`,
    });

    return res.json(order);
  }
}

export default new HelpOrderController();
