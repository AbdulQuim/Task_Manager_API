const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const User = require("../../src/models/user");
const Task = require("../../src/models/task");

const testUserId = mongoose.Types.ObjectId();

const testUser = {
  _id: testUserId,
  name: "Zain",
  email: "zain@gmail.com",
  password: "12345678",
  tokens: [
    {
      token: jwt.sign({ _id: testUserId }, process.env.JWT_TOKEN),
    },
  ],
};

const testUserTwoId = new mongoose.Types.ObjectId();
const testUserTwo = {
  _id: testUserTwoId,
  name: "Jess",
  email: "jess@example.com",
  password: "myhouse099@@",
  tokens: [
    {
      token: jwt.sign({ _id: testUserTwoId }, process.env.JWT_TOKEN),
    },
  ],
};

const taskOne = {
  _id: new mongoose.Types.ObjectId(),
  description: "First task",
  completed: false,
  user: testUser._id,
};

const taskTwo = {
  _id: new mongoose.Types.ObjectId(),
  description: "Second task",
  completed: true,
  user: testUser._id,
};

const taskThree = {
  _id: new mongoose.Types.ObjectId(),
  description: "Third task",
  completed: true,
  user: testUserTwo._id,
};

const setupDatabase = async () => {
  await User.deleteMany();
  await Task.deleteMany();
  await new User(testUser).save();
  await new User(testUserTwo).save();
  await new Task(taskOne).save();
  await new Task(taskTwo).save();
  await new Task(taskThree).save();
};

module.exports = {
  testUserId,
  testUser,
  testUserTwoId,
  testUserTwo,
  taskOne,
  taskTwo,
  taskThree,
  setupDatabase,
};
