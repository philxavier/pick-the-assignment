let _ = require("underscore");

let filterByClass = (listOfPosts, filterOfClass) => {
  if (!filterOfClass.length) return [];
  return listOfPosts.filter(ele => {
    return filterOfClass.includes(ele.class);
  });
};

let filterByType = (listOfPosts, filterOfType) => {
  if (!filterOfType.length) return [];
  let result = [];
  for (let i = 0; i < listOfPosts.length; i++) {
    if (
      listOfPosts[i].type === "cg" ||
      listOfPosts[i].type === "vc" ||
      listOfPosts[i].type === "c"
    ) {
      if (filterOfType.includes("c")) {
        result.push(listOfPosts[i]);
      }
    } else if (listOfPosts[i].type === "e") {
      if (filterOfType.includes("e")) {
        result.push(listOfPosts[i]);
      }
    } else {
      if (filterOfType.includes("o")) {
        result.push(listOfPosts[i]);
      }
    }
  }
  return result;
};

let filterByRates = (listOfPosts, filterOfRates) => {
  if (!filterOfRates.length) return [];
  return listOfPosts.filter(ele => {
    return filterOfRates.includes(ele.boss[1]);
  });
};

function mergeArrays() {
  let args = Array.from(arguments);
  args = args.filter(ele => {
    return ele.length > 0;
  });
  // console.log(args)
  return _.intersection(...args);
}

let buildNewClassOfPost = (newClassOfPost, inputClassOfPost) => {
  if (!inputClassOfPost.length) return;
  if (newClassOfPost.includes(inputClassOfPost)) {
    let indexOfInput = newClassOfPost.indexOf(inputClassOfPost);
    newClassOfPost.splice(indexOfInput, 1);
  } else {
    newClassOfPost.push(inputClassOfPost);
  }
};

let buildNewTypeOfPost = (newTypeOfPost, inputType) => {
  if (!inputType.length) return;
  if (newTypeOfPost.includes(inputType)) {
    let indexOfInput = newTypeOfPost.indexOf(inputType);
    newTypeOfPost.splice(indexOfInput, 1);
  } else {
    newTypeOfPost.push(inputType);
  }
};

let buildNewRates = (newRatesArr, inputRate) => {
  if (!inputRate.length) return;
  if (newRatesArr.includes(inputRate)) {
    let indexOfRate = newRatesArr.indexOf(inputRate);
    newRatesArr.splice(indexOfRate, 1);
  } else {
    newRatesArr.push(inputRate);
  }
};

let getAndTransformStats = reviewsArray => {
  let safetyReviewAverage =
    reviewsArray.reduce((accum, ele) => {
      return accum + ele.safety;
    }, 0) / reviewsArray.length;

  safetyReviewAverage = safetyReviewAverage.toFixed(1);

  safetyReviewAverage = (safetyReviewAverage * 100) / 5;

  let costReviewAverage =
    reviewsArray.reduce((accum, ele) => {
      return accum + ele.cost;
    }, 0) / reviewsArray.length;

  costReviewAverage = costReviewAverage.toFixed(1);

  costReviewAverage = (costReviewAverage * 100) / 5;

  let funReviewAverage =
    reviewsArray.reduce((accum, ele) => {
      return accum + ele.fun;
    }, 0) / reviewsArray.length;

  funReviewAverage = funReviewAverage.toFixed(1);

  funReviewAverage = (funReviewAverage * 100) / 5;

  let workPlaceRatingAverage =
    reviewsArray.reduce((accum, ele) => {
      return accum + ele.workPlaceRating;
    }, 0) / reviewsArray.length;

  workPlaceRatingAverage = workPlaceRatingAverage.toFixed(1);

  workPlaceRatingAverage = (workPlaceRatingAverage * 100) / 5;

  var averagesContainer = [
    funReviewAverage,
    workPlaceRatingAverage,
    costReviewAverage,
    safetyReviewAverage
  ];

  return averagesContainer;
};

let getAndTransformStats2 = reviewsArray => {
  let safetyReviewAverage =
    reviewsArray.reduce((accum, ele) => {
      return accum + ele.safety;
    }, 0) / reviewsArray.length;

  safetyReviewAverage = safetyReviewAverage.toFixed(1);

  let costReviewAverage =
    reviewsArray.reduce((accum, ele) => {
      return accum + ele.cost;
    }, 0) / reviewsArray.length;

  costReviewAverage = costReviewAverage.toFixed(1);

  let funReviewAverage =
    reviewsArray.reduce((accum, ele) => {
      return accum + ele.fun;
    }, 0) / reviewsArray.length;

  funReviewAverage = funReviewAverage.toFixed(1);

  let workPlaceRatingAverage =
    reviewsArray.reduce((accum, ele) => {
      return accum + ele.workPlaceRating;
    }, 0) / reviewsArray.length;

  workPlaceRatingAverage = workPlaceRatingAverage.toFixed(1);

  var averagesContainer = [
    funReviewAverage,
    workPlaceRatingAverage,
    costReviewAverage,
    safetyReviewAverage
  ];

  return averagesContainer;
};

let calculateBossRateAndIncludeInRatingsOfRatings = (
  bossInfo,
  average,
  setRatingForRatingComponent,
  setRating,
  setSafetyReview,
  setFunReview,
  setWorkPlaceRatingReview,
  setBossReview,
  setCostReview
) => {
  var bossRate = bossInfo.data[0].boss;
  var dictionary = {
    A: 100,
    B: 80,
    C: 60,
    D: 40,
    E: 20
  };

  let [
    funReviewAverage,
    workPlaceRatingAverage,
    costReviewAverage,
    safetyReviewAverage
  ] = average;

  var bossEvaluation = dictionary[bossRate[1]];

  let averageOfAverages =
    (bossEvaluation +
      safetyReviewAverage +
      costReviewAverage +
      funReviewAverage +
      workPlaceRatingAverage) /
    5;

  averageOfAverages = (averageOfAverages * 5) / 100;

  let ratingForRatingComponent = Math.round(averageOfAverages);

  setRatingForRatingComponent(ratingForRatingComponent);
  //I AM SETTING THE AVERAGE IN THE STORE SO AS TO MAKE IT AVAILABLE TO THE POST REVIEW MODAL COMPONENT
  // props.setCurrentPostRatingOfRatings(averageOfAverages);
  setRating(averageOfAverages);
  setBossReview(bossEvaluation);
  setSafetyReview(safetyReviewAverage);
  setCostReview(costReviewAverage);
  setFunReview(funReviewAverage);
  setWorkPlaceRatingReview(workPlaceRatingAverage);

  return averageOfAverages;
};

let transformBossRateIntoNumber = bossInfo => {
  var bossRate = bossInfo.data[0].boss;
  var dictionary = {
    A: 100,
    B: 80,
    C: 60,
    D: 40,
    E: 20
  };

  var bossEvaluation = dictionary[bossRate[1]];

  return (bossEvaluation * 5) / 100;
};

module.exports = {
  filterByClass,
  filterByRates,
  filterByType,
  mergeArrays,
  buildNewClassOfPost,
  buildNewTypeOfPost,
  buildNewRates,
  getAndTransformStats,
  calculateBossRateAndIncludeInRatingsOfRatings,
  getAndTransformStats2,
  transformBossRateIntoNumber
};
