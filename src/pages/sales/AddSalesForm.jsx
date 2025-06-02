import { Space, Button, Table, Input, Select } from "antd";
import Label from "../../components/controlled/Label";
import BaseInput from "../../components/controlled/BaseInput";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { Option } = Select;

const AddSalesForm = ({ submitBtnRef, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);
  const [reference_number, setReferenceNumber] = useState(0);


  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState({ id: "", name: "" });

    const [products, setProducts] = useState([]);

  const getLocations = async () => {
    const response = await http.request({
      url: `${URL + "/locations/all"}`,
    });

    if (!response.isError) {
      setLocations(response.data);
    }
  };
  const getProducts = async () => {
    const response = await http.request({
      url: `${URL + "/products/all"}`,
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
      unit_price: parseFloat(selectedProduct.selling_price),
      total_price: (parseFloat(unitPrice) * parseInt(quantity)).toFixed(2)
    };
    
    setItems([...items, newItem]);
    setSelectedProduct(null);
    setQuantity(1);
  };

  const removeItem = (index) => {
    const newItems = [...items];
    newItems.splice(index, 1);
    setItems(newItems);
  };

  const handleRegistration = async (data) => {
    console.log(data)
    if (items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    setLoading(true);
    try {
      const requestPayload = {
        method: "post",
        url: `${URL}/sales/add`,
        data: {
          customer_name: data.customer_name,
          total_amount: items.reduce((sum, item) => sum + parseFloat(item.total_price), 0),
          location_id: parseInt(location.id),
          reference_number: reference_number,
          items: items.map(item => ({
            product_id: item.product_id,
            quantity: item.quantity,
            unit_price: item.unit_price
          }))
        },
      };

      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("Sale recorded successfully");
        setItems([]);
        reset();
        onSuccess();
      } else {
        toast.error("Error recording sale");
      }
    } catch (error) {
      toast.error("Submission failed");
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
      render: (price) => `ETB ${parseFloat(price).toFixed(2)}`
    },
    {
      title: 'Total',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => `ETB ${parseFloat(price).toFixed(2)}`
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
  if (selectedProduct) {
    setUnitPrice(selectedProduct.selling_price);
  }
}, [selectedProduct]);

  useEffect(() => {
    getLocations();
    getProducts();
  }, []);
  return (
    <div className="">
      <form onSubmit={handleSubmit(handleRegistration)}>
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
          <span className="flex flex-col w-full">
            <select
              className="w-full outline-none focus-within:border-2 pl-3 border text-sm border-gray-300 bg-white rounded py-2 pr-5"
              value={location.id}
              onChange={(e) => setLocation({ id: e.target.value })}
            >
              <option value="">Select location</option>
              {locations.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </span>
        </div>
        <div className="w-full">
          <Label name="Reference Number" />
          <Input
            type="text"
            value={reference_number}
            onChange={(e) => setReferenceNumber(e.target.value)}
          />
        </div>
      </div>

          <div className="mt-4">
            <h3 className="font-medium mb-2">Add Items</h3>
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
                        const selectedProduct = option.product;
                        setSelectedProduct(selectedProduct);
                        setUnitPrice(selectedProduct.selling_price); // Set unit price here
                        field.onChange(value);
                      }}
                    >
                      <option value="">Select product</option>
                      {products.map((product) => (
                        <Option key={product.id} value={product.id} product={product}>
                          {product.name}
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
                  readOnly
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
                  Total: ${items.reduce((sum, item) => sum + parseFloat(item.total_price), 0).toFixed(2)}
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
            {loading ? 'Processing...' : 'Record Sale'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddSalesForm;