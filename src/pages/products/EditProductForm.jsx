import { Space } from "antd";
import Label from "../../components/controlled/Label";
import BaseInput from "../../components/controlled/BaseInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const EditProductForm = ({ item, submitBtnRef, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [categories, setCategories] = useState([]);
  const [category, setCategory] = useState({ id: item?.category_id || "", name: item?.category_name || "" });

  const getCategories = async () => {
    const response = await http.request({
      url: `${URL}/product_category/all`,
    });

    if (!response.isError) {
      setCategories(response.data);
    }
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue
  } = useForm();

  // Initialize form with product data
  useEffect(() => {
    if (item) {
      setValue("name", item.name);
      setValue("brand", item.brand);
      setValue("model_number", item.model_number);
      setValue("selling_price", item.selling_price);
      setValue("reorder_point", item.reorder_point);
      setValue("description", item.description);
      setValue("minimum_stock_level", item.minimum_stock_level);
      setValue("maximum_stock_level", item.maximum_stock_level);
      setCategory({ id: item.category_id, name: item.category_name });
    }
  }, [item, setValue]);

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      const requestPayload = {
        method: "put",
        url: `${URL}/products/${item.id}`,
        data: {
          name: data.name,
          category_id: parseInt(category.id),
          brand: data.brand,
          model_number: data.model_number,
          selling_price: parseFloat(data.selling_price),
          reorder_point: data.reorder_point ? parseInt(data.reorder_point) : null,
          description: data.description || null,
          minimum_stock_level: data.minimum_stock_level ? parseInt(data.minimum_stock_level) : null,
          maximum_stock_level: data.maximum_stock_level ? parseInt(data.maximum_stock_level) : null,
          is_active: data.is_active !== undefined ? Boolean(data.is_active) : true
        },
      };

      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("Product updated successfully");
        onSuccess();
      } else {
        toast.error(response.error?.message || "Error updating product");
      }
    } catch (error) {
      toast.error(error.message || "Update failed");
    }
    setLoading(false);
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="">
      <Space direction="vertical" className="w-full">
        <div className="w-full grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
          {/* Name */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-4" name="Name" />
            <BaseInput
              placeholder="Product name"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-400 mt-2 text-xs">Name is required</span>
            )}
          </div>

          {/* Category */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-2" name="Category" />
            <span className="flex flex-col w-full">
              <select
                className="w-full outline-none focus-within:border-2 pl-3 border text-sm border-gray-300 bg-white rounded py-2 pr-5"
                value={category.id}
                onChange={(e) => setCategory({ id: e.target.value })}
              >
                <option value="">Select category</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </span>
          </div>

          {/* Brand */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-4" name="Brand" />
            <BaseInput
              placeholder="Brand"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("brand", { required: true })}
            />
            {errors.brand && (
              <span className="text-red-400 mt-2 text-xs">Brand is required</span>
            )}
          </div>
          
          {/* Model Number */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label className="mt-4" name="Model Number" />
            <BaseInput
              placeholder="Model Number"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("model_number")}
            />
          </div>

          {/* Selling Price */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-4" name="Selling Price (ETB)" />
            <BaseInput
              type="number"
              step="0.01"
              placeholder="Selling Price"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("selling_price", { 
                required: true,
                min: 0.01
              })}
            />
            {errors.selling_price && (
              <span className="text-red-400 mt-2 text-xs">
                {errors.selling_price.type === 'required' 
                  ? 'Selling price is required' 
                  : 'Price must be greater than 0'}
              </span>
            )}
          </div>

          {/* Description */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label className="mt-4" name="Description" />
            <BaseInput
              placeholder="Product description"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("description")}
            />
          </div>

          {/* Reorder Point */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label className="mt-4" name="Reorder Point" />
            <BaseInput
              type="number"
              placeholder="Reorder point quantity"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("reorder_point", { min: 0 })}
            />
            {errors.reorder_point && (
              <span className="text-red-400 mt-2 text-xs">Must be a positive number</span>
            )}
          </div>
        </div>
      </Space>

      <div className="sm:flex float-right mr-3 space-x-2 text-m mb-2 mt-3">
        <button
          style={{ display: "none" }}
          ref={submitBtnRef}
          className="bg-blue-600 rounded-md px-5 h-10 font-medium text-md ml-4 py-0.5"
          onClick={handleSubmit(handleUpdate)}
          disabled={loading}
        >
          {loading ? 'Updating...' : 'Update Product'}
        </button>
      </div>
    </div>
  );
};

export default EditProductForm;