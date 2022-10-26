const { ObjectID } = require("bson");
const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;

const connURl = "mongodb://127.0.0.1:27017";
const database = "task-manager";

MongoClient.connect(
  connURl,
  { useNewURLParser: true, useCreateIndex: true },
  (error, client) => {
    if (error) {
      return console.log(error);
    }
    const db = client.db(database);
    db.collection("users").insertOne(
      {
        name: "Hadi",
        age: 21,
      },
      (error, result) => {
        if (error) {
          return console.log(error);
        }
        console.log(result);
      }
    );

    db.collection("users")
      .find({ age: 22 })
      .toArray((error, result) => {
        console.log(result);
      });

    db.collection("users")
      .updateOne(
        { _id: new ObjectID("62a083cb813469fd4611af1b") },
        {
          $set: {
            name: "Zain",
          },
        }
      )
      .then((result) => {
        console.log(result);
      })
      .catch((error) => {
        console.log(error);
      });
  }
);
