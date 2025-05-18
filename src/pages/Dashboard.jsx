import { useEffect, useRef, useState } from "react";
import {
  CarOutlined,
  TagOutlined,
  TrademarkCircleOutlined,
  UnlockOutlined,
  GroupOutlined,
  ThunderboltOutlined,
  VerifiedOutlined,
  WarningOutlined,
  ClockCircleOutlined,
  BgColorsOutlined,
  DollarOutlined,
} from "@ant-design/icons";
import SimpleStatsCard from "../components/cards/SimpleStatsCard";
import PercentageCard from "../components/cards/PercentageCard";

import { http } from "../services/http/http";
import { URL } from "../config/config";
import dayjs from "dayjs";
import moment from "moment";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [insightData, setInsightData] = useState({});
  const submitBtnRef = useRef(null);


  const iconsList = {
    asssetIcon: CarOutlined,
    tagIcon: TagOutlined,
    brandIcon: TrademarkCircleOutlined,
    unlockIcon: UnlockOutlined,
    groupIcon: GroupOutlined,
    boltIcon: ThunderboltOutlined,
    verifiedIcon: VerifiedOutlined,
    warningIcon: WarningOutlined,
    clockIcon: ClockCircleOutlined,
    dollarIcon: DollarOutlined,
    bgColorsIcon: BgColorsOutlined,
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };
  const handleClickSubmitBtnEvent = () => {
    if (submitBtnRef.current) submitBtnRef.current.click();
  };

  const fetchInsightData = async () => {
    try {
      const requestPayload = {
        method: "get",
        url: `${URL}/insight/read_fleet_insight?start_time=${startDate}&end_time=${endDate}`,
      };
      const response = await http.request(requestPayload);
      if (!response.isError) {
        console.log("Insights:", response);
        setInsightData(response);
      } else {
        console.log({ response });
      }
    } catch (error) {
    }
  };
  useEffect(() => {
    fetchInsightData();
  }, []);
  return (
    <>
      <div className="flex flex-col pt-10">
        <div className="w-full overflow-x-hidden border-gray-800 ">
          <>
            <div className="px-2 xs:px-3 md:px-6 my-5 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-4  gap-3 md:gap-4">
              <SimpleStatsCard
                title="Low Stock Items"
                value={'0'}
              >
                <iconsList.dollarIcon
                  style={{ fontSize: 26, color: "#f05d13" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Out of Stock Items"
                value={'0'}
              >
                <iconsList.dollarIcon
                  style={{ fontSize: 26, color: "#f05d13" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Total Stock Value"
                value={'0'}
              >
                <iconsList.dollarIcon
                  style={{ fontSize: 26, color: "#f05d13" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Total Sales Orders"
                value={'0'}
              >
                <iconsList.dollarIcon
                  style={{ fontSize: 26, color: "#f05d13" }}
                />
              </SimpleStatsCard>
              {/* Fleet utiliation and Distance Insight */}
              <SimpleStatsCard
                title="Pending Sales Orders"
                value={'0'}
              >
                <iconsList.groupIcon
                  style={{ fontSize: 26, color: "#1156d6" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Completed Sales Orders"
                value={'0'}
              >
                <iconsList.boltIcon
                  style={{ fontSize: 26, color: "#1156d6" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Total Purchases"
                value={'0'}
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#1156d6" }} />
              </SimpleStatsCard>
              {/* Time Management */}
              <SimpleStatsCard
                title="Total Purchase Cost"
                value={'0'}
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#eb26c4" }} />
              </SimpleStatsCard>
             
            </div>
          </>
        </div>
      </div>
    </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;
