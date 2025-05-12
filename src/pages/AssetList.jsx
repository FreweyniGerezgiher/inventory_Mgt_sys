import { useEffect, useMemo, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../config/config";
import { http } from "../services/http/http";
import { Dropdown, Space, ConfigProvider, Button, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../components/drawer/FormDrawer";
import AddAssetForm from "./AddAssetForm";
import DetailsDrawer from "../components/drawer/DetailsDrawer";
import DataTable from "../components/tables/DataTable";
import formatDate from "../utils/formatdate";
import ConfirmModal from "../components/modals/ConfirmModal";
import ActivateDeactivateModal from "../components/modals/ActivateDeactivateModal";
import AssetDetails from "./AssetDetails";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
export default function AssetTable() {
  const [assets, setAssets] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedAsset, setSelectedAsset] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  const [isRemoveGroup, setIsRemoveGroup] = useState(false);
  const [isRemoveDriver, setIsRemoveDriver] = useState(false);
  const [isRemoveDevice, setIsRemoveDevice] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [loading, setLoading] = useState(false);

  const searchInput = useRef(null);
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const activateBtnRef = useRef(null);
  const removeGroupBtnRef = useRef(null);
  const removeDriverBtnRef = useRef(null);
  const removeDeviceBtnRef = useRef(null);

  const handleSearch = (selectedKeys, confirm, dataIndex) => {
    confirm();
    setSearchText(selectedKeys[0]);
    setSearchedColumn(dataIndex);
  };
  const handleReset = (clearFilters) => {
    clearFilters();
    setSearchText("");
  };
  const getColumnSearchProps = (dataIndex) => ({
    filterDropdown: ({
      setSelectedKeys,
      selectedKeys,
      confirm,
      clearFilters,
      close,
    }) => (
      <div
        style={{
          padding: 8,
        }}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <Input
          ref={searchInput}
          placeholder={`Search ${dataIndex}`}
          value={selectedKeys[0]}
          onChange={(e) =>
            setSelectedKeys(e.target.value ? [e.target.value] : [])
          }
          onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
          style={{
            marginBottom: 8,
            display: "block",
            color: "white",
          }}
        />
        <Space>
          <Button
            type="primary"
            onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
            icon={<SearchOutlined />}
            size="small"
            className=" shadow-gray-600  border-gray-600 hover:bg-gray-700 active:bg-gray-700"
            style={{
              width: 90,
            }}
          >
            Search
          </Button>
          <Button
            onClick={() => clearFilters && handleReset(clearFilters)}
            size="small"
            style={{
              width: 90,
            }}
          >
            Reset
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              confirm({
                closeDropdown: false,
              });
              setSearchText(selectedKeys[0]);
              setSearchedColumn(dataIndex);
            }}
          >
            Filter
          </Button>
          <Button
            type="link"
            size="small"
            onClick={() => {
              close();
            }}
          >
            close
          </Button>
        </Space>
      </div>
    ),
    filterIcon: (filtered) => (
      <SearchOutlined
        style={{
          color: filtered ? "#2ff57b" : "#ffffff",
        }}
      />
    ),
    onFilter: (value, record) =>
      record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
    onFilterDropdownOpenChange: (visible) => {
      if (visible) {
        setTimeout(() => searchInput.current?.select(), 100);
      }
    },
    render: (text) =>
      searchedColumn === dataIndex ? (
        <Highlighter
          highlightStyle={{
            backgroundColor: "#ffc069",
            padding: 0,
          }}
          searchWords={[searchText]}
          autoEscape
          textToHighlight={text ? text.toString() : ""}
        />
      ) : (
        text
      ),
  });
  const columns = [
    {
      title: "No_",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      ...getColumnSearchProps("name"),
    },
    {
      title: "License Plate",
      dataIndex: "license_plate",
      key: "license_plate",
      ...getColumnSearchProps("license_plate"),
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (text) => (
        <span
          style={{
            color:
              text === "Active"
                ? "#00FF00"
                : text === "Inactive"
                ? "#d42f06"
                : "black",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Insurance Exp Status",
      dataIndex: "insurance_expiration_status",
      key: "insurance_expiration_status",
      render: (text) => (
        <span
          style={{
            color:
              text === "Active"
                ? "#00FF00"
                : text === "Expired"
                ? "#d42f06"
                : "black",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "Maintenance Status",
      dataIndex: "maintenance_service_status",
      key: "maintenance_service_status",
      render: (text) => (
        <span
          style={{
            color:
              text === "Completed"
                ? "#00FF00"
                : text === "Due"
                ? "#f5e942"
                : text === "Overdue"
                ? "#d42f06"
                : "black",
          }}
        >
          {text}
        </span>
      ),
    },

    {
      title: "Driver",
      dataIndex: "driver",
      key: "driver",
      render: (text) => (
        <span style={{ color: text !== "---" ? "#00FF00" : "#d42f06" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Device",
      dataIndex: "device",
      key: "device",
      render: (text) => (
        <span style={{ color: text !== "---" ? "#00FF00" : "#d42f06" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Group",
      dataIndex: "group",
      key: "group",
      render: (text) => (
        <span style={{ color: text !== "---" ? "#00FF00" : "#d42f06" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Action",
      key: "action",
      fixed: "right",
      render: (_, record) => (
        <ConfigProvider
          theme={{
            token: {
              colorBgElevated: "#374151",
              colorPrimary: "#fff",
              controlItemBgActiveHover: "#6b7280",
              controlItemBgActive: "#6b7280",
              controlItemBgHover: "#6b7280",
            },
          }}
        >
          <Dropdown
            menu={{
              items: [
                {
                  key: "1",
                  label: <span style={{ color: "#00FFFF" }}>Edit</span>,
                },
                {
                  key: "2",
                  label: <span style={{ color: "#00FFFF" }}>Details</span>,
                },
                {
                  key: "3",
                  label: <span style={{ color: "#00FFFF" }}>Delete</span>,
                },
                {
                  key: "4",
                  label: (
                    <span style={{ color: "#00FFFF" }}>
                      {record?.driver_assignment_status
                        ? "Remove Driver"
                        : "Assign Driver"}
                    </span>
                  ),
                },
                {
                  key: "5",
                  label: (
                    <span style={{ color: "#00FFFF" }}>
                      {record?.device_assignment_status
                        ? "Remove Device"
                        : "Assign Device"}
                    </span>
                  ),
                },
                {
                  key: "6",
                  label: (
                    <span style={{ color: "#00FFFF" }}>
                      {record?.group_assignment_status
                        ? "Remove Group"
                        : "Assign Group"}
                    </span>
                  ),
                },
                {
                  key: "7",
                  label: <span style={{ color: "#00FFFF" }}>Add Schedule</span>,
                },
                {
                  key: "8",
                  label: (
                    <span style={{ color: "#00FFFF" }}>
                      {record?.status === "Active" ? "Deactivate" : "Activate"}
                    </span>
                  ),
                },
                (record?.maintenance_service_status === "Due" ||
                  record?.maintenance_service_status === "Overdue") && {
                  key: "9",
                  label: <span style={{ color: "#00FFFF" }}>Complete</span>,
                },

                record?.insurance_expiration_status === "Expired" && {
                  key: "10",
                  label: (
                    <span style={{ color: "#00FFFF" }}>Activate Insurance</span>
                  ),
                },
              ],
              onClick: (event) => handleMenuClick(event, record),
            }}
            className="flex flex-row px-4  hover:-400"
          >
            <a>
              <Space size="small">
                Actions
                <DownOutlined style={{ fontSize: "90%" }} />
              </Space>
            </a>
          </Dropdown>
        </ConfigProvider>
      ),
    },
  ];

  const fetchAssets = async () => {
    try {
      // Fetch assets
      setLoading(true);
      const assetsRequestPayload = {
        method: "get",
        url: `${URL + "/asset/list"}`,
      };
      const firstResponse = await http.request(assetsRequestPayload);

      // Fetch assets with all details
      const assetWithAllRequestPayload = {
        method: "get",
        url: `${URL + "/asset/list_with_all"}?type=Type-1`,
      };
      const secondResponse = await http.request(assetWithAllRequestPayload);
      console.log({ firstResponse, secondResponse });
      if (!firstResponse.isError && !secondResponse.isError) {
        setLoading(false);
        let id = 1;

        // Map over the first response and merge with corresponding second response
        const formattedAssets = firstResponse.map((asset) => {
          // Find the corresponding asset in the second response by asset ID
          const detailedAsset = secondResponse.find(
            (item) => item.asset_id === asset.asset_id
          );

          // Merge and format the data
          return {
            ...asset,
            ...detailedAsset, // Merging detailed information
            id: id++,
            name: detailedAsset?.asset_name,
            license_plate: detailedAsset?.vehicle_license_plate_num,
            status: detailedAsset?.asset_status,
            expiration_date: formatDate(
              detailedAsset?.insurance_expiration_date
            ),
            maintainance_schedule: formatDate(
              detailedAsset?.maintainance_schedule
            ),
            group: detailedAsset?.group_assignment_status
              ? detailedAsset?.group_name
              : "---",
            driver: asset?.driver_assignment_status
              ? detailedAsset?.driver_name
              : "---",
            device: detailedAsset?.device_assignment_status
              ? detailedAsset?.device_imei_num
              : "---",
          };
        });

        setAssets(formattedAssets);
        console.log({ formattedAssets });
      } else {
        setLoading(false);
        console.log("Error fetching data", { firstResponse, secondResponse });
      }
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };
  const handleActivateInsurance = async (passedAsset) => {
    try {
      if (passedAsset?.asset_id) {
        const requestPayload = {
          method: "put",
          url: `${URL}/asset/update_insu_state/${passedAsset?.asset_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Asset activated insurance successfully");
          fetchAssets();
        } else {
          toast.error("Failed to activate insurance on asset");
        }
      }
    } catch (error) {
      console.error(
        "Failed to activate insurance on asset. Please try again later.",
        error
      );
    }
  };
  const handleCompleteService = async (passedAsset) => {
    try {
      if (passedAsset?.asset_id) {
        const requestPayload = {
          method: "put",
          url: `${URL}/schedule/update_main_status/${passedAsset?.asset_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Asset completed successfully");
          fetchAssets();
        } else {
          toast.error("Failed to complete asset");
        }
      }
    } catch (error) {
      console.error("Failed to complete data. Please try again later.", error);
    }
  };
  const handleMenuClick = (event, recordItem) => {
    // console.log("record Item", recordItem);
    if (event.key === "1") {
      setSelectedAsset(recordItem);
      setOpenUpdate(true);
    }
    if (event.key === "2") {
      setSelectedAsset(recordItem);
      setOpenDetails(true);
    }
    if (event.key === "3") {
      setSelectedAsset(recordItem);
      setIsDelete(true);
    }
    if (event.key === "4") {
      setSelectedAsset(recordItem);
      if (recordItem?.driver_assignment_status) {
        setIsRemoveDriver(true);
      } else setOpenAssignDriverModal(true);
    }
    
  };
  const handleOnClose = () => {
    setOpen(false);
    setOpenAssignDriverModal(false);
    setOpenUpdate(false);
    setOpenDetails(false);
    setSelectedAsset(null);
    fetchAssets();
  };
  const handleOnSubmitChangeAsset = () => {
    if (submitBtnRef.current) submitBtnRef.current.click();
  };
  const handleSubmitAssetEvent = () => {
    handleOnSubmitChangeAsset();
  };
  const handleDeleteItem = async () => {
    try {
      if (selectedAsset?.asset_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/asset/remove/${selectedAsset?.asset_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Asset deleted successfully");
          fetchAssets();
        } else {
          toast.error("Failed to delete asset");
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };
  function handleDeleteAsset() {
    if (confirmBtnRef.current) confirmBtnRef.current.click();
    setIsDelete(false);
  }
  const handleActivateDeactivate = async () => {
    try {
      if (selectedAsset?.asset_id) {
        const requestPayload = {
          method: "put",
          url: `${URL}/asset/update_state`,
          data: {
            asset_id: selectedAsset?.asset_id,
            asset_status:
              selectedAsset?.status === "Active" ? "Inactive" : "Active",
          },
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Asset updated successfully");
          fetchAssets();
        } else {
          toast.error("Failed to update asset");
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };
  const handleRemoveAssetAssigned = async () => {
    try {
      if (selectedAsset?.asset_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/asset_group/remove/${selectedAsset?.asset_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Asset removed from group successfully");
          fetchAssets();
        } else {
          toast.error("Failed to remove asset from group");
          console.log({ response });
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };
  const handleRemoveDriverAssigned = async () => {
    try {
      if (selectedAsset?.asset_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/assign_driver/remove/${selectedAsset?.asset_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Asset removed from driver successfully");
          fetchAssets();
        } else {
          toast.error("Failed to remove asset from driver");
          console.log({ response });
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };
  const handleRemoveDeviceAssigned = async () => {
    try {
      if (selectedAsset?.asset_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/asset_dot/remove/${selectedAsset?.asset_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Asset removed from driver successfully");
          fetchAssets();
        } else {
          toast.error("Failed to remove asset from driver");
          console.log({ response });
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };
  function handleActivationClickBtn() {
    if (activateBtnRef.current) activateBtnRef.current.click();
    setIsActivate(false);
  }
  const handleRemoveAssetClickBtn = () => {
    if (removeGroupBtnRef.current) removeGroupBtnRef.current.click();
    setIsRemoveGroup(false);
  };
  const handleRemoveDriverClickBtn = () => {
    if (removeDriverBtnRef.current) removeDriverBtnRef.current.click();
    setIsRemoveDriver(false);
  };
  const handleRemoveDeviceClickBtn = () => {
    if (removeDeviceBtnRef.current) removeDeviceBtnRef.current.click();
    setIsRemoveDevice(false);
  };

  useEffect(() => {
    fetchAssets();
  }, []);
  useEffect(() => {
    if (isActivate && statusValue && selectedAsset?.asset_id)
      handleActivationClickBtn();
  }, [statusValue, isActivate, selectedAsset?.asset_id]);
  useEffect(() => {
    if (isDelete && selectedAsset?.asset_id) handleDeleteAsset();
  }, [isDelete, selectedAsset?.asset_id]);
  useEffect(() => {
    if (isRemoveGroup && selectedAsset?.asset_id) handleRemoveAssetClickBtn();
  }, [isRemoveGroup, selectedAsset?.asset_id]);
  useEffect(() => {
    if (isRemoveDriver && selectedAsset?.asset_id) handleRemoveDriverClickBtn();
  }, [isRemoveDriver, selectedAsset?.asset_id]);
  useEffect(() => {
    if (isRemoveDevice && selectedAsset?.asset_id) handleRemoveDeviceClickBtn();
  }, [isRemoveDevice, selectedAsset?.asset_id]);
  const tableProps = {
    bordered: true,
    size: "middle",
  };
  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx">
            <div className="inline-block min-w-full px-1.5 py-2 align-middle mb-8">
              <div className="overflow-hidden  md:rounded-lg">
                <DataTable
                  data={assets}
                  loading={loading}
                  columns={columns}
                  tableProps={tableProps}
                />
              </div>
            </div>

            <div
              className="group fixed   bottom-1 z-50 md:bottom-5 right-1 md:right-10 flex h-12 w-12 cursor-pointer items-end justify-end"
              onClick={handleAddClick}
            >
              <div className="absolute z-50 flex   items-center justify-center rounded-full bg-blue-600 p-3  shadow-xl">
                <PlusIcon className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <FormDrawer
          title="Add Asset"
          onSubmitForm={handleSubmitAssetEvent}
          open={open}
          onCloseDrawer={handleOnClose}
        >
          <AddAssetForm onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
        </FormDrawer>
      )}
      {openDetails && (
        <DetailsDrawer
          open={openDetails}
          onCloseDrawer={handleOnClose}
          title="Asset Details"
        >
          <AssetDetails asset={selectedAsset} />
        </DetailsDrawer>
      )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title={"Delete Asset"}
        message={"this asset"}
        confirmBtnRef={confirmBtnRef}
      />
      <ActivateDeactivateModal
        onActivateDeactivate={handleActivateDeactivate}
        title={statusValue === "Active" ? "Deactivate Asset" : "Activate Asset"}
        message={
          statusValue === "Active"
            ? "deactivate this asset"
            : "activate this asset"
        }
        activateBtnRef={activateBtnRef}
        statusValue={statusValue}
      />
      <ActivateDeactivateModal
        title="Remove Asset From Group"
        onActivateDeactivate={handleRemoveAssetAssigned}
        message="remove this asset from group"
        activateBtnRef={removeGroupBtnRef}
      />
      <ActivateDeactivateModal
        title="Remove Driver"
        onActivateDeactivate={handleRemoveDriverAssigned}
        message="remove this driver from asset"
        activateBtnRef={removeDriverBtnRef}
      />
      <ActivateDeactivateModal
        title="Remove Device"
        onActivateDeactivate={handleRemoveDeviceAssigned}
        message="remove this device from asset"
        activateBtnRef={removeDeviceBtnRef}
      />
    </>
  );
}
