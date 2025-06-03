import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider} from "antd";
import { DownOutlined } from "@ant-design/icons";
import FormDrawer from "../../components/drawer/FormDrawer";
import AddProductForm from "./AddProductForm";
import EditProductForm from "./EditProductForm";
import DataTable from "../../components/tables/DataTable";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import { userService } from "../../services/storageService";

export default function ProductTable() {
  const user = userService.getUser()
  const [products, setProducts] = useState([]);
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const [loading, setLoading] = useState(false);

  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);

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
  },
  {
    title: "Category",
    dataIndex: "category_name",
    key: "category_name",
  },
  {
    title: "Brand",
    dataIndex: "brand",
    key: "brand",
  },
  {
    title: "Model Number",
    dataIndex: "model_number",
    key: "model_number",
  },
  {
    title: "Selling Price",
    dataIndex: "selling_price",
    key: "selling_price",
    render: (price) => `ETB ${parseFloat(price).toFixed(2)}`,
    sorter: (a, b) => a.selling_price - b.selling_price,
  },
  {
    title:"Stock",
    dataIndex: 'quantity_in_stock',
    key:"quantity_in_stock"
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
              }
              
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
        setProducts(response.data.map((product) => ({ ...product, key: product.id, quantity_in_stock: product.stocks?.[0]?.quantity_in_stock || product.current_stock || 0, category_name: product.category.name })));
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
    if (event.key === "1") {
      setSelectedProduct(recordItem);
      setOpenUpdate(true);
    }

    if (event.key === "2") {
      setSelectedProduct(recordItem);
      setIsDelete(true);
    }
    
  };
  const handleOnClose = () => {
    setOpen(false);
    setOpenUpdate(false);
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
      if (selectedProduct?.id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/products/${selectedProduct?.id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Product deleted successfully");
          fetchProducts();
        } else {
          toast.error("Failed to delete product");
        }
      }
    } catch (error) {
      console.error("Failed to fetch data. Please try again later.", error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDeleteProduct = () => {
    if (confirmBtnRef.current) confirmBtnRef.current.click();
    setIsDelete(false);
  };

  useEffect(() => {
      if (isDelete && selectedProduct?.id) handleDeleteProduct();
    }, [isDelete, selectedProduct?.id]);

  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto sm:-mx">
            <div className="inline-block min-w-full px-1.5 py-2 align-middle mb-8">
              <div className="overflow-hidden  md:rounded-lg">
                <DataTable
                  data={products}
                  loading={loading}
                  columns={columns}
                />
              </div>
            </div>
          {user?.role === "Admin" && (
            <div
              className="group fixed   bottom-1 z-50 md:bottom-5 right-1 md:right-10 flex h-12 w-12 cursor-pointer items-end justify-end"
              onClick={handleAddClick}
            >
              <div className="absolute z-50 flex   items-center justify-center rounded-full bg-blue-600 p-3  shadow-xl">
                <PlusIcon className="h-full w-full" />
              </div>
            </div>
          )}

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

      {selectedProduct && openUpdate && (
        <FormDrawer
          title="Edit Product"
          onSubmitForm={handleSubmitProductEvent}
          open={openUpdate}
          onCloseDrawer={handleOnClose}
          isUpdate={true}
        >
        
        <AddProductForm onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
        </FormDrawer>
      )}

      {selectedProduct && openUpdate && (
          <FormDrawer
            title="Edit Product"
            onSubmitForm={handleSubmitProductEvent}
            open={openUpdate}
            onCloseDrawer={handleOnClose}
            isUpdate={true}
          >
            <EditProductForm 
              item={selectedProduct} 
              onSuccess={handleOnClose} 
              submitBtnRef={submitBtnRef} 
            />
          </FormDrawer>
        )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title={"Delete Product"}
        message={"this product"}
        confirmBtnRef={confirmBtnRef}
      />
    </>
  );
}
