import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider, Button, Input } from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../../components/drawer/FormDrawer";
import AddProductForm from "./AddProductForm";
import DetailsDrawer from "../../components/drawer/DetailsDrawer";
import DataTable from "../../components/tables/DataTable";
import formatDate from "../../utils/formatdate";
import ConfirmModal from "../../components/modals/ConfirmModal";
import ProductDetails from "./ProductDetails";
import { toast } from "react-toastify";
import Highlighter from "react-highlight-words";
import { SearchOutlined } from "@ant-design/icons";
export default function ProductTable() {
  const [assets, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [openUpdate, setOpenUpdate] = useState(false);
  const [openDetails, setOpenDetails] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [searchText, setSearchText] = useState("");
  const [searchedColumn, setSearchedColumn] = useState("");

  const [loading, setLoading] = useState(false);

  const searchInput = useRef(null);
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

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
    ...getColumnSearchProps("name"), // if you want to enable search
  },
  {
    title: "Category",
    dataIndex: "category_name", // assuming you join category and return name
    key: "category_name",
    ...getColumnSearchProps("category_name"),
  },
  {
    title: "SKU",
    dataIndex: "sku",
    key: "sku",
    ...getColumnSearchProps("sku"),
  },
  {
    title: "Cost Price",
    dataIndex: "cost_price",
    key: "cost_price",
    render: (price) => `$${parseFloat(price).toFixed(2)}`,
    sorter: (a, b) => a.cost_price - b.cost_price,
  },
  {
    title: "Selling Price",
    dataIndex: "selling_price",
    key: "selling_price",
    render: (price) => `$${parseFloat(price).toFixed(2)}`,
    sorter: (a, b) => a.selling_price - b.selling_price,
  },
  {
    title: "Status",
    dataIndex: "is_active",
    key: "is_active",
    render: (isActive) => (
      <span style={{ color: isActive ? "#00FF00" : "#d42f06" }}>
        {isActive ? "Active" : "Inactive"}
      </span>
    ),
    filters: [
      { text: "Active", value: true },
      { text: "Inactive", value: false },
    ],
    onFilter: (value, record) => record.is_active === value,
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
                    {record.is_active ? "Deactivate" : "Activate"}
                  </span>
                ),
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


  const fetchProducts = async () => {
    try {
      setLoading(true);
      const requestPayload = {
        method: "get",
        url: `${URL + "/products/all"}`,
      };
      const response = await http.request(requestPayload);
      if (!response.isError) {
        setProducts(response.data.map((product) => ({ ...product, key: product.id, category_name: product.category.name })));
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };

  const handleAddClick = () => {
    setOpen(true);
  };

  const handleMenuClick = (event, recordItem) => {
    // console.log("record Item", recordItem);
    if (event.key === "1") {
      setSelectedProduct(recordItem);
      setOpenUpdate(true);
    }
    if (event.key === "2") {
      setSelectedProduct(recordItem);
      setOpenDetails(true);
    }
    if (event.key === "3") {
      setSelectedProduct(recordItem);
      setIsDelete(true);
    }
    
  };
  const handleOnClose = () => {
    setOpen(false);
    setOpenAssignDriverModal(false);
    setOpenUpdate(false);
    setOpenDetails(false);
    setSelectedProduct(null);
    fetchProducts();
  };
  const handleOnSubmitChangeProduct = () => {
    if (submitBtnRef.current) submitBtnRef.current.click();
  };
  const handleSubmitProductEvent = () => {
    handleOnSubmitChangeProduct();
  };
  const handleDeleteItem = async () => {
    try {
      if (selectedProduct?.asset_id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/asset/remove/${selectedProduct?.asset_id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Product deleted successfully");
          fetchProducts();
        } else {
          toast.error("Failed to delete asset");
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };

  useEffect(() => {
    fetchProducts();
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
          title="Add Product"
          onSubmitForm={handleSubmitProductEvent}
          open={open}
          onCloseDrawer={handleOnClose}
        >
          <AddProductForm onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
        </FormDrawer>
      )}
      {openDetails && (
        <DetailsDrawer
          open={openDetails}
          onCloseDrawer={handleOnClose}
          title="Product Details"
        >
          <ProductDetails asset={selectedProduct} />
        </DetailsDrawer>
      )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title={"Delete Product"}
        message={"this asset"}
        confirmBtnRef={confirmBtnRef}
      />
    </>
  );
}
