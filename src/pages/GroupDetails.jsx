import { Descriptions } from "antd";
import PropTypes from "prop-types";

const GroupDetails = ({ group }) => {
  const groupInfo = [
    {
      key: "1",
      label: "Name",
      children: group?.group_name ? group?.group_name : "---",
    },
    {
      key: "2",
      label: "Number Of Assets",
      children: group?.number_of_assets ? group?.number_of_assets : "---",
    },
    {
      key: "3",
      label: "Number Of Drivers",
      children: group?.number_of_drivers ? group?.number_of_drivers : 0,
    },
    {
      key: "3",
      label: "Inactive Assets",
      children: group?.num_of_inactive_assets
        ? group?.num_of_inactive_assets
        : 0,
    },
  ];
  return (
    <>
      <Descriptions
        title="Group Information"
        size="default"
        items={groupInfo}
      />
    </>
  );
};

GroupDetails.propTypes = {
  group: PropTypes.object,
};

export default GroupDetails;
