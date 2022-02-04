import Task from '../models/Task';
import * as Yup from 'yup';

class TaskController {
    async getNotConcluded(req, res) {
        try {
            const tasks = await Task.findAll({
                where: { user_id: req.userId, check: false },
            });

            return res.json(tasks);
        } catch (error) {
            return res
                .status(400)
                .json({ error: 'Error to get not concluded tasks' });
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
            task: Yup.string().min(4),
            check: Yup.boolean(),
        });

        if (!(await schema.isValid(req.body))) {
            return res.status(400).json({ error: 'Validation fails' });
        }

        const { id } = req.params;

        const taskExists = await Task.findByPk(id);

        if (!taskExists) {
            return res.status(400).json({ error: 'Task not exists' });
        }

        try {
            const taskUpdated = await taskExists.update(req.body);

            return res.json({
                message: 'Task updated successfully',
                taskUpdated,
            });
        } catch (error) {
            return res.status(400).json({ error: 'Error to update task' });
        }
    }

    async delete(req, res) {
        const { id } = req.params;

        const taskExists = await Task.findByPk(id);

        if (!taskExists) {
            return res.status(400).json({ error: 'Task not exists' });
        }

        if (taskExists.user_id !== req.userId) {
            return res
                .status(401)
                .json({
                    error: 'You dont have permission to delete this task',
                });
        }

        try {
            await taskExists.destroy();

            return res.json({ message: 'Task deleted successfully' });
        } catch (error) {
            return res.status(400).json({ error: 'Error to delete task' });
        }
    }
}

export default new TaskController();
