import { useEffect, useRef, useState } from "react";
import { PlusIcon, MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider, Table, Input, Typography } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../../components/drawer/FormDrawer";
import EditSalesForm from "./EditSalesForm";
import AddSalesForm from "./AddSalesForm";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import dayjs from "dayjs";
import { debounce } from "lodash";
import { userService } from "../../services/storageService";

const { Text } = Typography;

export default function SalesTable() {
  const user = userService.getUser();
  const [sales, setSales] = useState([]);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedSale, setSelectedSale] = useState(null);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState(""); 
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

  const columns = [
    {
      title: "Invoice #",
      dataIndex: "id",
      key: "id",
      sorter: (a, b) => a.id - b.id,
      defaultSortOrder: "ascend",
    },
    {
      title: "Customer",
      dataIndex: "customer_name",
      key: "customer_name",
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
      render: (amount) => `ETB ${parseFloat(amount).toFixed(2)}`,
      sorter: (a, b) => parseFloat(a.total_amount) - parseFloat(b.total_amount),
    },
    {
      title: "Date",
      dataIndex: "sale_date",
      key: "sale_date",
      render: (date) => dayjs(date).format("DD MMM YYYY HH:mm"),
      sorter: (a, b) => new Date(a.sale_date) - new Date(b.sale_date),
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

  const expandedRowRender = (record) => {
    const itemColumns = [
      {
        title: "Product",
        dataIndex: ["product", "name"],
        key: "product_name",
      },
      {
        title: "Brand",
        dataIndex: ["product", "brand"],
        key: "brand",
      },
      {
        title: "Quantity",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Unit Price",
        dataIndex: "unit_price",
        key: "unit_price",
        render: (price) => `ETB ${parseFloat(price).toFixed(2)}`,
      },
      {
        title: "Total",
        dataIndex: "total_price",
        key: "total_price",
        render: (price) => `ETB ${parseFloat(price).toFixed(2)}`,
      },
    ];

    return (
      <Table
        columns={itemColumns}
        dataSource={record.items}
        pagination={{ pageSize: 10 }}
        rowKey="id"
        size="small"
      />
    );
  };

  // Fetch sales data
  const fetchSales = async (keyword = "") => {
    try {
      setLoading(true);
      const response = await http.request({
        method: "get",
        url: `${URL}/sales/all`,
        params: {
          search: keyword
        }
      });

      if (!response.isError) {
        setSales(response.data);
      } else {
        toast.error("Failed to fetch sales");
      }
    } catch (error) {
      toast.error("Error fetching sales data");
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Handle menu actions
  const handleMenuClick = (event, record) => {
    if (event.key === "1") {
      setSelectedSale(record);
      setOpenUpdate(true);
    } else if (event.key === "2") {
      setSelectedSale(record);
      setIsDelete(true);
    }
  };


   // Debounced search function
  const debouncedSearch = debounce((value) => {
    fetchSales(value);
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
    setSelectedSale(null);
    fetchSales();
  };

  // Trigger form submission
  const handleSubmitSales = () => {
    submitBtnRef.current?.click();
  };

  // Handle delete confirmation
  const handleDeleteItem = async () => {
    try {
      if (selectedSale?.id) {
        const response = await http.request({
          method: "delete",
          url: `${URL}/sales/${selectedSale.id}`,
        });

        if (!response.isError) {
          toast.success("Sale deleted successfully");
          fetchSales();
        } else {
          toast.error("Failed to delete sale");
        }
      }
    } catch (error) {
      toast.error("Error deleting sale");
      console.error("Delete error:", error);
    }
  };

  useEffect(() => {
    fetchSales();
  }, []);

  useEffect(() => {
    if (isDelete && selectedSale?.id) {
      confirmBtnRef.current?.click();
      setIsDelete(false);
    }
  }, [isDelete, selectedSale?.id]);

  return (
    <div className="mx-auto">
      <div className="flex flex-col">
        <div className="overflow-x-auto sm:-mx">
          <div className="inline-block min-w-full px-1.5 py-2 align-middle mb-8">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Sales</h1>
            <div className="mb-4 w-1/2">
              <Input
                placeholder="Search by reference number, customer ..."
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
                dataSource={sales}
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
          {user.role ==="Admin" || user.role ==="Sales Officer" || user.role ==="General Manager" && (
      
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

      <FormDrawer
        title="Add New Sale"
        onSubmitForm={handleSubmitSales}
        open={open}
        onCloseDrawer={handleOnClose}
      >
        <AddSalesForm onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
      </FormDrawer>


      {selectedSale && openUpdate && (
        <FormDrawer
          title={`Edit Sale #${selectedSale.id}`}
          onSubmitForm={handleSubmitSales}
          open={openUpdate}
          onCloseDrawer={handleOnClose}
          isUpdate={true}
        >
          <EditSalesForm 
            saleData={selectedSale} 
            onSuccess={handleOnClose} 
            submitBtnRef={submitBtnRef} 
          />
        </FormDrawer>
      )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title="Delete Sale"
        message={`sale #${selectedSale?.id}`}
        confirmBtnRef={confirmBtnRef}
      />
    </div>
  );
}