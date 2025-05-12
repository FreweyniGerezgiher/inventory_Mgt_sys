import { useEffect, useMemo, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../config/config";
import { http } from "../services/http/http";
import { Dropdown, Space, ConfigProvider, Input, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../components/drawer/FormDrawer";
import AddDriverForm from "./AddDriverForm";
import DetailsDrawer from "../components/drawer/DetailsDrawer";
import DataTable from "../components/tables/DataTable";
import DriverDetails from "./DriverDetails";
import FormModal from "../components/modals/FormModal";
import ActivateDeactivateModal from "../components/modals/ActivateDeactivateModal";
import AssignAsset from "./AssignAsset";
import ConfirmModal from "../components/modals/ConfirmModal";
import formatDate from "../utils/formatdate";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const DriverTable = () => {
  const [drivers, setDrivers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openAssignAssetModal, setOpenAssignAssetModal] = useState(false);
  const [openAvailability, setOpenAvailability] = useState(false);

  const [openCreateAccident, setOpenCreateAccident] = useState(false);
  const [openCreateViolation, setOpenCreateViolation] = useState(false);
  const [isRemoveAsset, setIsRemoveAsset] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedDriver, setSelectedDriver] = useState(null);
  const [statusValue, setStatusValue] = useState("");
  const [isDelete, setIsDelete] = useState(false);
  const [isActivate, setIsActivate] = useState(false);
  // const [isActivation]
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");
  const searchInput = useRef(null);
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const activateBtnRef = useRef(null);
  const removeAssetBtnRef = useRef(null);

  const handleRemoveAssetClickBtn = () => {
    if (removeAssetBtnRef.current) removeAssetBtnRef.current.click();
    setIsRemoveAsset(false);
  };

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
      title: "E-mail",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Phone No.",
      dataIndex: "phone",
      key: "phone",
    },

    {
      title: "Asset",
      dataIndex: "asset_assigned",
      key: "asset_assigned",
      render: (text) => (
        <span
          style={{
            color:
              text === "Yes" ? "#00FF00" : text === "No" ? "#d42f06" : "black",
          }}
        >
          {text}
        </span>
      ),
    },
    {
      title: "License Plate",
      dataIndex: "license_plate",
      key: "license_plate",
      render: (text) => (
        <span style={{ color: text !== "---" ? "#00FF00" : "#d42f06" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Accidents",
      dataIndex: "accidents",
      key: "accidents",
      render: (text) => (
        <span style={{ color: text !== "---" ? "#00FF00" : "#d42f06" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Violations",
      dataIndex: "violation",
      key: "violation",
      render: (text) => (
        <span style={{ color: text !== "---" ? "#00FF00" : "#d42f06" }}>
          {text}
        </span>
      ),
    },
    {
      title: "Distance Covered(km)",
      dataIndex: "total_distance",
      key: "total_distance",
      render: (text) => (
        <span style={{ color: text !== "---" ? "#00FF00" : "#d42f06" }}>
          {text}
        </span>
      ),
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
      title: "Action",
      key: "action",
      fixed: "right",
      // eslint-disable-next-line no-unused-vars
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
                  label: <span style={{ color: "#00FFFF" }}> Edit </span>,
                },
                {
                  key: "2",
                  label: <span style={{ color: "#00FFFF" }}>Details</span>,
                },
                {
                  key: "3",
                  label: <span style={{ color: "#00FFFF" }}> Delete </span>,
                },
                {
                  key: "4",
                  label: (
                    <span style={{ color: "#00FFFF" }}>
                      {record?.asset_assigned === "Yes"
                        ? "Remove Asset"
                        : "Assign Asset"}
                    </span>
                  ),
                },
                {
                  key: "5",
                  label: (
                    <span style={{ color: "#00FFFF" }}>
                      {record?.status === "Active" ? "Deactivate" : "Activate"}
                    </span>
                  ),
                },
                {
                  key: "6",
                  label: <span style={{ color: "#00FFFF" }}>Add Accident</span>,
                },
                {
                  key: "7",
                  label: (
                    <span style={{ color: "#00FFFF" }}>Add Violation</span>
                  ),
                },
                {
                  key: "8",
                  label: (
                    <span style={{ color: "#00FFFF" }}>Set Availability</span>
                  ),
                },
              ],
              onClick: (event) => handleMenuClick(event, record),
            }}
            className="flex flex-row px-4   hover:-400"
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
  const fetchDrivers = async () => {
    try {
      setLoading(true);
      const requestPayload = {
        method: "get",
        url: `${URL + "/driver/list_with_all"}`,
      };
      const response = await http.request(requestPayload);
      console.log("driver list", response);
      if (!response.isError) {
        setLoading(false);
        // Assuming response.data contains the list of drivers
        let id = 1;
        const formattedDrivers = response.map((driver) => ({
          ...driver,
          id: id++,
          name: driver?.driver_full_name,
          address: driver?.address,
          status: driver?.status,
          licenseType: driver?.license_information?.license_type,
          phone: driver?.contact_information?.phone,
          email: driver?.contact_information?.email,
          license_plate: driver?.asset_assignment_status
            ? driver?.asset_license_plate
            : "---",
          violation: driver?.num_of_violations,
          accidents: driver?.num_of_accidents,
          asset_assigned: driver?.asset_assignment_status ? "Yes" : "No",
          total_distance: driver?.total_driving_distance / 1000,
          licenseExpiry: formatDate(
            new Date(driver?.license_information?.license_expiration)
          ),
        }));
        setDrivers(formattedDrivers);
      } else {
        setLoading(false);
        console.log({ response });
      }
    } catch (error) {
      setLoading(false);
      // setError("Failed to fetch data. Please try again later.");
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };
  const handleMenuClick = (event, recordItem) => {
    console.log("record Item", recordItem);
    if (event.key === "1") {
      setSelectedDriver(recordItem);
      setOpenUpdate(true);
    }
    if (event.key === "2") {
      setSelectedDriver(recordItem);
      setOpenDetails(true);
    }
    if (event.key === "3") {
      setSelectedDriver(recordItem);
      setIsDelete(true);
    }
    if (event.key === "4") {
      setSelectedDriver(recordItem);
      if (recordItem?.asset_assigned === "Yes") {
        setIsRemoveAsset(true);
      } else setOpenAssignAssetModal(true);
    }
    if (event.key === "5") {
      console.log("status", recordItem?.status);
      setSelectedDriver(recordItem);
      setStatusValue(recordItem?.status);
      setIsActivate(true);
    }
    if (event.key === "6") {
      setSelectedDriver(recordItem);
      setOpenCreateAccident(true);
    }
    if (event.key === "7") {
      setSelectedDriver(recordItem);
      setOpenCreateViolation(true);
    }
    if (event.key === "8") {
      setSelectedDriver(recordItem);
      setOpenAvailability(true);
    }
  };
  const handleOnClose = () => {
    setOpen(false);
    setOpenAssignAssetModal(false);
    setOpenAvailability(false);
    setOpenCreateAccident(false);
    setOpenCreateViolation(false);
    setOpenUpdate(false);
    setOpenDetails(false);
    setSelectedDriver(null);
    fetchDrivers();
  };
  const handleOnSubmitChangeDriver = () => {
    if (submitBtnRef.current) submitBtnRef.current.click();
  };
  const handleSubmitDriverEvent = () => {
    handleOnSubmitChangeDriver();
  };
  const handleDeleteItem = async () => {
    console.log("Delete fun", selectedDriver);
    try {
      if (selectedDriver?.driver_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/driver/remove/${selectedDriver?.driver_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Driver Deleted successfully");
          fetchDrivers();
        } else {
          toast.error("Failed to delete driver");
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };
  function handleDeleteDriver() {
    if (confirmBtnRef.current) confirmBtnRef.current.click();
    setIsDelete(false);
  }
  const handleActivateDeactivate = async () => {
    // console.log("Activate fun", selectedDriver);
    try {
      if (selectedDriver?.driver_id) {
        const requestPayload = {
          method: "put",
          url: `${URL}/driver/update_status`,
          data: {
            driver_status:
              selectedDriver?.status === "Active" ? "Inactive" : "Active",
            driver_id: selectedDriver?.driver_id,
          },
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Driver updated successfully");
          fetchDrivers();
        } else {
          toast.error("Failed to update driver");
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };
  const handleRemoveAssetAssigned = async () => {
    try {
      if (selectedDriver?.driver_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/assign_driver/remove_by_did/${selectedDriver?.driver_id}`,
        };
        const response = await http.request(requestPayload);
        console.log("response", response);
        if (!response.isError) {
          toast.success("Asset removed from driver successfully");
          fetchDrivers();
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
  useEffect(() => {
    fetchDrivers();
  }, []);
  useEffect(() => {
    if (isActivate && statusValue && selectedDriver?.driver_id)
      handleActivationClickBtn();
  }, [statusValue, isActivate, selectedDriver?.driver_id]);
  useEffect(() => {
    if (isDelete && selectedDriver?.driver_id) handleDeleteDriver();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, selectedDriver?.driver]);
  useEffect(() => {
    if (isRemoveAsset && selectedDriver?.driver_id) handleRemoveAssetClickBtn();
  }, [isRemoveAsset, selectedDriver?.driver_id]);
  const tableProps = {
    bordered: true,
    size: "middle",
  };


  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx">
            <div className="inline-block min-w-full px-1.5 py-2 align-middle">
              <div className="overflow-hidden  md:rounded-lg">
                <DataTable
                  data={drivers}
                  loading={loading}
                  columns={columns}
                  tableProps={tableProps}
                />
              </div>
            </div>
            <div
              className="group fixed bottom-1 z-50 md:bottom-10 right-1 md:right-10 flex h-12 w-12 cursor-pointer items-end justify-end"
              onClick={handleAddClick}
            >
              <div className="absolute z-50 flex items-center justify-center rounded-full bg-blue-600 p-3  shadow-xl">
                <PlusIcon className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>
      {open && (
        <FormDrawer
          title="Add Driver"
          onSubmitForm={handleSubmitDriverEvent}
          open={open}
          onCloseDrawer={handleOnClose}
        >
          <AddDriverForm
            onSuccess={handleOnClose}
            submitBtnRef={submitBtnRef}
          />
        </FormDrawer>
      )}

      {openDetails && (
        <DetailsDrawer
          open={openDetails}
          onCloseDrawer={handleOnClose}
          title="Driver Details"
        >
          <DriverDetails driver={selectedDriver} />
        </DetailsDrawer>
      )}
      {openAssignAssetModal && (
        <FormModal
          isModalOpen={openAssignAssetModal}
          onCloseModal={handleOnClose}
          title="Assign Asset"
          onSubmitForm={handleSubmitDriverEvent}
        >
          <AssignAsset
            onSuccess={handleOnClose}
            submitBtnRef={submitBtnRef}
            driver={selectedDriver}
          />
        </FormModal>
      )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title={"Delete Driver"}
        message={"this driver"}
        confirmBtnRef={confirmBtnRef}
      />
      <ActivateDeactivateModal
        title="Remove Asset"
        onActivateDeactivate={handleRemoveAssetAssigned}
        message="remove this asset from driver"
        activateBtnRef={removeAssetBtnRef}
      />
      <ActivateDeactivateModal
        onActivateDeactivate={handleActivateDeactivate}
        title={statusValue === "Active" ? "Deactivate" : "Activate"}
        message={
          statusValue === "Active"
            ? "deactivate this driver"
            : "activate this driver"
        }
        activateBtnRef={activateBtnRef}
        statusValue={statusValue}
      />
    </>
  );
};

export default DriverTable;
