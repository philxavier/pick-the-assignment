let faker = require("faker");

let rates = ["A", "B", "C", "D", "E"];

let createRandomNumber = () => {
  return Math.floor(Math.random() * (4 - 0 + 1)) + 0;
};

let bossList = [];

let name = async function() {
  for (let i = 0; i < 226; i++) {
    let evaluation = createRandomNumber();
    let finalRate = rates[evaluation];
    bossList.push([faker.name.findName(), finalRate]);
  }
  return bossList;
};

name();

module.exports = bossList;
