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

import { http } from "../services/http/http";
import { URL } from "../config/config";
import dayjs from "dayjs";
import moment from "moment";

const today = dayjs();
const Dashboard = () => {
  const [insightData, setInsightData] = useState({});
  const submitBtnRef = useRef(null);

  const startOfLastMonth = today.subtract(1, "month").startOf("month");
  const startDateMonth = moment(new Date(startOfLastMonth)).format(
    "YYYY-MM-DD"
  );
  const todayDate = moment(today).format("YYYY-MM-DD");
  const [startDate, setStartDate] = useState(startDateMonth);
  const [endDate, setEndDate] = useState(todayDate);
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


  const handleClickSubmitBtnEvent = () => {
    if (submitBtnRef.current) submitBtnRef.current.click();
  };
  const handleClickSubmitBtn = () => {
    handleClickSubmitBtnEvent();
  };
  const handleOnChangeRangePicker = (date, dateString) => {
    if (dateString.length === 0) return;
    const date1 = dateString[0];
    const date2 = dateString[1];
    if (!date1 || !date2 || date1 === date2) return;
    setStartDate(date1);
    setEndDate(date2);
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
          <div className="px-2 xs:px-3 md:px-6 my-5 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-3 md:gap-4">
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
            <SimpleStatsCard
              title="Total Purchase Cost"
              value={'0'}
            >
              <iconsList.tagIcon style={{ fontSize: 26, color: "#eb26c4" }} />
            </SimpleStatsCard>
          </div>
          </div>
        </div>
      </>
  );
};

Dashboard.propTypes = {};

export default Dashboard;