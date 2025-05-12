export const convertMetresToKM = (metre) => {
  const kg = metre / 1000;
  return kg.toFixed(2);
};

export const convertDistance = (meters) => {
  let kilometers = Math.floor(meters / 1000);
  let remainingMeters = meters % 1000;

  let result = [];

  if (kilometers > 0) {
    result.push(`${kilometers} km`);
  }
  if (remainingMeters > 0) {
    result.push(`${remainingMeters.toFixed(2)} meters`);
  }

  return result.join(" ");
};
