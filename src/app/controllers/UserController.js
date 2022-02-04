import User from '../models/User';
import * as Yup from 'yup';

const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
class UserController {
    async store(req, res) {
        const schema = Yup.object().shape({
            username: Yup.string().required().min(4),
            email: Yup.string().required().email(),
            password: Yup.string().required().min(6),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        try {
            const user = await User.create(req.body);

            return res.json({
                message: 'User created successfully',
                id: user.id,
                name: user.username,
                email: user.email,
            });
        } catch (error) {
            return res.status(400).json({ error: 'Error creating user' });
        }
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            username: Yup.string().min(4),
            email: Yup.string().email(),
            password: Yup.string().min(6),
            oldPassword: Yup.string()
                .min(6)
                .when('password', (password, field) =>
                    password ? field.required() : field,
                ),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(401).json({ error: 'Validation fails' });
        }

        const { email, oldPassword } = req.body;

        const userExists = await User.findByPk(req.userId);
        if (!userExists) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (email && email !== userExists.email) {
            const userExistsEmail = await User.findOne({ where: { email } });

            if (userExistsEmail) {
                return res.status(400).json({ error: 'Email already in use' });
            }
        }

        if (oldPassword && !(await userExists.checkPassword(oldPassword))) {
            return res.status(401).json({ error: 'Invalid password' });
        }

        try {
            const user = await userExists.update(req.body);

            return res.json({
                message: 'User updated successfully',
                id: user.id,
                name: user.username,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Error updating user' });
        }
    }

    async delete(req, res) {
        const userExists = await User.findByPk(req.userId);

        if (!userExists) {
            return res.status(400).json({ error: 'User not found' });
        }

        try {
            await userExists.destroy();

            return res.json({
                message: 'User deleted successfully',
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Error deleting user' });
        }
    }
}

export default new UserController();
