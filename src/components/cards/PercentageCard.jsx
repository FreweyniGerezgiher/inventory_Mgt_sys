import { Flex, Progress, Card, ConfigProvider } from "antd";
import PropTypes from "prop-types";

const PercentageCard = ({ title, percent, children }) => {
  return (
    <Card
      bordered={false}
      className="bg-gray-400 justify-center align-middle items-center"
    >
      <div className="flex flex-row gap-3 items-center">
        {children}
        <div className="flex flex-col text-sm sm:text-lg">
          <strong>{title}</strong>
          <div className="text-xl mt-2 sm:text-2xl">
            <Flex gap="small" wrap>
              <ConfigProvider
                theme={{
                  token: { colorText: "#fff", fontSize: 16 },
                  components: {
                    Progress: {
                      colorSuccess: "#fff",
                      defaultColor: "#32a852",
                      // remainingColor: "#a87b32",
                      remainingColor: "#dad9de",
                    },
                  },
                }}
              >
                <Progress
                  type="circle"
                  size={70}
                  strokeWidth={18}
                  percent={percent}
                />
              </ConfigProvider>
            </Flex>
          </div>
        </div>
      </div>
    </Card>
  );
};

PercentageCard.propTypes = {
  title: PropTypes.string,
  percent: PropTypes.number,
  children: PropTypes.node,
};

export default PercentageCard;
