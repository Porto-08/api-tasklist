import User from '../models/User';

const regexEmail =
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
class UserController {
    async store(req, res) {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json({ error: 'Missing fields' });
        }

        if (!regexEmail.test(email)) {
            return res.status(400).json({ error: 'Invalid email' });
        }

        const userExists = await User.findOne({ where: { email } });

        if (userExists) {
            return res.status(400).json({ error: 'User already exists' });
        }

        try {
            const user = await User.create({
                username,
                email,
                password,
            });

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
        const { email, oldPassword } = req.body;

        const userExists = await User.findByPk(req.userId);
        if (!userExists) {
            return res.status(400).json({ error: 'User not found' });
        }

        if (email && !regexEmail.test(email)) {
            return res.status(400).json({ error: 'Invalid email' });
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
}

export default new UserController();
