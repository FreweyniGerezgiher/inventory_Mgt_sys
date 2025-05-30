import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../../components/drawer/FormDrawer";
import AddUserForm from "./AddUserForm";
import EditUserForm from "./EditUserForm";
import DataTable from "../../components/tables/DataTable";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);

  const [loading, setLoading] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const removeAssetBtnRef = useRef(null);

  const handleSubmitUserEvent = () => {
    submitBtnRef.current?.click();
  };

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
  },
  {
    title: "Last Name",
    dataIndex: "last_name",
    key: "last_name",
  },
  {
    title: "Role",
    dataIndex: "role",
    key: "role",
  },
  {
    title: "Location",
    dataIndex: "location",
    key: "location",
  },
  {
    title: "E-mail",
    dataIndex: "email",
    key: "email",
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
                label: <span style={{ color: "#00FFFF" }}>Delete</span>,
              },
              {
                key: "3",
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
    if (event.key === "1") {
      setSelectedUser(recordItem);
      setOpenUpdate(true);
    }
    if (event.key === "2") {
      setSelectedUser(recordItem);
      setIsDelete(true);
    }

  };
  const handleOnClose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setSelectedUser(null);
    fetchUsers();
  };

  const handleDeleteItem = async () => {
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

  useEffect(() => {
    fetchUsers();
  }, []);

  useEffect(() => {
    if (isDelete && selectedUser?.driver_id) handleDeleteUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isDelete, selectedUser?.driver]);

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
                  data={users}
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

      {openUpdate && (
      <FormDrawer
        title={`Edit User #${selectedUser.id}`}
        onSubmitForm={handleSubmitUserEvent}
        open={openUpdate}
        onCloseDrawer={handleOnClose}
        isUpdate={true}
      >
        <EditUserForm 
          userData={selectedUser} 
          onSuccess={handleOnClose} 
          submitBtnRef={submitBtnRef} 
        />
      </FormDrawer>
    )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title={"Delete User"}
        message={"this driver"}
        confirmBtnRef={confirmBtnRef}
      />
    </>
  );
};

export default UserTable;
