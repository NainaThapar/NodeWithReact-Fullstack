const mongoose = require("mongoose");
//const Schema = mongoose.Schema;
const { Schema } = mongoose; //destructuring

const userSchema = new Schema({
  googleId: String
});

mongoose.model("users", userSchema); //two arguements - tryting to load something into mongoose
