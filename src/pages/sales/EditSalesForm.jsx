import { Space, Button, Table, Input, Select } from "antd";
import Label from "../../components/controlled/Label";
import BaseInput from "../../components/controlled/BaseInput";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

const { Option } = Select;

const EditSalesForm = ({ submitBtnRef, onSuccess, saleData }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [locations, setLocations] = useState([]);
  const [location, setLocation] = useState({ id: "", name: "" });
  const [products, setProducts] = useState([]);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  useEffect(() => {
    if (saleData) {
      // Initialize form with existing sale data
      setValue("customer_name", saleData.customer_name);
      setValue("location_id", saleData.location?.id);
      setLocation({ id: saleData.location?.id, name: saleData.location?.name });
      
      // Set items from sale data
      const formattedItems = saleData.items.map(item => ({
        ...item,
        product_name: item.product?.name,
        total_price: (item.quantity * item.unit_price).toFixed(2)
      }));
      setItems(formattedItems);
    }
  }, [saleData, setValue]);

  const getLocations = async () => {
    const response = await http.request({
      url: `${URL}/locations/all`,
    });

    if (!response.isError) {
      setLocations(response.data);
    }
  };

  const getProducts = async () => {
    const response = await http.request({
      url: `${URL}/products/all`,
    });

    if (!response.isError) {
      setProducts(response.data);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct || !quantity) return;
    
    const newItem = {
      product_id: selectedProduct.id,
      product_name: selectedProduct.name,
      quantity: parseInt(quantity),
      unit_price: parseFloat(unitPrice),
      total_price: (parseFloat(unitPrice) * parseInt(quantity))
    };
    
    setItems([...items, newItem]);
    setSelectedProduct(null);
    setQuantity(1);
    setUnitPrice(0);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleUpdateSale = async (data) => {
    if (items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    setLoading(true);
    try {
      const requestPayload = {
        method: "put",
        url: `${URL}/sales/${saleData.id}`,
        data: {
          customer_name: data.customer_name,
          total_amount: items.reduce((sum, item) => sum + parseFloat(item.total_price), 0),
          location_id: parseInt(data.location_id),
          items: items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price
          }))
        },
      };

      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("Sale updated successfully");
        setItems([]);
        reset();
        onSuccess();
      } else {
        toast.error("Error updating sale");
      }
    } catch (error) {
      toast.error("Update failed");
      console.error(error);
    }
    setLoading(false);
  };

  const columns = [
    {
      title: 'Product',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Unit Price',
      dataIndex: 'unit_price',
      key: 'unit_price',
      render: (price) => `₦${parseFloat(price).toFixed(2)}`
    },
    {
      title: 'Total',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => `₦${parseFloat(price).toFixed(2)}`
    },
    {
      title: 'Action',
      key: 'action',
      render: (_, record, index) => (
        <Button danger onClick={() => removeItem(index)}>Remove</Button>
      ),
    },
  ];

  useEffect(() => {
    getLocations();
    getProducts();
  }, []);

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleUpdateSale)}>
        <Space direction="vertical" className="w-full">
          <div className="w-full grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
            <div className="flex flex-col mb-3 sm:mb-1">
              <Label required={true} className="mt-4" name="Customer Name" />
              <BaseInput
                placeholder="Customer name"
                className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("customer_name", { required: true })}
              />
              {errors.customer_name && (
                <span className="text-red-400 mt-2 text-xs">Customer name is required</span>
              )}
            </div>

            <div className="flex flex-col mb-3 sm:mb-1">
              <Label required={true} className="mt-2" name="Location" />
              <Controller
                name="location_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    placeholder="Select location"
                    className="w-full"
                    onChange={(value) => {
                      field.onChange(value);
                      const selected = locations.find(l => l.id === value);
                      setLocation(selected || { id: "", name: "" });
                    }}
                  >
                    {locations.map((item) => (
                      <Option key={item.id} value={item.id}>
                        {item.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
              {errors.location_id && (
                <span className="text-red-400 mt-2 text-xs">Location is required</span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Items</h3>
            <div className="flex gap-4 mb-4">
              <div className="flex-1">
                <Label name="Product" />
                <Controller
                  name="product"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      style={{ width: '100%' }}
                      placeholder="Search product"
                      optionFilterProp="children"
                      onChange={(value, option) => {
                        setSelectedProduct(option.product);
                        field.onChange(value);
                        setUnitPrice(option.product.sales_price || 0);
                      }}
                    >
                      {products.map((product) => (
                        <Option 
                          key={product.id} 
                          value={product.id} 
                          product={product}
                        >
                          {product.name} ({product.sku})
                        </Option>
                      ))}
                    </Select>
                  )}
                />
              </div>
              <div className="w-24">
                <Label name="Quantity" />
                <Input
                  type="number"
                  min={1}
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
              </div>
              <div className="w-32">
                <Label name="Unit Price" />
                <Input
                  type="number"
                  min={0}
                  step="0.01"
                  value={unitPrice}
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>
              <div className="self-end">
                <Button
                  className="bg-blue-600 rounded-md font-medium text-md ml-4 py-0.5" 
                  type="primary"
                  disabled={!selectedProduct || !quantity || !unitPrice} 
                  onClick={handleAddItem}
                >
                  Add Item
                </Button>
              </div>
            </div>

            {items.length > 0 && (
              <>
                <Table 
                  columns={columns} 
                  dataSource={items} 
                  pagination={false}
                  rowKey={(record, index) => index}
                />
                <div className="mt-4 text-right font-bold">
                  Total: ₦{items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2)}
                </div>
              </>
            )}
          </div>
        </Space>

        <div className="sm:flex float-right mr-3 space-x-2 text-m mb-2 mt-3">
          <button
            style={{ display: "none" }}
            ref={submitBtnRef}
            className="bg-blue-600 rounded-md font-medium text-md ml-4 py-0.5" 
            type="submit"
          >
            {loading ? 'Updating...' : 'Update Sale'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditSalesForm;