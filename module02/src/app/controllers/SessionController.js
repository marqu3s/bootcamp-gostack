import jwt from 'jsonwebtoken';
import User from '../models/User';
import authConfig from '../../config/auth';

class SessionController {
  async store(req, res) {
    const { email, password } = req.body;

    const user = await User.findOne({ where: { email } }); // email: email

    // Verify that user exists.
    if (!user) {
      res.status(401).json({ error: 'User not found.' });
    }

    // Verify it the provided password matches.
    if (!(await user.checkPassword(password))) {
      res.status(401).json({ error: 'Password does not match.' });
    }

    return res.json({
      user: {
        id: user.id,
        name: user.name,
        email,
      },
      token: jwt.sign({ id: user.id }, authConfig.secret, {
        expiresIn: authConfig.expiresIn,
      }),
    });
  }
}

export default new SessionController();
