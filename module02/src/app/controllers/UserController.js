import User from '../models/User';

class UserController {
  async store(req, res) {
    // Check it the user already exists by search for the user's email.
    const userExists = await User.findOne({ where: { email: req.body.email } });
    if (userExists) {
      return res.status(400).json({ error: 'User already exists.' });
    }

    // User doesn't exists. Create it.
    // const user = await User.create(req.body); // return full user data
    const { id, name, email, provider } = await User.create(req.body); // return only some data

    return res.json({
      id,
      name,
      email,
      provider,
    });
  }
}

export default new UserController();
