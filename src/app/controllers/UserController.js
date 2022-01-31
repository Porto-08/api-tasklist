import User from '../models/User';

class UserController {
    async store(req, res) {
        const regexEmail =
            /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;

        const { username, email, password_hash } = req.body;

        if (!username || !email || !password_hash) {
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
                password_hash,
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
}

export default new UserController();
