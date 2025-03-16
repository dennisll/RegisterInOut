import mongoose, { Schema } from "mongoose";
import { RegisterType } from "../../../domain";



const registerSchema = new Schema({

     data: {
        type: Date,
        required: [true, "Data is required"],
     },
     lat: {
        type: String,
        required: [true, "Lat is required"],
     },
     long: {
        type: String,
        required: [true, "Long is required"],
     },
     state: {
        type: String,
        required: [true, "State is required"],
        default: "created",
        enum: ["created", "waiting for update", "closed"],
     },
     registerType: {
        type: String,
        default: "entrance",
        enum: ["entrance", "startLunch", "endLunch", "exit"],
     },
     userId: {
      required: "The register only can be created by user",
      type: Schema.Types.ObjectId,
      ref: "User" 
     }
});

export const RegisterModel = mongoose.model("Register", registerSchema);