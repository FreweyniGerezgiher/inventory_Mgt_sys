import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import DataTable from "../../components/tables/DataTable";
import AddSupplierForm from "./AddSupplierForm";
import UpdateSupplierForm from "./EditSupplierForm";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import FormDrawer from "../../components/drawer/FormDrawer";
import { userService } from "../../services/storageService";

const SupplierTable = () => {
  let user = userService.getUser();

  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState({});
  const [loading, setLoading] = useState(false);
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Company",
      dataIndex: "company_name",
      key: "company_name",
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Account Number",
      dataIndex: "account_number",
      key: "account_number",
    },
    {
      title: "Bank Name",
      dataIndex: "bank_name",
      key: "bank_name",
    },
    
    ...(user.role === "Admin" ? [{
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
              ],
              onClick: (event) => handleMenuClick(event, record),
            }}
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
    }]: []),

  ];

  const fetchSuppliers = async () => {
    try {
      setLoading(true);
      const response = await http.request({
        method: "get",
        url: `${URL}/suppliers/all`,
      });
      if (!response.isError) {
        setSuppliers(response.data);
      } else {
        toast.error("Failed to fetch suppliers");
      }
    } catch (error) {
      toast.error("Error fetching suppliers");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleMenuClick = (event, record) => {
    setSelectedSupplier(record);
    switch (event.key) {
      case "1":
        setOpenEdit(true);
        break;
      case "2":
        setIsDelete(true);
      default:
        break;
    }
  };

  const handleOnClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setSelectedSupplier(null);
    fetchSuppliers();
  };

  const handleSubmitSupplier = () => {
    submitBtnRef.current?.click();
  };

  const handleDeleteItem = async () => {
    try {
      if (selectedSupplier?.id) {
        const response = await http.request({
          method: "delete",
          url: `${URL}/suppliers/${selectedSupplier.id}`,
        });
        if (!response.isError) {
          toast.success("Supplier deleted successfully");
          fetchSuppliers();
        } else {
          toast.error("Failed to delete supplier");
        }
      }
    } catch (error) {
      toast.error("Error deleting supplier");
      console.error(error);
    }
  };

  const handleDeleteSupplier = () => {
    if (confirmBtnRef.current) confirmBtnRef.current.click();
    setIsDelete(false);
  };

  useEffect(() => {
    fetchSuppliers();
  }, []);

  useEffect(() => {
    if (isDelete && selectedSupplier?.id) handleDeleteSupplier();
  }, [isDelete, selectedSupplier?.id]);

  const tableProps = {
    bordered: true,
    size: "middle",
  };

  return (
    <div className="mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto">
          <div className="inline-block min-w-full px-1.5 py-2 align-middle">
            <div className="overflow-y-visible z-10 md:rounded-lg">
              <DataTable
                data={suppliers}
                loading={loading}
                columns={columns}
                tableProps={tableProps}
              />
            </div>
          </div>
    {user.role === "Admin" && (
          <div
            className="fixed bottom-1 md:bottom-10 right-1 md:right-10 flex h-12 w-12 cursor-pointer items-end justify-end"
            onClick={handleAddClick}
          >
            <div className="absolute z-50 flex items-center justify-center rounded-full bg-blue-600 p-3 shadow-xl">
              <PlusIcon className="h-full w-full text-white" />
            </div>
          </div>
          )}

        </div>
      </div>

      {open && (
        <FormDrawer
          title="Add Supplier"
          onSubmitForm={handleSubmitSupplier}
          open={open}
          onCloseDrawer={handleOnClose}
        >
          <AddSupplierForm onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
        </FormDrawer>
      )}

       {openEdit && (
        <FormDrawer
          title={`Edit Supplier #${selectedSupplier.id}`}
          onSubmitForm={handleSubmitSupplier}
          open={openEdit}
          onCloseDrawer={handleOnClose}
          isUpdate={true}
        >
          <UpdateSupplierForm 
            supplierData={selectedSupplier} 
            onSuccess={handleOnClose} 
            submitBtnRef={submitBtnRef} 
          />
        </FormDrawer>
      )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title="Delete Supplier"
        message={`supplier ${selectedSupplier?.name}`}
        confirmBtnRef={confirmBtnRef}
      />
    </div>
  );
};

export default SupplierTable;