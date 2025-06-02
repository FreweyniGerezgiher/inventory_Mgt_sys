import { Card } from "antd";
import PropTypes from "prop-types";

const SimpleStatsCard = ({ title, value, children }) => {
  return (
    <Card
      bordered={false}
      className="wrap py-2 bg-[#f2f2f2] justify-center align-middle items-center"
    >
      <div className="flex flex-row gap-3 items-center">
        {children}
        <div className="flex flex-col text-sm sm:text-lg">
          <strong>{title}</strong>
          <div className="text-xl sm:text-xl">{value}</div>
        </div>
      </div>
    </Card>
  );
};

SimpleStatsCard.propTypes = {
  title: PropTypes.string,
  value: PropTypes.string,
  children: PropTypes.node,
};

export default SimpleStatsCard;
