// import PropTypes from "prop-types";
import {
  BgColorsOutlined,
} from "@ant-design/icons";
import SimpleStatsCard from "../components/cards/SimpleStatsCard";
import {
  Space,
} from "antd";
import React, { useRef, useState } from "react";

const AssetsDashboard = () => {
  const [insightData, setInsightData] = useState({});

  return (
    <>
      <div className="flex flex-col gap-4">
        <div className="w-full overflow-x-hidden border-gray-800 ">
          <>
            <div className="px-3 xs:px-4 md:px-7 my-5 grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3  gap-1 md:gap-2">
              <div className="flex flex-row gap-2 justify-items-center">
                <Space>
                  <BgColorsOutlined
                    style={{ color: "#dece1b", fontSize: 24 }}
                  />
                </Space>
                <div>Driver Related</div>
              </div>
              <div className="flex flex-row gap-2 justify-items-center">
                <Space>
                  <BgColorsOutlined
                    style={{ color: "#eb26c4", fontSize: 24 }}
                  />
                </Space>
                <div>Asset Insurance</div>
              </div>
              <div className="flex flex-row gap-2 justify-items-center">
                <Space>
                  <BgColorsOutlined
                    style={{ color: "#1156d6", fontSize: 24 }}
                  />
                </Space>
                <div>Asset Maintenance</div>
              </div>
            </div>
            <div className="px-2 md:px-4 my-5 grid grid-cols-1 sm:grid-cols-3  md:grid-cols-4  gap-3 md:gap-4">
              <SimpleStatsCard
                title="Total Assets"
                value={insightData?.total_number_of_assets}
              >
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Inactive Assets"
                value={insightData?.total_number_of_inactive_assets}
              >
              </SimpleStatsCard>

              <SimpleStatsCard
                title="Total Devices"
                value={insightData?.total_number_of_devices}
              >
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Total Groups"
                value={insightData?.total_number_of_groups}
              >
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Allowed Qnit Services"
                value={insightData?.total_number_of_allowed_services}
              >
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Total Drivers"
                value={insightData?.total_number_of_drivers}
              >
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Inactive Drivers"
                value={insightData?.total_number_of_inactive_drivers}
              >
              </SimpleStatsCard>

              <SimpleStatsCard
                title="Trafic Violations"
                value={insightData?.total_number_of_driver_traffic_violations}
              >
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Total Accidents"
                value={insightData?.total_number_of_driver_accidents}
              >
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Assets with Active Insurance"
                value={insightData?.total_num_insurance_active}
              >
              </SimpleStatsCard>
              <SimpleStatsCard
                title="Assets with Expired Insurance"
                value={insightData?.total_num_insurance_expired}
              >
              </SimpleStatsCard>
            </div>
          </>
        </div>
      </div>
    </>
  );
};

AssetsDashboard.propTypes = {};

export default AssetsDashboard;
