const convertDateToGetTime = (data) => {
  const date = data ? new Date(data) : new Date();
  return date.getTime();
};

module.exports = {
  convertDateToGetTime,
};
