import Sequelize from 'sequelize';
import Task from '../app/models/Task';
import User from '../app/models/User';

require('dotenv/config');

const models = [User, Task];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize(
            process.env.DB_NAME,
            process.env.DB_USERNAME,
            process.env.DB_PASSWORD,
            {
                host: process.env.DB_HOST,
                dialect: 'postgres',
            },
        );

        models.forEach((model) => model.init(this.connection));
        models.forEach(
            (model) =>
                model.associate && model.associate(this.connection.models),
        );
    }
}

export default new Database();
