import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Import all models here.
import User from '../app/models/User';
import Student from '../app/models/Student';
import StudentCheckin from '../app/models/StudentCheckin';
import Plan from '../app/models/Plan';
import Enrollment from '../app/models/Enrollment';
import HelpOrder from '../app/models/HelpOrder';

// Include all models in this array so they can be initialized with the
// database connection.
const models = [User, Student, StudentCheckin, Plan, Enrollment, HelpOrder];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Pass the connection object to all the models.
    models.map(model => model.init(this.connection));
  }
}

export default new Database();
