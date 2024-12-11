import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: [true, "Username is Required"],
        trim: true,
        unique: true,
        lowercase: true, 
    },

    email: {
        type: String,
        required: [true, "Email is Required"],
        trim: true,
        unique: true,
        lowercase: true, 
    },
    password: {
        type: String,
        required: [true, "Password is Required"]
    },
    
    role: {
         type: String, 
         enum: ["admin", "user"], 
         default: "user" 
    },
    
}, {timestamps: true});

export const User = mongoose.model('User', userSchema);