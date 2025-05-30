import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import DataTable from "../../components/tables/DataTable";
import FormModal from "../../components/modals/FormModal";
import AddCategory from "./AddCategory";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";

const items = [
  { key: "1", label: <span style={{ color: "#00FFFF" }}>Delete</span> },
];

export default function CategoryTable() {
  const [open, setOpen] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);

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
              items,
              onClick: (event) => handleMenuClick(event, record),
            }}
            className="flex flex-row px-4"
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

  const fetchCategories = async () => {
    setLoading(true);
    const requestPayload = {
      method: "get",
      url: `${URL}/product_category/all`,
    };
    const response = await http.request(requestPayload);
    console.log(response)
    if (!response.isError) {
      setCategories(response.data);
    } else {
      toast.error("Failed to fetch categories");
    }
    setLoading(false);
  };

  const handleDeleteItem = async () => {
    try {
      if (selectedLocation?.id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/categories/${selectedLocation.id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Location deleted successfully");
          fetchCategories();
        } else {
          toast.error("Failed to delete location");
        }
      }
    } catch (error) {
      console.error("Error deleting location", error);
    }
  };

  const handleDeleteLocation = () => {
    if (confirmBtnRef.current) confirmBtnRef.current.click();
    setIsDelete(false);
  };

  const handleMenuClick = (event, recordItem) => {
    if (event.key === "1") {
      setSelectedLocation(recordItem);
      setOpenEdit(true);
    }
    if (event.key === "2") {
      setSelectedLocation(recordItem);
      setOpenDetails(true);
    }
    if (event.key === "3") {
      setSelectedLocation(recordItem);
      setIsDelete(true);
    }
  };

  const handleAddClick = () => setOpen(true);

  const handleOnClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setOpenDetails(false);
    setSelectedLocation(null);
    fetchCategories();
  };

  const handleSubmitLocationEvent = () => {
    if (submitBtnRef.current) submitBtnRef.current.click();
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    if (isDelete && selectedLocation?.id) handleDeleteLocation();
  }, [isDelete, selectedLocation?.id]);

  const tableProps = {
    bordered: true,
    size: "middle",
  };

  return (
    <>
      <div className="mx-auto">
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="inline-block w-full md:w-1/2 px-1.5 py-2 align-middle">
              <div className="overflow-hidden md:rounded-lg">
                <DataTable
                  data={categories}
                  loading={loading}
                  columns={columns}
                  tableProps={tableProps}
                />
              </div>
            </div>
            <div
              className="fixed bottom-1 md:bottom-10 right-1 md:right-10 flex h-12 w-12 cursor-pointer items-end justify-end"
              onClick={handleAddClick}
            >
              <div className="absolute z-50 flex items-center justify-center rounded-full bg-blue-600 p-3 shadow-xl">
                <PlusIcon className="h-full w-full" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <FormModal
        isModalOpen={open}
        onCloseModal={handleOnClose}
        title="Add Category"
        onSubmitForm={handleSubmitLocationEvent}
      >
        <AddCategory onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
      </FormModal>

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title={"Delete Category"}
        message={"this category"}
        confirmBtnRef={confirmBtnRef}
      />
    </>
  );
}
