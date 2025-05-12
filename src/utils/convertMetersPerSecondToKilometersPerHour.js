export const convertMPSToKPH = (metersPerSecond) => {
  const kilometersPerHour = metersPerSecond * 3.6;
  return kilometersPerHour.toFixed(2);
};
