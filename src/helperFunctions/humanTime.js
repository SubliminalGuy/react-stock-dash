/**
 * It takes a date in the format of a string and returns a date in the format of a string
 * @param date - The date you want to convert to human time.
 * @returns A string with the date in the format DD.MM.YYYY
 */

const humanTime = (date) => {
  let humanTime = new Date(date);
  humanTime =
    humanTime.getDate().toString() +
    "." +
    (humanTime.getMonth() + 1).toString() +
    "." +
    humanTime.getFullYear().toString();

  return humanTime;
};

export default humanTime;
