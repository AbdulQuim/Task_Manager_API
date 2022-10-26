const mongoose = require("mongoose");

mongoose.connect(
  process.env.MONGODB_URL,
  { useNewURLParser: true },
  (error, result) => {
    if (error) {
      return console.log(error);
    }
  }
);

// const myTask = new Task({ description: "Work", completed: false });
// myTask
//   .save()
//   .then(() => {
//     console.log(myTask);
//   })
//   .catch((error) => {
//     console.log(error);
//   });

// const me = new User({ name: "Ali", email: "123", age: 27 });

// me.save()
//   .then(() => {
//     console.log(me);
//   })
//   .catch((error) => {
//     console.log(error);
//   });
