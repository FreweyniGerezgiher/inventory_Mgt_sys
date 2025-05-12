import { Descriptions } from "antd";
import PropTypes from "prop-types";

const AssetDetails = ({ asset }) => {
  console.log("Asset Details", asset);
  const productInfo = [
    {
      key: "1",
      label: "Name",
      children: asset?.product_info.vehicle_conventional_name
        ? asset?.product_info.vehicle_conventional_name
        : "---",
    },
    {
      key: "2",
      label: "Vehicle Type",
      children: asset?.product_info?.vehicle_type
        ? asset?.product_info?.vehicle_type
        : "---",
    },
    {
      key: "3",
      label: "Model",
      children: asset?.product_info?.vehicle_model
        ? asset?.product_info?.vehicle_model
        : "---",
    },
  ];
  const structuralInfo = [
    {
      key: "1",
      label: "Number of Airbags",
      children: asset?.structural_info?.vehicle_number_of_airbags
        ? asset?.structural_info?.vehicle_number_of_airbags
        : "---",
    },
    {
      key: "2",
      label: "Seating Capacity",
      children: asset?.structural_info?.vehicle_seating_capacity
        ? asset?.structural_info?.vehicle_seating_capacity
        : "---",
    },
    {
      key: "3",
      label: "Payload",
      children: asset?.structural_info?.vehicle_payload
        ? asset?.structural_info?.vehicle_payload
        : "---",
    },
  ];
  const engineInfo = [
    {
      key: "1",
      label: "Usage",
      children: asset?.engine_info?.vehicle_specific_usage
        ? asset?.engine_info?.vehicle_specific_usage
        : "---",
    },
    {
      key: "2",
      label: "Horse-power",
      children: asset?.engine_info?.vehicle_engine_horsepower
        ? asset?.engine_info?.vehicle_engine_horsepower
        : "---",
    },
    {
      key: "3",
      label: "Description",
      children: asset?.engine_info?.vehicle_engine_description
        ? asset?.engine_info?.vehicle_engine_description
        : "---",
    },
  ];
  const insuranceInfo = [
    {
      key: "1",
      label: "Policy Number",
      children: asset?.insurance_info?.policy_number
        ? asset?.insurance_info?.policy_number
        : "---",
    },
    {
      key: "2",
      label: "Provider",
      children: asset?.insurance_info?.insurance_provider
        ? asset?.insurance_info?.insurance_provider
        : "---",
    },
    {
      key: "3",
      label: "Insurance Expiry Date",
      children: asset?.expiration_date ? asset?.expiration_date : "---",
    },
    {
      key: "4",
      label: "Maintainance Schedule Date",
      children: asset?.maintainance_schedule
        ? asset?.maintainance_schedule
        : "---",
    },
  ];
  return (
    <>
      <Descriptions
        title="Product Information"
        size="default"
        items={productInfo}
      />
      <Descriptions
        title="Structural Information"
        size="default"
        items={structuralInfo}
      />
      <Descriptions
        title="Engine Information"
        size="default"
        items={engineInfo}
      />
      <Descriptions
        title="Insurance Information"
        size="default"
        items={insuranceInfo}
      />
    </>
  );
};

AssetDetails.propTypes = {
  asset: PropTypes.object,
};

export default AssetDetails;
