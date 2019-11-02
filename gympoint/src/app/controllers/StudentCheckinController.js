import { subDays } from 'date-fns';
import { Op } from 'sequelize';
import StudentCheckin from '../models/StudentCheckin';

class StudentCheckinController {
  async index(req, res) {
    const checkins = await StudentCheckin.findAll({
      where: { student_id: req.params.id },
    });

    return res.json(checkins);
  }

  async store(req, res) {
    /**
     * 5 checkins allowed in 7 days.
     */
    const startDate = subDays(new Date(), 7);

    const checkinQty = await StudentCheckin.findAll({
      where: {
        student_id: req.params.id,
        created_at: { [Op.gte]: startDate },
      },
    });

    if (checkinQty.length < 7) {
      const checkin = await StudentCheckin.create({
        student_id: req.params.id,
      });

      return res.json(checkin);
    }

    return res.status(400).json({
      error:
        'You had enough checkins for the last 7 days. You can try again tomorrow.',
    });
  }
}

export default new StudentCheckinController();
