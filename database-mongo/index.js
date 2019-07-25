/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");
// var config = require('../mongo.config.js');

var connectionString = process.env.MONGO_URI;

mongoose
  //connecting to mongo atlas and choosing database
  .connect("mongodb://localhost:27017/mvp")
  .then(() => {
    console.log("Connection to database successfull");
  })
  .catch(err => console.error(err));

const db = mongoose.connection;

db.on("error", () => {
  console.log("mongoose connection error");
});

db.once("open", () => {
  console.log("mongoose connected successfully");
});

const postSchema = mongoose.Schema(
  {
    name: String,
    class: String,
    type: String,
    boss: Array,
    cost: {
      costOfLivingIndex: Number,
      rentIndex: Number,
      costOfLivingPlusIndex: Number,
      groceriesIndex: Number,
      restaurantPriceIndex: Number,
      localPurchasePowerIndex: Number
    },
    lat: Number,
    lng: Number
  },
  { strict: false }
);

const postModel = mongoose.model("Post", postSchema);

let selectAll = () => {
  return new Promise((resolve, reject) => {
    postModel.find({}, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

let findOne = inputPost => {
  return new Promise((resolve, reject) => {
    postModel.find({ name: inputPost }, (err, res) => {
      if (err) {
        reject(err);
      } else {
        resolve(res);
      }
    });
  });
};

let findWithRegex = input => {
  return new Promise((resolve, reject) => {
    postModel.find(
      { name: { $regex: `^${input}`, $options: "i" } },
      (err, res) => {
        if (err) {
          console.log("there was an error finding regex", err);
          reject(err);
        } else {
          // console.log("these are the results", res);
          resolve(res);
        }
      }
    );
  });
};

module.exports.db = db;
module.exports.postModel = postModel;
module.exports.selectAll = selectAll;
module.exports.findOne = findOne;
module.exports.findWithRegex = findWithRegex;
