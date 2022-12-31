/**
 * It takes a unix timestamp and returns a human readable date
 * @param unix - The unix timestamp you want to convert to human time.
 * @returns A string with the date in the format DD.MM.YYYY
 */
export const unixToHumanTime = (unix) => {
  let humanTime = new Date(unix);
  humanTime =
    humanTime.getDate().toString() +
    "." +
    (humanTime.getMonth() + 1).toString() +
    "." +
    humanTime.getFullYear().toString();

  return humanTime;
};

/**
 * It takes a date in the format of a string and returns a date in the format of a string
 * @param date - The date you want to convert to human time.
 * @returns A string with the date in the format DD.MM.YYYY
 */

export const humanTime = (date) => {
  let humanTime = new Date(date);
  humanTime =
    humanTime.getDate().toString() +
    "." +
    (humanTime.getMonth() + 1).toString() +
    "." +
    humanTime.getFullYear().toString();

  return humanTime;
};

/**
 * Subtracts the offset from the current date and returns the date in a string format.
 * @param date - The date of the current day.
 * @param offset - The number of days to subtract from the current date.
 * @returns { date: "2022-12-02T00:00:00", newDate: "2022-11-30T00:00:00" }
 */

function subtractDays(date, offset) {
  date.setDate(date.getDate() - offset);
  return date;
}

function toDateString(date) {
  let day = date.getDate();
  if (day < 10) {
    day = "0" + day;
  }
  let month = date.getMonth();
  if (month < 10) {
    month = "0" + month;
  }
  return `${date.getFullYear()}-${month}-${day}T00:00:00`;
}

export function urlTime(offset) {
  // 2022-12-02T00:00:00
  const date = toDateString(new Date());
  const newDate = toDateString(subtractDays(new Date(), offset));

  return { date, newDate };
}

/**
 * If the timespan is less than or equal to 14, return 'Last 14 Days'. If the timespan is less than or
 * equal to 30, return 'Last Month'. If the timespan is less than or equal to 90, return 'Last 3
 * Months'.
 * @param timespan - The number of days to look back for the data.
 * @returns the string "Last 14 Days" if the timespan is less than or equal to 14, "Last Month" if the
 * timespan is less than or equal to 30, and "Last 3 Months" if the timespan is less than or equal to
 * 90.
 */
export function timeSpanConverter(timespan) {
  if (timespan <= 7) {
    return "Last 7 Days";
  } else if (timespan <= 14) {
    return "Last 14 Days";
  } else if (timespan <= 30) {
    return "Last Month";
  } else if (timespan <= 90) {
    return "Last 3 Months";
  }
}
