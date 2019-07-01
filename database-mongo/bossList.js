let faker = require("faker");

let evaluations = ["A", "B", "C", "D", "E", "F"];

let createRandomNumber = () => {
  return Math.floor(Math.random() * (5 - 0 + 1)) + 0;
};

let bossList = [];

let name = async function() {
  for (let i = 0; i < 226; i++) {
    bossList.push([faker.name.findName(), evaluations[createRandomNumber()]]);
  }
  return bossList;
};

name();

module.exports = bossList;
