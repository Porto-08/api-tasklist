import jwt from 'jsonwebtoken';
import { promisify } from 'util';

require('dotenv').config();

export default async (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({ error: 'Token not provided' });
    }

    const token = authHeader.split(' ').pop();

    try {
        const decoded = await promisify(jwt.verify)(
            token,
            process.env.JWT_SECRET,
        );

        req.userId = decoded.id;

        return next();
    } catch (error) {
        return res.status(401).json({ error: 'Token invalid' });
    }
};
