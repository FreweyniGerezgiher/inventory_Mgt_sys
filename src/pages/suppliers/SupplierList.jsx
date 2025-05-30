import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider,Table} from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../../components/drawer/FormDrawer";
import AddSupplierForm from "./AddSupplierForm";
import UpdateSupplierForm from "./EditSupplierForm";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";

const SupplierTable = () => {
  const [suppliers, setSuppliers] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedSupplier, setSelectedSupplier] = useState(null);
  const [isDelete, setIsDelete] = useState(false);
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

  const columns = [
    {
      title: "No.",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
       sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
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
      title:"Bank Name",
      dataIndex: "bank_name",
      key: "bank_name",
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
    },
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
        setOpenUpdate(true);
        break;
      case "2":
        setIsDelete(true);
      default:
        break;
    }
  };

  const handleOnClose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setOpenDetails(false);
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

  return (
    <div className="mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx">
          <div className="inline-block min-w-full px-1.5 py-2 align-middle">
            <div className="overflow-hidden md:rounded-lg">
              <Table
                columns={columns}
                dataSource={suppliers}
                loading={loading}
                rowKey="id"
                scroll={{ x: true }}
              />
            </div>
          </div>

          <div
            className="group fixed bottom-1 z-50 md:bottom-10 right-1 md:right-10 flex h-12 w-12 cursor-pointer items-end justify-end"
            onClick={handleAddClick}
          >
            <div className="absolute z-50 flex items-center justify-center rounded-full bg-blue-600 p-3 shadow-xl">
              <PlusIcon className="h-full w-full text-white" />
            </div>
          </div>
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

      {openUpdate && (
        <FormDrawer
          title={`Edit Supplier #${selectedSupplier.id}`}
          onSubmitForm={handleSubmitSupplier}
          open={openUpdate}
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