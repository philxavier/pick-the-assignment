/* eslint-disable no-shadow */
/* eslint-disable linebreak-style */
/* eslint-disable no-param-reassign */
const BossList = require('./bossList.js');
const PriceInfo = require('./priceInfo.js');
let postsString = require('./postsString.js');
const cities = require('cities.json');

const arr = postsString.split('--');

const posts = arr.map((ele, ind) => {
  ele = ele.split(',');
  // Make first letter of string Upper Case
  
  return {
    name: ele[0],
    type: ele[1].trim(),
    class: ele[2].trim(),
    boss: BossList[ind],
  };
});

let findCitiesCoordinates = (cities, posts) => {
  let postsNames = posts.map(ele => ele.name);
  return cities.filter((ele) => {
    return postsNames.includes(ele.name);
  });
};

let coordinates = findCitiesCoordinates(cities, posts);

let includePrices = (result, posts) => {
  let postsNames = posts.map(ele => ele.name);
  for (let i = 0; i < result.length; i++) {
    if (postsNames.includes(result[i].name)) {
      let targetName = result[i].name;
      for (let j = 0; j < posts.length; j++) {
        if (posts[j].name === targetName) {
          posts[j].cost = {
            costOfLivingIndex: result[i].costOfLivingIndex,
            rentIndex: result[i].rentIndex,
            costOfLivingPlusIndex: result[i].costOfLivingPlusIndex,
            groceriesIndex: result[i].groceriesIndex,
            restaurantPriceIndex: result[i].restaurantPriceIndex,
            localPurchasePowerIndex: result[i].localPurchasePowerIndex
          };
        }
      }
    }
  }
};

let includeCoordinates = (coordinates, posts) => {
  let postsNames = posts.map(ele => ele.name);
  for (let i = 0; i < coordinates.length; i++) {
    if (postsNames.includes(coordinates[i].name)) {
      let targetName = coordinates[i].name;
      for (let j = 0; j < posts.length; j++) {
        if (posts[j].name === targetName) {
          posts[j].lat = Number(coordinates[i].lat);
          posts[j].lng = Number(coordinates[i].lng);
        }
      }
    }
  }
};

const includePriceAndCoordinates = (PriceInfo, posts) => {
  return new Promise((resolve, reject) => {
    PriceInfo
      .then((result) => {
        includePrices(result, posts);
        includeCoordinates(coordinates, posts);
        resolve(posts);
      })
      .catch((err) => {
        reject(err);
      });
  });
};

let completePostInfo = includePriceAndCoordinates(PriceInfo, posts);

module.exports = completePostInfo;

