const formatDate = (dataStr) => {
  const startDate = new Date(dataStr);
  const options = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  return new Intl.DateTimeFormat("en-US", options).format(startDate);
};
export default formatDate;
