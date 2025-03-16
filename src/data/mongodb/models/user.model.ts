import mongoose, { Schema } from "mongoose";

const userSchema = new Schema({
  
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: true,
  },
  password: {
    type: String,
    required: [true, "Password is required"],
  },
  displayName: {
    type: String,
    required: [true, "FirstName is required"],
  },
  firstName: {
    type: String,
    required: [true, "FirstName is required"],
  },
  lastName: {
    type: String,
    required: [true, "LastName is required"],
  },
  city: {
    type: String,
    required: [true, "City is required"],
  },
  street: {
    type: String,
    required: [true, "Street is required"],
  },
  houseNumber: {
    type: String,
    required: [true, "HouseNumber is required"],
  },
  cep: {
    type: String,
    required: [true, "Cep is required"],
  },
  phoneNumber: {
    type: String,
    required: [true, "PhoneNumber is required"],
  },
  photoUrl: {
    type: String,
    default: "",
    //required: [true, 'FirstName is required']
  },
  isEmailVerified: {
    type: Boolean,
    default: false,
  },
  refreshToken: {
    type: Boolean,
    default: true,
  },
  role: {
    type: [String],
    default: ["USER_ROLE"],
    enum: ["USER_ROLE", "SUPERVISOR_ROLE", "ADMIN_ROLE"],
  },
/*   registersId: [{
    type: Schema.Types.ObjectId,
    ref: "Register"
  }] */
});

export const UserModel = mongoose.model("User", userSchema);
