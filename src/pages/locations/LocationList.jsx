import { useEffect, useRef, useState } from "react";
import { PlusIcon } from "@heroicons/react/24/outline";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { Dropdown, Space, ConfigProvider } from "antd";
import { DownOutlined } from "@ant-design/icons";
import DataTable from "../../components/tables/DataTable";
import FormModal from "../../components/modals/FormModal";
import AddLocation from "./AddLocation";
import EditLocationForm from "./EditLocation";
import ConfirmModal from "../../components/modals/ConfirmModal";
import { toast } from "react-toastify";
import { userService } from "../../services/storageService";


export default function LocationTable() {
  let user = userService.getUser();

  const [open, setOpen] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [isDelete, setIsDelete] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState({});
  const submitBtnRef = useRef(null);
  const confirmBtnRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [locations, setLocations] = useState([]);

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
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
    {
      title: "Primary",
      dataIndex: "is_primary",
      key: "is_primary",
      render: (val) => (val ? "Yes" : "No"),
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
    }] : []),
  ];

  const fetchLocations = async () => {
    setLoading(true);
    const requestPayload = {
      method: "get",
      url: `${URL}/locations/all`,
    };
    const response = await http.request(requestPayload);
    console.log(response)
    if (!response.isError) {
      setLocations(response.data);
    } else {
      toast.error("Failed to fetch locations");
    }
    setLoading(false);
  };

  const handleDeleteItem = async () => {
    try {
      if (selectedLocation?.id) {
        const requestPayload = {
          method: "delete",
          url: `${URL}/locations/${selectedLocation.id}`,
        };
        const response = await http.request(requestPayload);
        if (!response.isError) {
          toast.success("Location deleted successfully");
          fetchLocations();
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
      setIsDelete(true);
    }
  };

  const handleAddClick = () => setOpen(true);

  const handleOnClose = () => {
    setOpen(false);
    setOpenEdit(false);
    setSelectedLocation(null);
    fetchLocations();
  };

  const handleSubmitLocationEvent = () => {
    if (submitBtnRef.current) submitBtnRef.current.click();
  };

  useEffect(() => {
    fetchLocations();
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
            <div className="inline-block min-w-full px-1.5 py-2 align-middle">
              <div className="overflow-y-visiblevisible z-10 md:rounded-lg">
                <DataTable
                  data={locations}
                  loading={loading}
                  columns={columns}
                  tableProps={tableProps}
                />
              </div>
            </div>
        {user.role==="Admin" &&(
            <div
              className="fixed bottom-1 md:bottom-10 right-1 md:right-10 flex h-12 w-12 cursor-pointer items-end justify-end"
              onClick={handleAddClick}
            >
              <div className="absolute z-50 flex items-center justify-center rounded-full bg-blue-600 p-3 shadow-xl">
                <PlusIcon className="h-full w-full" />
              </div>
            </div>
        )}

          </div>
        </div>
      </div>

      <FormModal
        isModalOpen={open}
        onCloseModal={handleOnClose}
        title="Add Location"
        onSubmitForm={handleSubmitLocationEvent}
      >
        <AddLocation onSuccess={handleOnClose} submitBtnRef={submitBtnRef} />
      </FormModal>

       {selectedLocation && openEdit && (
      <FormModal
        isModalOpen={openEdit}
        onCloseModal={handleOnClose}
        title="Edit Location"
        onSubmitForm={handleSubmitLocationEvent}
      >
        <EditLocationForm
          location={selectedLocation}
          onSuccess={handleOnClose}
          submitBtnRef={submitBtnRef}
        />
      </FormModal>
    )}

      <ConfirmModal
        onDeleteItem={handleDeleteItem}
        title={"Delete Location"}
        message={"this location"}
        confirmBtnRef={confirmBtnRef}
      />
    </>
  );
}
