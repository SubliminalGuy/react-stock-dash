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

function urlTime(offset) {
  // 2022-12-02T00:00:00
  const date = toDateString(new Date());
  const newDate = toDateString(subtractDays(new Date(), offset));

  return { date, newDate };
}

export default urlTime;
