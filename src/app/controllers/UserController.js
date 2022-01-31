import User from '../models/User';

class UserController {
    async store(req, res) {
        return res.json({ message: 'Tudo certo' });
    }
}

export default new UserController();
