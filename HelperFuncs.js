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

module.exports = {
  filterByClass,
  filterByRates,
  filterByType,
  mergeArrays,
  buildNewClassOfPost,
  buildNewTypeOfPost,
  buildNewRates
};
