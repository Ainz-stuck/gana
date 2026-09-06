import mongoose from "mongoose";


const userSchema = new mongoose.Schema({
    fullName: {type:String, required: true, trim: true},
    email: {type:String, required: true, trim: true},
    password: {type:String, required: true,},
    role: {type:String, enum: ["superadmin", "admin", "awaiting"], default: "awaiting"},
    org: {type:String, enum: ["food", "hardware", "dealership", "not assigned"], default: "not assigned"}
}, {timestamps: true});


const userModel = mongoose.models.users || mongoose.model("users", userSchema);

export default userModel;