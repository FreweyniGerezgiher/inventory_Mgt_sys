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

import FormModal from "../components/modals/FormModal";
import { http } from "../services/http/http";
import { URL } from "../config/config";
import dayjs from "dayjs";
import moment from "moment";
import { ConfigProvider, DatePicker, Space } from "antd";
import { convertMetresToKM } from "../utils/convertMetresToKM";

const today = dayjs();
// const { useToken } = theme;
const { RangePicker } = DatePicker;
const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
      // setError("Failed to fetch data. Please try again later.");
    }
  };
  useEffect(() => {
    fetchInsightData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <>
      <div className="flex flex-col pt-10">
        <div className="grid grid-cols-4 md:grid-cols-8 h-fit gap-4">
          <div className="col-span-6"></div>
          <div className="flext justify-center h-fit items-center mt-2 mr-5 col-span-2 shadow-sm rounded-md border bg-gray-500 border-gray-200">
            <Space direction="vertical" size={16}>
              <ConfigProvider
                theme={{
                  components: {
                    DatePicker: {
                      colorPrimary: "#ffffff",
                      hoverBorderColor: "#9ca3af",
                      activeBorderColor: "#6b7280",
                    },
                  },
                  token: {
                    colorPrimary: "green",
                    colorText: "#ffffff",
                    colorTextDisabled: "#d1d5db",
                    colorTextDescription: "#d1d5db",
                    fontFamily: "sans-serif",
                    colorIcon: "#ffffff",
                    colorBorderBg: "#374151",
                    colorIconHover: "#ffffff",
                    colorBorder: "#374151",
                    colorBgContainer: "#4b5563",
                    colorBgElevated: "#374151",
                  },
                }}
              >
                <RangePicker
                  size="large"
                  defaultValue={[startOfLastMonth, today]}
                  onChange={handleOnChangeRangePicker}
                  format="YYYY-MM-DD"
                  className="bg-gray-500 border-gray-400   focus:bg-gray-500 hover:bg-gray-500 active:bg-gray-500"
                />
              </ConfigProvider>
            </Space>
          </div>
        </div>
        <div className="w-full overflow-x-hidden border-gray-800 ">
          <>
            <div className="px-3 xs:px-4 md:px-7 my-5 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-1 md:gap-2">
              <div className="flex flex-row gap-2 justify-items-center">
                <Space>
                  <BgColorsOutlined
                    style={{ color: "#32a852", fontSize: 24 }}
                  />
                </Space>
                <div>Operational Efficiency</div>
              </div>
              <div className="flex flex-row gap-2 justify-items-center">
                <Space>
                  <BgColorsOutlined
                    style={{ color: "#f05d13", fontSize: 24 }}
                  />
                </Space>
                <div>Cost management</div>
              </div>
              <div className="flex flex-row gap-2 justify-items-center">
                <Space>
                  <BgColorsOutlined
                    style={{ color: "#1156d6", fontSize: 24 }}
                  />
                </Space>
                <div>Fleet utilization and Distance Insight</div>
              </div>
              <div className="flex flex-row gap-2 justify-items-center">
                <Space>
                  <BgColorsOutlined
                    style={{ color: "#eb26c4", fontSize: 24 }}
                  />
                </Space>
                <div>Time Management</div>
              </div>
              <div className="flex flex-row gap-2 justify-items-center">
                <Space>
                  <BgColorsOutlined
                    style={{ color: "#26e4eb", fontSize: 24 }}
                  />
                </Space>
                <div>Dispatch management</div>
              </div>
            </div>
            <div className="px-2 xs:px-3 md:px-6 my-5 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-4  gap-3 md:gap-4">
              {/* Operational Efficiency */}
              <PercentageCard
                title="Asset Utilization Rate"
                percent={insightData?.asset_utilization_rate}
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#32a852" }} />
              </PercentageCard>
              <PercentageCard
                title="Driver Efficiency"
                percent={insightData?.driver_working_hours_rate}
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#32a852" }} />
              </PercentageCard>
              <PercentageCard
                title="On-Time Delivery Rate"
                percent={insightData?.percentage_of_on_time_dispatch}
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#32a852" }} />
              </PercentageCard>
              {/* Cost management */}

              <SimpleStatsCard
                title="Total Driver Cost"
                value={
                  insightData?.total_driver_dispatch_cost
                    ? `${insightData?.total_driver_dispatch_cost} Br`
                    : "0 Br"
                }
              >
                <iconsList.dollarIcon
                  style={{ fontSize: 26, color: "#f05d13" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Total Asset Cost"
                value={
                  insightData?.total_asset_dispatch_cost
                    ? `${insightData?.total_asset_dispatch_cost} Br`
                    : "0 Br"
                }
              >
                <iconsList.dollarIcon
                  style={{ fontSize: 26, color: "#f05d13" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Avg Driver Cost Per Dispatch"
                value={
                  insightData?.average_driver_cost_per_dispatch
                    ? `${insightData?.average_driver_cost_per_dispatch} Br`
                    : "0 Br"
                }
              >
                <iconsList.dollarIcon
                  style={{ fontSize: 26, color: "#f05d13" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Avg Asset Cost Per Dispatch"
                value={
                  insightData?.average_asset_cost_per_dispatch
                    ? `${insightData?.average_asset_cost_per_dispatch} Br`
                    : "0 Br"
                }
              >
                <iconsList.dollarIcon
                  style={{ fontSize: 26, color: "#f05d13" }}
                />
              </SimpleStatsCard>
              {/* Fleet utiliation and Distance Insight */}
              <SimpleStatsCard
                title="Planned Dispatch Distance"
                value={
                  insightData?.total_route_matched_distance
                    ? `${convertMetresToKM(
                        insightData?.total_route_matched_distance
                      )} km`
                    : "0 km"
                }
              >
                <iconsList.groupIcon
                  style={{ fontSize: 26, color: "#1156d6" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Total Trip Distance"
                value={
                  insightData?.total_trip_distance
                    ? `${convertMetresToKM(
                        insightData?.total_trip_distance
                      )} km`
                    : "0 km"
                }
              >
                <iconsList.boltIcon
                  style={{ fontSize: 26, color: "#1156d6" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Empty Mileage"
                value={
                  insightData?.total_trip_distance_with_out_dispatch
                    ? `${convertMetresToKM(
                        insightData?.total_trip_distance_with_out_dispatch
                      )} km`
                    : "0 km"
                }
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#1156d6" }} />
              </SimpleStatsCard>
              {/* Time Management */}
              <SimpleStatsCard
                title="Lost Driver Hours"
                value={
                  insightData?.total_hours_lost_in_exceptions
                    ? `${insightData?.total_hours_lost_in_exceptions} hrs`
                    : "0 hrs"
                }
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#eb26c4" }} />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Asset Down Time"
                value={
                  insightData?.asset_down_time_hours
                    ? `${insightData?.asset_down_time_hours} hrs`
                    : "0 hrs"
                }
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#eb26c4" }} />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Driver Down Time"
                value={
                  insightData?.driver_down_time_hours
                    ? `${insightData?.driver_down_time_hours} hrs`
                    : "0 hrs"
                }
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#eb26c4" }} />
              </SimpleStatsCard>
              {/* Dispatch management */}
              <SimpleStatsCard
                title="Total Asset Dispatches"
                value={insightData?.total_asset_number_of_dispatches}
              >
                <iconsList.brandIcon
                  style={{ fontSize: 26, color: "#26e4eb" }}
                />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Dispatch Delay Hours"
                value={
                  insightData?.total_dispatch_delay_hours
                    ? `${insightData?.total_dispatch_delay_hours} hrs`
                    : "0 hrs"
                }
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#26e4eb" }} />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Asset Dispatch Hours"
                value={
                  insightData?.total_asset_dispatch_hours
                    ? `${insightData?.total_asset_dispatch_hours} hrs`
                    : "0 hrs"
                }
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#26e4eb" }} />
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Driver Dispatch Hours "
                value={
                  insightData?.total_driver_dispatch_hours
                    ? `${insightData?.total_driver_dispatch_hours} hrs`
                    : "0 hrs"
                }
              >
                <iconsList.tagIcon style={{ fontSize: 26, color: "#26e4eb" }} />
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
