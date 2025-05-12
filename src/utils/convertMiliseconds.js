export const convertMilliseconds = (ms) => {
  let hours = Math.floor(ms / (1000 * 60 * 60));
  let minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((ms % (1000 * 60)) / 1000);

  let result = [];

  if (hours > 0) {
    result.push(`${hours} Hrs`);
  }
  if (minutes > 0) {
    result.push(`${minutes} Mins`);
  }
  if (seconds > 0) {
    result.push(`${seconds} Secs`);
  }

  return result.join(" ");
};
