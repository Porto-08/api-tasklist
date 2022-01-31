import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                username: Sequelize.STRING,
                email: Sequelize.STRING,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            },
        );
    }
}

export default User;
