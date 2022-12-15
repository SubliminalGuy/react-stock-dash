/**
 * This function takes a number, rounds it to two decimal places, and returns the result.
 * @param rate - The rate of the current item.
 * @returns the rate rounded to 2 decimal places.
 */
const shortenRate = (rate) => {
  return rate.toFixed(2);
};

export default shortenRate;
