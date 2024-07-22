import { Schema, model } from "mongoose";
import { toJSON } from "@reis/mongoose-to-json";
import mongoose from "mongoose";

const userSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
}, { timestamps: true });


userSchema.plugin(toJSON);

const User = mongoose.model("User", userSchema);

export default User;
