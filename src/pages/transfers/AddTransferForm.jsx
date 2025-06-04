import { Space, Button, Table, Input, Select } from "antd";
import Label from "../../components/controlled/Label";
import { useForm, Controller } from "react-hook-form";
import { useState, useEffect } from "react";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { toast } from "react-toastify";

const { Option } = Select;

const AddTransferForm = ({ submitBtnRef, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [items, setItems] = useState([]);
  const [products, setProducts] = useState([]);
  const [locations, setLocations] = useState([]);
  const [fromLocation, setFromLocation] = useState("");
  const [toLocation, setToLocation] = useState("");
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [referenceNumber, setReferenceNumber] = useState("");

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
    reset,
  } = useForm();

  const fetchLocations = async () => {
    const res = await http.request({ url: `${URL}/locations/all` });
    if (!res.isError) setLocations(res.data);
  };

  const fetchProducts = async () => {
    const res = await http.request({ url: `${URL}/products/all` });
    if (!res.isError) setProducts(res.data);
  };

  const addItem = () => {
    if (!selectedProduct || !quantity || !toLocation || !fromLocation) return;

    setItems([...items, {
      product_id: selectedProduct.id,
      product_name: selectedProduct.name,
      quantity: parseInt(quantity)
    }]);

    setSelectedProduct(null);
    setQuantity(1);
  };

  const removeItem = (index) => {
    const updated = [...items];
    updated.splice(index, 1);
    setItems(updated);
  };

    const handleQuantityChange = (value) => {
    const newQuantity = parseInt(value);
    if (isNaN(newQuantity)) return;

    // Check stock level if product is selected
    if (selectedProduct && newQuantity > selectedProduct.current_stock) {
      toast.error(`Quantity exceeds available stock (${selectedProduct.current_stock})`);
      return;
    }

    setQuantity(newQuantity);
  };
  const handleTransfer = async () => {
    if (items.length === 0) return toast.error("Add items to transfer");

    setLoading(true);
    try {
      const res = await http.request({
        method: "post",
        url: `${URL}/transfers/add`,
        data: {
          from_location_id: parseInt(fromLocation),
          to_location_id: parseInt(toLocation),
          reference_number: referenceNumber,
          items: items.map(i => ({ product_id: i.product_id, quantity: i.quantity }))
        }
      });

      if (!res.isError) {
        toast.success("Transfer recorded");
        setItems([]);
        reset();
        onSuccess();
      } else toast.error("Error in transfer");
    } catch (err) {
      toast.error("Submission failed");
      console.error(err);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchLocations();
    fetchProducts();
  }, []);

  const columns = [
    { title: 'Product', dataIndex: 'product_name', key: 'product_name' },
    { title: 'Quantity', dataIndex: 'quantity', key: 'quantity' },
    {
      title: 'Action', key: 'action', render: (_, __, index) => (
        <Button danger onClick={() => removeItem(index)}>Remove</Button>
      )
    }
  ];

  return (
    <div>
      <form onSubmit={handleSubmit(handleTransfer)}>
        <Space direction="vertical" className="w-full">
          <div className="grid sm:grid-cols-2 gap-4">
            <div>
              <Label name="From Location" required />
              <select
                className="w-full border rounded py-2"
                value={fromLocation}
                onChange={(e) => setFromLocation(e.target.value)}>
                <option value="">Select</option>
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </select>
            </div>
            <div>
              <Label name="To Location" required />
              <select
                className="w-full border rounded py-2"
                value={toLocation}
                onChange={(e) => setToLocation(e.target.value)}>
                <option value="">Select</option>
                {locations.map(loc => <option key={loc.id} value={loc.id}>{loc.name}</option>)}
              </select>
            </div>
            <div>
              <Label name="Reference Number" />
              <Input value={referenceNumber} onChange={(e) => setReferenceNumber(e.target.value)} />
            </div>
          </div>

          <div className="mt-4">
            <h3 className="mb-2">Add Items</h3>
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
                      placeholder="Select product"
                      onChange={(value, option) => {
                        setSelectedProduct(option.product);
                        field.onChange(value);
                      }}>
                      {products.map(product => (
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
                  onChange={(e) => handleQuantityChange(e.target.value)}
                />
              </div>
              <div className="self-end">
                <Button className="bg-blue-600" type="primary" onClick={addItem} disabled={!selectedProduct || !quantity}>

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
              </>
            )}
          </div>

          <div className="float-right">
            <button
              style={{ display: "none" }}
              ref={submitBtnRef}
              type="submit"
              className="bg-blue-600 rounded-md px-4 py-1 text-white">
              {loading ? 'Processing...' : 'Record Transfer'}
            </button>
          </div>
        </Space>
      </form>
    </div>
  );
};

export default AddTransferForm;