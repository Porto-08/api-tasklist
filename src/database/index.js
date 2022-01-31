import Sequelize from 'sequelize';
import config from '../config/database';

import User from '../app/models/User';

require('dotenv/config');

const models = [User];

class Database {
    constructor() {
        this.init();
    }

    init() {
        this.connection = new Sequelize({
            host: process.env.DB_HOST,
            dialect: process.env.DB_DIALECT,
            username: process.env.DB_USERNAME,
            password: process.env.DB_PASSWORD,
            database: process.env.DB_NAME,
            ...config,
        });

        models.forEach((model) => model.init(this.connection));
    }
}

export default new Database();
