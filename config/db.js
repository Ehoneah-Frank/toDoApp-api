import mongoose from "mongoose";
import 'dotenv/config';

const connectionString = process.env.MONGO_URL;


// creating a database connection

const dbConnection = async () =>{
    mongoose.connect(connectionString).
    then(() =>{
        console.log('Connected to Database');
    })
}

export default dbConnection;