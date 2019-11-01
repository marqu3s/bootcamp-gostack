import * as Yup from 'yup';
import Student from '../models/Student';

class StudentController {
  async store(req, res) {
    // Data validation
    const schema = Yup.object({
      name: Yup.string()
        .required()
        .lowercase()
        .trim(),
      email: Yup.string()
        .email()
        .required()
        .trim(),
      age: Yup.number()
        .required()
        .positive()
        .integer(),
      height: Yup.number()
        .required()
        .positive(),
      weight: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed.' });
    }

    // Check if email is already in use
    const studentExists = await Student.findOne({
      where: { email: req.body.email },
    });
    if (studentExists) {
      return res
        .status(400)
        .json({ error: 'The email provided is already in use.' });
    }

    // Student doesn't exists. Create it.
    const newStudent = await Student.create(req.body);

    return res.json(newStudent);
  }

  async update(req, res) {
    // Data validation
    const schema = Yup.object({
      name: Yup.string()
        .required()
        .lowercase()
        .trim(),
      email: Yup.string()
        .email()
        .required()
        .trim(),
      age: Yup.number()
        .required()
        .positive()
        .integer(),
      height: Yup.number()
        .required()
        .positive(),
      weight: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed.' });
    }

    const student = await Student.findByPk(req.params.id);
    if (!student) {
      return res.status(400).json({ error: 'The user was not found.' });
    }

    await student.update(req.body);

    return res.json(student);
  }
}

export default new StudentController();
