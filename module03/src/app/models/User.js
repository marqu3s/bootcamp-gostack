import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
  /**
   * @param {Sequelize} sequelize The database connection
   */
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
        provider: Sequelize.BOOLEAN,
      },
      {
        sequelize,
      }
    );

    this.addHook('beforeSave', async user => {
      if (user.password) {
        // if attribute 'password' is present...
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /**
   * Create associations with other models.
   * @param {*} models
   */
  static associate(models) {
    this.belongsTo(models.File, { foreignKey: 'avatar_id', as: 'avatar' });
  }

  /**
   * Check if the password matches the one stored in database.
   * @param {String} password
   */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
