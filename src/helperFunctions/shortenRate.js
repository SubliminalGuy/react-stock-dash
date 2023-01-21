/**
 * This function takes a number, rounds it to two decimal places, and returns the result.
 * @param rate - The rate of the current item.
 * @returns the rate rounded to 2 decimal places.
 */
export const shortenRate = (rate) => {
  rate = Number(rate);
  return rate.toFixed(2);
};

export const shortenBig = (val) => {
  val = Number(val);

  if (val < 1e3) return val;
  if (val >= 1e3 && val < 1e6) return +(val / 1e3).toFixed(1);
  if (val >= 1e6 && val < 1e9) return +(val / 1e6).toFixed(1);
  if (val >= 1e9 && val < 1e12) return +(val / 1e9).toFixed(1);
  if (val >= 1e12) return +(val / 1e12).toFixed(1);
};
