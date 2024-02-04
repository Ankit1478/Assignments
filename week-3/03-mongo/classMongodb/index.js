const mongoose = require("mongoose");

mongoose.connect("mongodb://127.0.0.1:27017/user_app");

const userSchema = new mongoose.Schema({
  name: String,
  phonenumber: Number,
  email: String,
});

const User = mongoose.model("User", userSchema);

const studentsData = [
  {
    name: "Kundan",
    phonenumber: 7378784378347934,
    email: "ashifnidhi@gmail.com",
  },
  {
    name: "Ram",
    phonenumber: 98897,
    email: "ashifnidhi@.com",
  },
];

User.insertMany(studentsData)
  .then(() => {
    console.log("Success");
  })
  .catch((error) => {
    console.error(error);
  });
