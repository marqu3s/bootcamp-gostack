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

        // Virtual field to provide a URL to the avatar.
        url: {
          type: Sequelize.VIRTUAL,
          get() {
            return `${process.env.APP_URL}/files/${this.path}`;
          },
        },
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default File;
