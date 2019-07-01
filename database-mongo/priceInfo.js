/* eslint-disable linebreak-style */
/* eslint-disable radix */
/* eslint-disable no-plusplus */
/* eslint-disable prefer-destructuring */
/* eslint-disable linebreak-style */
const rp = require('request-promise');

const url = 'https://www.numbeo.com/cost-of-living/rankings.jsp';
const cheerio = require('cheerio');

const makeObjectsWithPrices = (arr) => {
  const container = [];
  for (let i = 0; i < arr.length; i += 7) {
    const subArray = arr.slice(i, i + 7);
    const obj = {
      name: subArray[0],
      costOfLivingIndex: subArray[1],
      rentIndex: subArray[2],
      costOfLivingPlusIndex: subArray[3],
      groceriesIndex: subArray[4],
      restaurantPriceIndex: subArray[5],
      localPurchasePowerIndex: subArray[6],
    };

    container.push(obj);
  }

  //   console.log(container);
  return container;
};

const getPricesIntoArray = () => new Promise((resolve, reject) => {
  rp(url)
    .then((data) => {
      const $ = cheerio.load(data);
      const target = $('#t2').children().next();
      const arr = target.text().trim().split('\n');
      const hold = [];
      for (let i = 0; i < arr.length; i++) {
        if (arr[i].length > 2) {
          arr[i] = arr[i].trim();
          if (arr[i].split(',').length > 1) {
            arr[i] = arr[i].split(',')[0];
          } else if (parseInt(arr[i]) !== null) {
            arr[i] = Number(arr[i]);
          }
          hold.push(arr[i]);
        }
      }
      resolve(makeObjectsWithPrices(hold));
    })
    .catch((err) => {
      reject(err);
    });
});

const PriceInfo = getPricesIntoArray();

module.exports = PriceInfo;
