const humanTime = (date) => {
  let humanTime = new Date(date);
  humanTime =
    humanTime.getDate().toString() +
    "." +
    humanTime.getMonth().toString() +
    "." +
    humanTime.getFullYear().toString();

  return humanTime;
};

export default humanTime;
