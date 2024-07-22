import mongoose, { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";

const taskSchema = new Schema({
    title: {
        type: String,
        required: true,
    },

    description: {
        type: String,
    },

    dueDate: {
        type: Date,
    },

    status: {
        type: String,
        enum: ["incomplete", "complete"],
        default: "incomplete",
    },

    completed: {
        type: Boolean,
        required: true,
        default: false,
    },

    // user_id: {
    //     type: mongoose.Types.ObjectId,
    //     ref: "User",
    //     required: true,
    // },
    
},{ timestamps: true });

taskSchema.plugin(toJSON);

const taskModel = model("Task", taskSchema);

export default taskModel;