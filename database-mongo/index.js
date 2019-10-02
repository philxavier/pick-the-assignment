/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");
var config = require("../mongo.config.js");
//I THINK I HAVE MANUALLY SET CONNECTION STRING TO THE RIGHT URI, WHICH IS THE STRING AT MONGO.CONFIG.JS

//WHAT TO USE DURING DEPLOYMENT: '.connect(process.env.MONGO_URI, { dbName: 'mvp' })'

// var connectionString = process.env.MONGO_URI;

mongoose
  //connecting to mongo atlas and choosing database
  .connect(config.URI, { dbName: "mvp", useNewUrlParser: true })
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
    review: Array,
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

//TO CREATE A MODEL, REMEMBER, YOU PASS IN THE NAME OF THE MODEL (YOU PICK ANY NAME) AND THE SCHEMA

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

let insertReview = (
  textAreaContent,
  date1,
  date2,
  currentRating,
  postName,
  type
) => {
  var inputReview = {
    textAreaContent,
    date1,
    date2,
    currentRating
  };
  return new Promise((resolve, reject) => {
    postModel.updateOne(
      { name: postName, type: type },
      { $push: { review: inputReview } },
      { upsert: true, setDefaultsOnInsert: true },
      (err, resp) => {
        if (err) {
          reject(err);
        } else {
          resolve(resp);
        }
      }
    );
  });
};

findReviews = (city, type) => {
  return new Promise((resolve, reject) => {
    postModel.find({ name: city, type: type }, "review", (err, resp) => {
      if (err) {
        reject(err);
      } else {
        resolve(resp);
      }
    });
  });
};

module.exports = {
  db,
  postModel,
  selectAll,
  findOne,
  findWithRegex,
  insertReview
};
