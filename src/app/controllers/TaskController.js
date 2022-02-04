import Task from '../models/Task';
import * as Yup from 'yup';

class TaskController {
    async index(req, res) {
        try {
            const tasks = await Task.findAll({
                where: { user_id: req.userId },
            });

            return res.json(tasks);
        } catch (error) {
            return res.status(400).json({ error: 'Error to get tasks' });
        }
    }

    async getConcluded(req, res) {
        try {
            const tasks = await Task.findAll({
                where: { user_id: req.userId, check: true },
            });

            return res.json(tasks);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Error to get concluded tasks' });
        }
    }

    async store(req, res) {
        const schema = Yup.object().shape({
            task: Yup.string().required().min(4),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { task } = req.body;

        const taskExists = await Task.findOne({
            where: { task },
        });

        if (taskExists) {
            return res.status(400).json({ error: 'Task already exists' });
        }

        const taskCreated = await Task.create({
            task,
            user_id: req.userId,
        });

        return res.json({
            message: 'Task created successfully',
            taskCreated,
        });
    }

    async update(req, res) {
        const schema = Yup.object().shape({
            task: Yup.string().required().min(4),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { task, id } = req.body;

        const taskExists = await Task.findByPk(id);

        const taskNameExists = await Task.findOne({
            where: { task },
        });

        if (taskNameExists) {
            return res.status(400).json({ error: 'Task already exists' });
        }
        
        try {
            const taskUpdated = await taskExists.update({
                task,
            });

            return res.json({
                message: 'Task updated successfully',
                taskUpdated,
            });
        } catch (error) {
            console.log(error);
            return res.status(400).json({ error: 'Error to update task' });
        }
    }
}

export default new TaskController();
