import { useEffect, useRef, useState } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider, Table, Input, Typography, Tag } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../../components/drawer/FormDrawer";
import EditTransferForm from "./EditTransferForm";
import AddTransferForm from "./AddTransferForm";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { debounce } from "lodash";
const { Text } = Typography;
import { userService } from "../../services/storageService";

export default function TransferTable() {
  const user = userService.getUser();
  const [transfers, setTransfers] = useState([]);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedTransfer, setSelectedTransfer] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

  const columns = [
    {
      title: "Transfer #",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Reference",
      dataIndex: "reference_number",
      key: "reference_number",
    },
    {
      title: "Origin Location",
      dataIndex: ["from_location", "name"],
      key: "from_location",
    },
    {
      title: "Destination Location",
      dataIndex: ["to_location", "name"],
      key: "to_location",
    },
    {
      title: "Date",
      dataIndex: "transfer_date",
      key: "transfer_date",
      render: (date) => dayjs(date).format("DD MMM YYYY HH:mm"),
      sorter: (a, b) => new Date(a.transfer_date) - new Date(b.transfer_date),
    },
    {
      title: "Created By",
      dataIndex: ["creator", "first_name"],
      key: "creator",
      render: (_, record) => `${record.creator?.first_name || ''} ${record.creator?.last_name || ''}`,
    },
    {
      title: "Items",
      key: "items_count",
      render: (_, record) => (
        <Text strong>{record.items?.length || 0} items</Text>
      ),
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
    }] : []),
  ];

  const expandedRowRender = (record) => {
    const itemColumns = [
      {
        title: "Product",
        dataIndex: ["product", "name"],
        key: "product_name",
      },
      {
        title: "SKU",
        dataIndex: ["product", "sku"],
        key: "sku",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
    ];

    return (
      <Table
        columns={itemColumns}
        dataSource={record.items || []}
        pagination={false}
        rowKey="id"
        size="small"
      />
    );
  };

  // Fetch transfers data
  const fetchTransfers = async (keyword = "") => {
    try {
      setLoading(true);
      const response = await http.request({
        method: "get",
        url: `${URL}/transfers/all`,
        params: {
          search: keyword
        }
      });

      if (!response.isError) {
        setTransfers(response.data);
      } else {
        toast.error("Failed to fetch transfers");
      }
    } catch (error) {
      toast.error("Error fetching transfers data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle menu actions
  const handleMenuClick = (event, record) => {
    if (event.key === "1") {
      setSelectedTransfer(record);
      setOpenUpdate(true);
    } else if (event.key === "2") {
      setSelectedTransfer(record);
      setIsDelete(true);
    }
  };

  // Debounced search function
  const debouncedSearch = debounce((value) => {
    fetchTransfers(value);
  }, 500);

  // Handle search input change
  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchTerm(value);
    debouncedSearch(value);
  };

  // Handle form close
  const handleOnClose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setSelectedTransfer(null);
    fetchTransfers();
  };

  // Trigger form submission
  const handleSubmitTransfer = () => {
    submitBtnRef.current?.click();
  };

  // Handle delete confirmation
  const handleDeleteItem = async () => {
    try {
      if (selectedTransfer?.id) {
        const response = await http.request({
          method: "delete",
          url: `${URL}/transfers/${selectedTransfer.id}`,
        });

        if (!response.isError) {
          toast.success("Transfer deleted successfully");
          fetchTransfers();
        } else {
          toast.error("Failed to delete transfer");
        }
      }
    } catch (error) {
      toast.error("Error deleting transfer");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchTransfers();
  }, []);

  useEffect(() => {
    if (isDelete && selectedTransfer?.id) {
      confirmBtnRef.current?.click();
      setIsDelete(false);
    }
  }, [isDelete, selectedTransfer?.id]);

  return (
    <div className="mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx">
          <div className="inline-block min-w-full px-1.5 py-2 align-middle mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Inventory Transfers</h1>
              <div className="mb-4 w-1/2">
                <Input
                  placeholder="Search by reference, location..."
                  prefix={<MagnifyingGlassIcon className="h-4 w-4 text-gray-400" />}
                  onChange={handleSearch}
                  value={searchTerm}
                  allowClear
                />
              </div>
            </div>
            <div className="overflow-hidden md:rounded-lg">
              <Table
                columns={columns}
                dataSource={transfers}
                loading={loading}
                expandable={{
                  expandedRowRender,
                  rowExpandable: (record) => record.items?.length > 0,
                }}
                rowKey="id"
                scroll={{ x: true }}
              />
            </div>
          </div>

          {(user.role === "Admin" || user.role === "General Manager")&& (
          <div
            className="group fixed bottom-1 z-50 md:bottom-5 right-1 md:right-10 flex h-12 w-12 cursor-pointer items-end justify-end"
            onClick={() => setOpen(true)}
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
        title="Create New Transfer"
        onSubmitForm={handleSubmitTransfer}
        open={open}
        onCloseDrawer={handleOnClose}
      >
        <AddTransferForm onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
      </FormDrawer>
      )}

      {selectedTransfer && openUpdate && (
        <FormDrawer
          title={`Edit Transfer #${selectedTransfer.id}`}
          onSubmitForm={handleSubmitTransfer}
          open={openUpdate}
          onCloseDrawer={handleOnClose}
          isUpdate={true}
        >
          <EditTransferForm 
            transfer={selectedTransfer} 
            onSuccess={handleOnClose} 
            submitBtnRef={submitBtnRef} 
          />
        </FormDrawer>
      )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title="Delete Transfer"
        message={`transfer #${selectedTransfer?.id}`}
        confirmBtnRef={confirmBtnRef}
      />
    </div>
  );
}