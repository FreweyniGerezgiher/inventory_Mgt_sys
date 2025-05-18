import { Space } from "antd";
import Label from "../../components/controlled/Label";
import BaseInput from "../../components/controlled/BaseInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddProductForm = ({ submitBtnRef, onSuccess }) => {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleRegistration = async (data) => {
    setLoading(true);
    try {
      const requestPayload = {
        method: "post",
        url: `${URL}/products/add`,
        data: {
          name: data.name,
          category_id: parseInt(data.category_id),
          sku: data.sku,
          cost_price: parseFloat(data.cost_price),
          selling_price: parseFloat(data.selling_price),
        },
      };

      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("Product added successfully");
        onSuccess();
      } else {
        toast.error("Error adding product");
      }
    } catch (error) {
      toast.error("Submission failed");
    }
    setLoading(false);
  };

  return (
    <div className="">
      <Space direction="vertical" className="w-full">
        <div className="w-full grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-2">
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

          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-4" name="Category ID" />
            <BaseInput
              type="number"
              placeholder="Category ID"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("category_id", { required: true })}
            />
            {errors.category_id && (
              <span className="text-red-400 mt-2 text-xs">Category ID is required</span>
            )}
          </div>

          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-4" name="SKU" />
            <BaseInput
              placeholder="Stock Keeping Unit"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("sku", { required: true })}
            />
            {errors.sku && (
              <span className="text-red-400 mt-2 text-xs">SKU is required</span>
            )}
          </div>

          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-4" name="Cost Price" />
            <BaseInput
              type="number"
              step="0.01"
              placeholder="Cost Price"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("cost_price", { required: true })}
            />
            {errors.cost_price && (
              <span className="text-red-400 mt-2 text-xs">Cost price is required</span>
            )}
          </div>

          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-4" name="Selling Price" />
            <BaseInput
              type="number"
              step="0.01"
              placeholder="Selling Price"
              className="outline-none focus-within:border-2 pl-3 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("selling_price", { required: true })}
            />
            {errors.selling_price && (
              <span className="text-red-400 mt-2 text-xs">Selling price is required</span>
            )}
          </div>
        </div>
      </Space>

      <div className="sm:flex float-right mr-3 space-x-2 text-m mb-2 mt-3">
        <button
          style={{ display: "none" }}
          ref={submitBtnRef}
          className="bg-blue-600 rounded-md px-5 h-10 font-medium text-md ml-4 py-0.5"
          onClick={handleSubmit(handleRegistration)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

export default AddProductForm;
