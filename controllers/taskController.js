import taskModel from "../models/taskModel.js"




// create new task 
export const createTask = async (req, res) => {
    const { title, description, due_date } = req.body;

    try {
        const newTask = new taskModel({
            title,
            description,
            due_date,
            // user_id: req.user.id
        });
        const task = await newTask.save();
        res.status(201).send('Task created successfully');
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: 'Server error' });
    }
};


// Get all tasks for the authenticated user
export const getTasks = async (req, res) => {
    try {
        const tasks = await taskModel.find().sort({ due_date: -1 });
        res.status(200).json(tasks);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Get a single task by ID
export const getTask = async (req, res) => {
    try {
        const task = await taskModel.findById(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        res.status(200).json(task);

    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

// Update task
export const updateTask = async (req, res) => {
    try {
        const { title, description, due_date, status } = req.body;

        console.log('Request Params:', req.params);
        console.log('Request Body:', req.body);

        // Ensure Task model is correctly used
        const task = await taskModel.findByIdAndUpdate(req.params.id, {
            title,
            description,
            due_date,
            status,
        }, { new: true });

        // Make sure task exists
        if (!task) {
            return res.status(404).json({ msg: 'Task not found' });
        }

        res.status(200).json('Task updated successfully');

    } catch (error) {
        console.error('Server error:', error); // Log the error for more details
        res.status(500).json({ error: 'Server error' });
    }
};


// delete a task

export const deleteTask = async (req, res) => {
    try {
        const task = await taskModel.findByIdAndDelete(req.params.id);
        if (!task) {
            return res.status(404).json({ message: 'Task not found' });
        }

        await taskModel.remove();
        res.status(200).json({ message: 'Task deleted successfully' });

    } catch (error) {
        console.error('Server error:', error);
        res.status(500).json({ error: 'Server error' })
    }
};

