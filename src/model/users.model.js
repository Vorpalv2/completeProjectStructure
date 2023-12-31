import mongoose from "mongoose";
import passportLocalMongoose from "passport-local-mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
    },
  },
  { timestamps: true }
);

userSchema.plugin(passportLocalMongoose);

const users = mongoose.model("User", userSchema);

export default users;
