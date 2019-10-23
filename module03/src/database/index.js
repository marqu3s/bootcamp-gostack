import Sequelize from 'sequelize';
import databaseConfig from '../config/database';

// Import all models here.
import User from '../app/models/User';
import File from '../app/models/File';

// Include all models in this array so they can be initialized with the
// database connection.
const models = [User, File];

class Database {
  constructor() {
    this.init();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    // Pass the connection object to all the models.
    // Activate the associations in all the models.
    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }
}

export default new Database();
