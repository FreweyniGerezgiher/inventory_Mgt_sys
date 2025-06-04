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
import { toast } from "react-toastify";

const UserTable = () => {
  const [users, setUsers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const submitBtnRef = useRef(null);

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
      const response = await http.request({
        method: "get",
        url: `${URL}/users/all`,
      });
      if (!response.isError) {
        setUsers(response.data.map(user => ({ 
          ...user, 
          key: user.id, 
          role: user.role.name, 
          location: user.location.name 
        })));
      }
    } catch (error) {
      toast.error("Failed to fetch users");
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleMenuClick = async (event, recordItem) => {
    console.log(event.key)
    setSelectedUser(recordItem);
    
    switch(event.key) {
      case "1":
        setOpenUpdate(true);
        break;
      case "2": 
      handleDeleteUser();
        break;
      case "3": 
        await toggleUserStatus(recordItem);
        break;
    }
  };

  const toggleUserStatus = async (user) => {
    try {
      const newStatus = user.status === 1 ? 0 : 1;
      const response = await http.request({
        method: "put",
        url: `${URL}/users/update_status/${user.id}/${newStatus}`,
        data: { status: newStatus }
      });
      
      if (!response.isError) {
        toast.success(`User ${newStatus === 1 ? 'activated' : 'deactivated'} successfully`);
        fetchUsers();
      } else {
        toast.error(response.message || "Failed to update user status");
      }
    } catch (error) {
      toast.error("Error updating user status");
    }
  };

  const handleDeleteUser = async () => {
    try {
      if (!selectedUser) return;
      
      const response = await http.request({
        method: "delete",
        url: `${URL}/users/${selectedUser.id}`,
      });
      
      if (!response.isError) {
        toast.success("User deleted successfully");
        fetchUsers();
      } else {
        toast.error(response.message || "Failed to delete user");
      }
    } catch (error) {
      toast.error("Error deleting user");
    } finally {
      setIsDelete(false);
      setSelectedUser(null);
    }
  };

  const handleOnClose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setSelectedUser(null);
    fetchUsers();
  };

  useEffect(() => {
    fetchUsers();
  }, []);

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
          title={`Edit User #${selectedUser?.id}`}
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
    </>
  );
};

export default UserTable;