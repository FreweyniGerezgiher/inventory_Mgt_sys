import { useEffect, useMemo, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider, Input, Button } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../../components/drawer/FormDrawer";
import AddUserForm from "./AddUserForm";
import DetailsDrawer from "../../components/drawer/DetailsDrawer";
import DataTable from "../../components/tables/DataTable";
import UserDetails from "./UserDetails";
import ActivateDeactivateModal from "../../components/modals/ActivateDeactivateModal";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";

const UserTable = () => {
  const [drivers, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const [isRemoveAsset, setIsRemoveAsset] = useState(false);
  const [loading, setLoading] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
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
    title: "First Name",
    dataIndex: "first_name",
    key: "first_name",
    ...getColumnSearchProps("first_name"),
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
    ...getColumnSearchProps("last_name"),
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
    ...getColumnSearchProps("role"),
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
    ...getColumnSearchProps("location"),
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
    ...getColumnSearchProps("email"),
  },
  {
    title: "Status",
    dataIndex: "status",
    key: "status",
    render: (text) => (
      <span
        style={{
          color: text === 1 ? "#00FF00" : text === 0 ? "#d42f06" : "black",
        }}
      >
        {text === 1 ? "Active" : "Inactive"}
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
                    {record.status === 1 ? "Deactivate" : "Activate"}
                  </span>
                ),
              },
            ],
            onClick: (event) => handleMenuClick(event, record),
          }}
          className="flex flex-row px-4 hover:-400"
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

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const requestPayload = {
        method: "get",
        url: `${URL + "/users/all"}`,
      };
      const response = await http.request(requestPayload);
      if (!response.isError) {
        setLoading(false);
        setUsers(response.data.map((user) => ({ ...user, key: user.id, role: user.role.name, location: user.location.name })));
      } else {
        setLoading(false);
        console.log({ response });
      }
    } catch (error) {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };
  const handleMenuClick = (event, recordItem) => {
    console.log("record Item", recordItem);
    if (event.key === "1") {
      setSelectedUser(recordItem);
      setOpenUpdate(true);
    }
    if (event.key === "2") {
      setSelectedUser(recordItem);
      setOpenDetails(true);
    }
    if (event.key === "3") {
      setSelectedUser(recordItem);
      setIsDelete(true);
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
    setSelectedUser(null);
    fetchUsers();
  };
  const handleOnSubmitChangeUser = () => {
    if (submitBtnRef.current) submitBtnRef.current.click();
  };
  const handleSubmitUserEvent = () => {
    handleOnSubmitChangeUser();
  };
  const handleDeleteItem = async () => {
    console.log("Delete fun", selectedUser);
    try {
      if (selectedUser?.driver_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/driver/remove/${selectedUser?.driver_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("User Deleted successfully");
          fetchUsers();
        } else {
          toast.error("Failed to delete driver");
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };
  function handleDeleteUser() {
    if (confirmBtnRef.current) confirmBtnRef.current.click();
    setIsDelete(false);
  }
  const handleActivateDeactivate = async () => {
    // console.log("Activate fun", selectedUser);
    try {
      if (selectedUser?.driver_id) {
        const requestPayload = {
          method: "put",
          url: `${URL}/driver/update_status`,
          data: {
            driver_status:
              selectedUser?.status === "Active" ? "Inactive" : "Active",
            driver_id: selectedUser?.driver_id,
          },
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("User updated successfully");
          fetchUsers();
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
      if (selectedUser?.driver_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/assign_driver/remove_by_did/${selectedUser?.driver_id}`,
        };
        const response = await http.request(requestPayload);
        console.log("response", response);
        if (!response.isError) {
          toast.success("Asset removed from driver successfully");
          fetchUsers();
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
    fetchUsers();
  }, []);
  useEffect(() => {
    if (isActivate && statusValue && selectedUser?.driver_id)
      handleActivationClickBtn();
  }, [statusValue, isActivate, selectedUser?.driver_id]);
  useEffect(() => {
    if (isDelete && selectedUser?.driver_id) handleDeleteUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, selectedUser?.driver]);
  useEffect(() => {
    if (isRemoveAsset && selectedUser?.driver_id) handleRemoveAssetClickBtn();
  }, [isRemoveAsset, selectedUser?.driver_id]);
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
          title="Add User"
          onSubmitForm={handleSubmitUserEvent}
          open={open}
          onCloseDrawer={handleOnClose}
        >
          <AddUserForm
            onSuccess={handleOnClose}
            submitBtnRef={submitBtnRef}
          />
        </FormDrawer>
      )}

      {openDetails && (
        <DetailsDrawer
          open={openDetails}
          onCloseDrawer={handleOnClose}
          title="User Details"
        >
          <UserDetails driver={selectedUser} />
        </DetailsDrawer>
      )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title={"Delete User"}
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

export default UserTable;
