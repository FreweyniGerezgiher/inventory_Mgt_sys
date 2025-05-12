export const calculateTrends = (trends) => {
  const trendsKeys = Object.keys(trends);
  const monthKeys2 = trendsKeys.filter((key) => key === "M1" || key === "M2");
  const monthKeys4 = trendsKeys.filter((key) => key === "M3" || key === "M4");
  const monthKeys6 = trendsKeys.filter((key) => key === "M5" || key === "M6");
  const monthKeys8 = trendsKeys.filter((key) => key === "M7" || key === "M8");
  const monthKeys10 = trendsKeys.filter((key) => key === "M9" || key === "M10");
  const monthKeys12 = trendsKeys.filter(
    (key) => key === "M11" || key === "M12"
  );
  const month2 = monthKeys2.reduce((acc, key) => acc + trends[key], 0);
  const month4 = monthKeys4.reduce((acc, key) => acc + trends[key], 0);
  const month6 = monthKeys6.reduce((acc, key) => acc + trends[key], 0);
  const month8 = monthKeys8.reduce((acc, key) => acc + trends[key], 0);
  const month10 = monthKeys10.reduce((acc, key) => acc + trends[key], 0);
  const month12 = monthKeys12.reduce((acc, key) => acc + trends[key], 0);
  return { month2, month4, month6, month8, month10, month12 };
};
