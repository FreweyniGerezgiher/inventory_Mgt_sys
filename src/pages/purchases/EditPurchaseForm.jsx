import { Space, Button, Table, Input, Select } from "antd";
import Label from "../../components/controlled/Label";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import dayjs from "dayjs";

const { Option } = Select;

const EditPurchaseForm = ({ purchaseData, submitBtnRef, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [unitPrice, setUnitPrice] = useState(0);

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
    setValue,
  } = useForm();

  const [locations, setLocations] = useState([]);
  const [suppliers, setSuppliers] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    if (purchaseData) {
      // Set form values from purchaseData
      setValue('supplier_id', purchaseData.supplier?.id || null);
      setValue('location_id', purchaseData.location?.id);
      
      // Set items from purchaseData
      const formattedItems = purchaseData.items.map(item => ({
        product_id: item.product?.id,
        product_name: item.product?.name,
        quantity: item.quantity,
        unit_price: item.unit_price,
        total_price: (item.unit_price * item.quantity).toFixed(2)
      }));
      setItems(formattedItems);
    }
  }, [purchaseData, setValue]);

  const fetchLocations = async () => {
    const response = await http.request({
      url: `${URL}/locations/all`,
    });
    if (!response.isError) {
      setLocations(response.data);
    }
  };

  const fetchSuppliers = async () => {
    const response = await http.request({
      url: `${URL}/suppliers/all`,
    });
    if (!response.isError) {
      setSuppliers(response.data);
    }
  };

  const fetchProducts = async () => {
    const response = await http.request({
      url: `${URL}/products/all`,
    });
    if (!response.isError) {
      setProducts(response.data);
    }
  };

  const handleAddItem = () => {
    if (!selectedProduct || !quantity || !unitPrice) return;
    
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

  const handleUpdatePurchase = async (data) => {
    if (items.length === 0) {
      toast.error("Please add at least one item");
      return;
    }

    setLoading(true);
    try {
      const requestPayload = {
        method: "put",
        url: `${URL}/purchases/${purchaseData.id}`,
        data: {
          supplier_id: data.supplier_id ? parseInt(data.supplier_id) : null,
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
        toast.success("Purchase updated successfully");
        onSuccess();
      } else {
        toast.error("Error updating purchase");
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
      render: (price) => `$${parseFloat(price).toFixed(2)}`
    },
    {
      title: 'Total',
      dataIndex: 'total_price',
      key: 'total_price',
      render: (price) => `$${parseFloat(price).toFixed(2)}`
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
    fetchLocations();
    fetchSuppliers();
    fetchProducts();
  }, []);

  return (
    <div className="">
      <form onSubmit={handleSubmit(handleUpdatePurchase)}>
        <Space direction="vertical" className="w-full">
          <div className="w-full grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
            <div className="flex flex-col mb-3 sm:mb-1">
              <Label className="mt-4" name="Supplier" />
              <Controller
                name="supplier_id"
                control={control}
                render={({ field }) => (
                  <Select
                    {...field}
                    showSearch
                    style={{ width: '100%' }}
                    placeholder="Select supplier"
                    optionFilterProp="children"
                    allowClear
                  >
                    {suppliers.map(supplier => (
                      <Option key={supplier.id} value={supplier.id}>
                        {supplier.name}
                      </Option>
                    ))}
                  </Select>
                )}
              />
            </div>

            <div className="flex flex-col mb-3 sm:mb-1">
              <Label required={true} className="mt-4" name="Location" />
              <Controller
                name="location_id"
                control={control}
                rules={{ required: true }}
                render={({ field }) => (
                  <Select
                    {...field}
                    style={{ width: '100%' }}
                    placeholder="Select location"
                  >
                    {locations.map(location => (
                      <Option key={location.id} value={location.id}>
                        {location.name}
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
            <h3 className="font-medium mb-2">Purchase Items</h3>
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
                      }}
                    >
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
                  onChange={(e) => setUnitPrice(e.target.value)}
                />
              </div>
              <div className="self-end">
                <Button
                  className="bg-blue-600 rounded-md px-5 h-10 font-medium text-md ml-4 py-0.5"
                  type="primary"
                  onClick={handleAddItem}
                  disabled={!selectedProduct || !quantity || !unitPrice}
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
            className="bg-blue-600 rounded-md px-5 h-10 font-medium text-md ml-4 py-0.5"
            type="submit"
          >
            {loading ? 'Updating...' : 'Update Purchase'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditPurchaseForm;