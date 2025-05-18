import { Descriptions } from "antd";
import PropTypes from "prop-types";
import formatDate from "../../utils/formatdate";

const UserDetails = ({ driver }) => {
  const driverInfos = [
    {
      key: "1",
      label: "Full Name",
      children: driver?.driver_full_name ? driver?.driver_full_name : "---",
    },
    {
      key: "2",
      label: "Email",
      children: driver?.contact_information?.email
        ? driver?.contact_information?.email
        : "---",
    },
    {
      key: "3",
      label: "Telephone",
      children: driver?.contact_information?.phone
        ? driver?.contact_information?.phone
        : "---",
    },
    {
      key: "4",
      label: "Address",
      children: driver?.address ? driver?.address : "---",
    },
  ];
  const emergencyContact = [
    {
      key: "1",
      label: "Name",
      children: driver?.emergency_contact?.emergency_full_name
        ? driver?.emergency_contact?.emergency_full_name
        : "---",
    },
    {
      key: "2",
      label: "E-mail",
      children: driver?.emergency_contact?.emergency_email
        ? driver?.emergency_contact?.emergency_email
        : "---",
    },
    {
      key: "3",
      label: "Telephone",
      children: driver?.emergency_contact?.emergency_phone
        ? driver?.emergency_contact?.emergency_phone
        : "---",
    },
  ];
  const licenseInfo = [
    {
      key: "1",
      label: "License Type",
      children: driver?.license_information?.license_type
        ? driver?.license_information?.license_type
        : "---",
    },
    {
      key: "2",
      label: "License Number",
      children: driver?.license_information?.license_number
        ? driver?.license_information?.license_number
        : "---",
    },
    {
      key: "3",
      label: "Exp. Date",
      children: driver?.licenseExpiry ? driver?.licenseExpiry : "---",
    },
  ];
  const availability = [
    {
      key: "1",
      label: "From",
      children: driver?.availability[0]?.shift_start_time
        ? formatDate(new Date(driver?.availability[0]?.shift_start_time))
        : "---",
    },
    {
      key: "2",
      label: "To",
      children: driver?.availability[0]?.shift_end_time
        ? formatDate(new Date(driver?.availability[0]?.shift_end_time))
        : "---",
    },
  ];
  return (
    <>
      <Descriptions
        title="User Information"
        size="default"
        items={driverInfos}
      />
      <Descriptions
        title="Emergency Contact"
        size="default"
        items={emergencyContact}
      />
      <Descriptions
        title="License Information"
        size="default"
        items={licenseInfo}
      />
      <Descriptions title="Availability" size="default" items={availability} />
    </>
  );
};

UserDetails.propTypes = {
  driver: PropTypes.object,
};

export default UserDetails;
