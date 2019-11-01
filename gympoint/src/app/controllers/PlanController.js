import * as Yup from 'yup';
import Plan from '../models/Plan';

class PlanController {
  async index(req, res) {
    const plans = await Plan.findAll();

    return res.json(plans);
  }

  async store(req, res) {
    // Data validation
    const schema = Yup.object({
      title: Yup.string()
        .required()
        .trim(),
      duration: Yup.number()
        .required()
        .integer(),
      price: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed.' });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });
    if (planExists) {
      return res.status(400).json({ error: 'This title is already in use.' });
    }

    const plan = await Plan.create(req.body);

    return res.json(plan);
  }

  async update(req, res) {
    // Data validation
    const schema = Yup.object({
      title: Yup.string()
        .required()
        .trim(),
      duration: Yup.number()
        .required()
        .integer(),
      price: Yup.number()
        .required()
        .positive(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Data validation failed.' });
    }

    const planExists = await Plan.findOne({
      where: { title: req.body.title },
    });
    if (planExists) {
      return res.status(400).json({ error: 'This title is already in use.' });
    }

    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists.' });
    }

    await plan.update(req.body);

    return res.json(plan);
  }

  async delete(req, res) {
    const plan = await Plan.findByPk(req.params.id);
    if (!plan) {
      return res.status(400).json({ error: 'This plan does not exists.' });
    }

    await plan.destroy();

    return res.send();
  }
}

export default new PlanController();
