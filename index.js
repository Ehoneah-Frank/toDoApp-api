import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import expressOasGenerator from 'express-oas-generator';
import dbConnection from './config/db.js';
import userRouter from './routes/userRoute.js';
import taskRouter from './routes/taskRoute.js';



// connect to database
await mongoose.connect(process.env.MONGO_URL);
dbConnection();


// create an express app
const toDoApp = express();

expressOasGenerator.handleResponses(toDoApp, {
    alwaysServeDocs: true,
    tags: ['task'],
    mongooseModels: mongoose.modelNames()
});

// Apply middlewares
toDoApp.use(express.json());
toDoApp.use(cors());
toDoApp.use(express.urlencoded({ extended: true }));



// Routes
// toDoApp.use('/user', userRouter);
toDoApp.use(taskRouter);
expressOasGenerator.handleRequests();
toDoApp.use((req, res) => res.redirect('/api-docs'));





//start the server
toDoApp.listen(8000, () => {
    console.log('Server is running on port 8000');
});



