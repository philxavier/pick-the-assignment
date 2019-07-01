/* eslint-disable linebreak-style */
const { db } = require('./index');
const { postModel } = require('./index');
const completePostInfo = require('./InfoPosts');

const seedDatabase = () => {
  completePostInfo
    .then((result) => {
      postModel.insertMany(result, (err) => {
        if (err) {
          console.log('Error inserting into database', err);
        } else {
          console.log('records into database');
        }
      });
    })
    .catch((err) => {
      console.log('We have found an error', err);
    });
};


seedDatabase();
