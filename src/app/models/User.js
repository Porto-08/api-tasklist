import bcryptjs from 'bcryptjs';
import Sequelize, { Model } from 'sequelize';

class User extends Model {
    static init(sequelize) {
        super.init(
            {
                username: Sequelize.STRING,
                email: Sequelize.STRING,
                password: Sequelize.VIRTUAL,
                password_hash: Sequelize.STRING,
            },
            {
                sequelize,
            },
        );

        this.addHook('beforeSave', async (user) => {
            if (user.password) {
                user.password_hash = await bcryptjs.hash(user.password, 8);
            }
        });

        return this;
    }

    checkPassword(password) {
        return bcryptjs.compare(password, this.password_hash);
    }
}

export default User;
