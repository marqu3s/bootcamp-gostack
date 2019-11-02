import Sequelize, { Model } from 'sequelize';

class StudentCheckin extends Model {
  static init(sequelize) {
    super.init(
      {
        // Describe the model here
        student_id: Sequelize.INTEGER,
      },
      { sequelize, tableName: 'students_checkins' }
    );

    return this;
  }

  static associate(models) {
    this.belongsTo(models.Student, { foreignKey: 'student_id', as: 'student' });
  }
}

export default StudentCheckin;
