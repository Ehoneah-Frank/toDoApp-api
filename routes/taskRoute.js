
import { Router } from 'express'
import { createTask, deleteTask, getTask, getTasks, updateTask } from '../controllers/taskController.js'


// create router
const taskRouter = Router()

// create routes
taskRouter.post('/tasks', createTask)
taskRouter.get('/tasks', getTasks)
taskRouter.get('/tasks/:id', getTask)
taskRouter.patch('/tasks/:id', updateTask)
taskRouter.delete('/tasks/:id', deleteTask)

export default taskRouter;