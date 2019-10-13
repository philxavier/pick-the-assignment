/* eslint-disable linebreak-style */
// eslint-disable-next-line import/no-extraneous-dependencies
const mongoose = require("mongoose");
var config = require("../mongo.config.js").URI;
const bossList = require("./bossList");
const namesOfCities = require("./postsString").namesOfCities;
//I THINK I HAVE MANUALLY SET CONNECTION STRING TO THE RIGHT URI, WHICH IS THE STRING AT MONGO.CONFIG.JS

//WHAT TO USE DURING DEPLOYMENT: '.connect(process.env.MONGO_URI, { dbName: 'mvp' })'

var connectionString = process.env.MONGO_URI;

mongoose
  //connecting to mongo atlas and choosing database
  .connect(connectionString, { dbName: "mvp", useNewUrlParser: true })
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
    reviewsByUser: Array,
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

let insertBoss = async () => {
  // let includeBoss = async () => {
  //   for (let i = 0; i < namesOfCities.length; i++) {
  //     await postModel.update({}, { $push: { boss: "john" } }, (err, res) => {
  //       if (err) {
  //         console.log("there was an error", err);
  //       } else {
  //         console.log("this is good");
  //       }
  //     });
  //   }
  // };

  // includeBoss();

  for (let i = 0; i < bossList.length; i++) {
    await postModel.updateOne(
      { name: namesOfCities[i] },
      { $addToSet: { boss: bossList[i][0] } }
    );
  }
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

let delteReviewByUser = () => {
  postModel.updateMany({}, { $unset: { reviewsByUser: "" } }, (err, res) => {
    if (err) {
      console.log("there was an error performing this one", err);
    } else {
      console.log("success!");
    }
  });
};

let updateBoss = () => {
  postModel
    .updateMany({}, { $unset: { boss: 1 } }, (err, res) => {
      if (err) {
        console.log("there was an error performing this one", err);
      } else {
        console.log("success!");
      }
    })
    .then(() => {
      for (let i = 0; i < namesOfCities.length; i++) {
        postModel.updateOne(
          { name: namesOfCities[i] },
          { $set: { boss: [bossList[i][0], bossList[i][1]] } },
          (err, res) => {
            if (err) {
              console.log("there was an error performing this one", err);
            } else {
              console.log("success adding boss!");
            }
          }
        );
      }
    });
};

let insertReviewsByUser = () => {
  postModel.updateMany(
    {},
    { $set: { reviewsByUser: Array } },
    { multi: true },
    (err, res) => {
      if (err) {
        console.log("there was an error performing this one", err);
      } else {
        console.log("success!");
      }
    }
  );
};

let test = () => {
  postModel.updateOne(
    { name: "Washington", type: "e" },
    { $push: { reviewsByUser: "test" } },
    { upsert: true },
    (err, res) => {
      if (err) {
        console.log("there was an error");
      } else {
        console.log("things went well");
      }
    }
  );
};

let insertReview = (
  textAreaContent,
  dates,
  cost,
  workPlaceRating,
  fun,
  safety,
  type,
  postName
) => {
  var inputReview = {
    textAreaContent,
    dates,
    cost,
    fun,
    workPlaceRating,
    safety
  };

  return new Promise((resolve, reject) => {
    postModel.updateOne(
      { name: postName, type: type },
      { $push: { reviewsByUser: inputReview } },
      { upsert: true, multi: true },
      (err, resp) => {
        if (err) {
          console.log("there wasa an error", err);
          reject(err);
        } else {
          console.log("things went well");
          resolve(resp);
        }
      }
    );
  });
};

// { name: { $regex: `^${input}`, $options: "i" } },
findReviews = (city, type) => {
  return new Promise((resolve, reject) => {
    postModel.find(
      { name: city, type: { $regex: type, $options: "i" } },
      "reviewsByUser",
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

findBoss = (city, type) => {
  return new Promise((resolve, reject) => {
    postModel.find(
      { name: city, type: { $regex: type, $options: "i" } },
      "boss",
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

// insertBoss();
// updateBoss();
// insertReviewsByUser();
// delteReviewByUser();
// test();

module.exports = {
  db,
  postModel,
  selectAll,
  findOne,
  findWithRegex,
  insertReview,
  findBoss
};
