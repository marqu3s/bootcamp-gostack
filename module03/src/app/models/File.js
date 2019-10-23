import Sequelize, { Model } from 'sequelize';

class File extends Model {
  /**
   * @param {Sequelize} sequelize The database connection
   */
  static init(sequelize) {
    super.init(
      {
        name: Sequelize.STRING,
        path: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
