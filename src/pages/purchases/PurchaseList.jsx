import { useEffect, useRef, useState } from "react";
import { PlusIcon, MagnifyingGlassIcon  } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider, Table, Input, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../../components/drawer/FormDrawer";
import AddPurchaseForm from "./AddPurchaseForm";
import EditPurchaseForm from "./EditPurchaseForm";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { userService } from "../../services/storageService";

const { Text } = Typography;

export default function PurchaseTable() {
  const user = userService.getUser();

  const [purchases, setPurchases] = useState([]);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedPurchase, setSelectedPurchase] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 

  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

  // Main table columns
  const columns = [
    {
      title: "PO #",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Supplier",
      dataIndex: ["supplier", "name"],
      key: "supplier",
      render: (text, record) => text || record.supplier_name || '',
    },
    {
      title: "Ref Number",
      dataIndex: "reference_number",
      key: "reference_number",
    },
    {
      title: "Total Amount",
      dataIndex: "total_amount",
      key: "total_amount",
      render: (amount) => `${parseFloat(amount).toFixed(2)} ETB `,
      sorter: (a, b) => parseFloat(a.total_amount) - parseFloat(b.total_amount),
    },
    {
      title: "Date",
      dataIndex: "purchase_date",
      key: "purchase_date",
      render: (date) => dayjs(date).format("DD MMM YYYY"),
      sorter: (a, b) => new Date(a.purchase_date) - new Date(b.purchase_date),
    },
    {
      title: "Location",
      dataIndex: ["location", "name"],
      key: "location",
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

  // Expanded row columns for items
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
      {
        title: "Unit Cost",
        dataIndex: "unit_price",
        key: "unit_price",
        render: (price) => `${parseFloat(price).toFixed(2)} ETB `,
      },
      {
        title: "Total",
        dataIndex: "total_price",
        key: "total_price",
        render: (price) => `${parseFloat(price).toFixed(2)} ETB `,
      },
    ];

    return (
      <Table
        columns={itemColumns}
        dataSource={record.items}
        pagination={false}
        rowKey="id"
        size="small"
      />
    );
  };

  // Fetch purchases data
  const fetchPurchases = async (keyword = "") => {
    try {
      setLoading(true);
      const response = await http.request({
        method: "get",
        url: `${URL}/purchases/all`,
         params: {
          search: keyword
        }
      });

      if (!response.isError) {
        setPurchases(response.data);
      } else {
        toast.error("Failed to fetch purchases");
      }
    } catch (error) {
      toast.error("Error fetching purchases data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle menu actions
  const handleMenuClick = (event, record) => {
    if (event.key === "1") {
      setSelectedPurchase(record);
      setOpenUpdate(true);
    } else if (event.key === "2") {
      setSelectedPurchase(record);
      setIsDelete(true);
    }
  };

  // Handle form close
  const handleOnClose = () => {
    setOpen(false);
    setOpenUpdate(false);
    setSelectedPurchase(null);
    fetchPurchases();
  };

  // Trigger form submission
  const handleSubmitPurchase = () => {
    submitBtnRef.current?.click();
  };

     // Debounced search function
    const debouncedSearch = debounce((value) => {
      fetchPurchases(value);
    }, 500);
  
    // Handle search input change
    const handleSearch = (e) => {
      const value = e.target.value;
      setSearchTerm(value);
      debouncedSearch(value);
    };

  // Handle delete confirmation
  const handleDeleteItem = async () => {
    try {
      if (selectedPurchase?.id) {
        const response = await http.request({
          method: "delete",
          url: `${URL}/purchases/${selectedPurchase.id}`,
        });

        if (!response.isError) {
          toast.success("Purchase deleted successfully");
          fetchPurchases();
        } else {
          toast.error("Failed to delete purchase");
        }
      }
    } catch (error) {
      toast.error("Error deleting purchase");
      console.error("Delete error:", error);
    }
  };

  // Initialize
  useEffect(() => {
    fetchPurchases();
  }, []);

  // Handle delete confirmation
  useEffect(() => {
    if (isDelete && selectedPurchase?.id) {
      confirmBtnRef.current?.click();
      setIsDelete(false);
    }
  }, [isDelete, selectedPurchase?.id]);

  return (
    <div className="mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx">
          <div className="inline-block min-w-full px-1.5 py-2 align-middle mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Purchases</h1>
            <div className="mb-4 w-1/2">
              <Input
                placeholder="Search by reference, supplier ..."
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
                dataSource={purchases}
                loading={loading}
                pagination={{ pageSize: 10 }}
                bordered={true}
                size="middle"  

                expandable={{
                  expandedRowRender,
                  rowExpandable: (record) => record.items?.length > 0,
                }}
                rowKey="id"
                scroll={{ x: true }}
              />
            </div>
          </div>

          {user.role ==="Admin" || user.role ==="Purchase Officer" || user.role ==="General Manager" && (
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

      {/* Add Purchase Drawer */}
      <FormDrawer
        title="Add New Purchase"
        onSubmitForm={handleSubmitPurchase}
        open={open}
        onCloseDrawer={handleOnClose}
      >
        <AddPurchaseForm onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
      </FormDrawer>

      {selectedPurchase && openUpdate && (
        <FormDrawer
          title={`Edit Purchase #${selectedPurchase.id}`}
          onSubmitForm={handleSubmitPurchase}
          open={openUpdate}
          onCloseDrawer={handleOnClose}
          isUpdate={true}
        >
          <EditPurchaseForm 
            purchaseData={selectedPurchase} 
            onSuccess={handleOnClose} 
            submitBtnRef={submitBtnRef} 
          />
        </FormDrawer>
      )}

      {/* Delete Confirmation Modal */}
      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title="Delete Purchase"
        message={`purchase #${selectedPurchase?.id}`}
        confirmBtnRef={confirmBtnRef}
      />
    </div>
  );
}