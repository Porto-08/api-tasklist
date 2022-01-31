import jwt from 'jsonwebtoken';
import User from '../models/User';

class SessionController {
    async store(req, res) {
        const { email, password } = req.body;

        const user = await User.findOne({
            where: { email },
        });

        if (!user) {
            return res.status(401).json({ error: 'User not found.' });
        }

        if (!(await user.checkPassword(password))) {
            return res.status(401).json({ error: 'Email/Password incorret' });
        }

        const { id, username } = user;

        return res.status(200).json({
            user: {
                id,
                username,
                email,
            },
            token: jwt.sign({ id }, '16be10699a99b19be5bf5f028f183831', {
                expiresIn: '7d',
            }),
        });
    }
}

export default new SessionController();
