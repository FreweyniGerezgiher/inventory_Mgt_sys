import { Space } from "antd";
import Label from "../../components/controlled/Label";
import BaseInput from "../../components/controlled/BaseInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const UpdateSupplierForm = ({ supplierData, submitBtnRef, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  useEffect(() => {
    if (supplierData) {
      // Set form values from supplierData
      reset({
        name: supplierData.name,
        company_name: supplierData.company_name,
        email: supplierData.email,
        phone: supplierData.phone,
        alternate_phone: supplierData.alternate_phone,
        address: supplierData.address,
        bank_name: supplierData.bank_name,
        account_number: supplierData.account_number,
        notes: supplierData.notes,
        is_active: supplierData.is_active
      });
    }
  }, [supplierData, reset]);

  const handleUpdate = async (data) => {
    setLoading(true);
    try {
      const requestPayload = {
        method: "put",
        url: `${URL}/suppliers/${supplierData.id}`,
        data: {
          name: data.name,
          company_name: data.company_name,
          email: data.email,
          phone: data.phone,
          alternate_phone: data.alternate_phone,
          address: data.address,
          bank_name: data.bank_name,
          account_number: data.account_number,
          notes: data.notes,
          is_active: data.is_active
        },
      };

      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("Supplier updated successfully");
        onSuccess();
      } else {
        toast.error(response.message || "Failed to update supplier");
      }
    } catch (error) {
      toast.error("Failed to update supplier");
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      <Space direction="vertical" className="w-full">
        <div className="w-full grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1">
          {/* Supplier Name */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-3 sm:mt-2" name="Supplier Name" />
            <span className="flex flex-col w-full">
              <BaseInput
                placeholder="Supplier name"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("name", { required: true })}
              />
              {errors.name && (
                <span className="text-red-400 mt-2 text-xs">Supplier name is required</span>
              )}
            </span>
          </div>

          {/* Company Name */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label className="mt-3 sm:mt-2" name="Company Name" />
            <span className="flex flex-col w-full">
              <BaseInput
                placeholder="Company name"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("company_name")}
              />
            </span>
          </div>

          {/* Email */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label className="mt-3 sm:mt-2" name="Email" />
            <span className="flex flex-col w-full">
              <BaseInput
                placeholder="email@example.com"
                type="email"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("email")}
              />
            </span>
          </div>

          {/* Phone */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label required={true} className="mt-3 sm:mt-2" name="Phone" />
            <span className="flex flex-col w-full">
              <BaseInput
                placeholder="Phone number"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("phone", { required: true })}
              />
              {errors.phone && (
                <span className="text-red-400 mt-2 text-xs">Phone is required</span>
              )}
            </span>
          </div>

          {/* Alternate Phone */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label className="mt-3 sm:mt-2" name="Alternate Phone" />
            <span className="flex flex-col w-full">
              <BaseInput
                placeholder="Alternate phone number"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("alternate_phone")}
              />
            </span>
          </div>

          {/* Address */}
          <div className="flex flex-col mb-3 sm:mb-1 col-span-2">
            <Label className="mt-3 sm:mt-2" name="Address" />
            <span className="flex flex-col w-full">
              <BaseInput
                placeholder="Full address"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("address")}
              />
            </span>
          </div>

          {/* Bank Details */}
          <div className="flex flex-col mb-3 sm:mb-1">
            <Label className="mt-3 sm:mt-2" name="Bank Name" />
            <span className="flex flex-col w-full">
              <BaseInput
                placeholder="Bank name"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("bank_name")}
              />
            </span>
          </div>

          <div className="flex flex-col mb-3 sm:mb-1">
            <Label className="mt-3 sm:mt-2" name="Account Number" />
            <span className="flex flex-col w-full">
              <BaseInput
                placeholder="Account number"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
                {...register("account_number")}
              />
            </span>
          </div>

          {/* Notes */}
          <div className="flex flex-col mb-3 sm:mb-1 col-span-2">
            <Label className="mt-3 sm:mt-2" name="Notes" />
            <span className="flex flex-col w-full">
              <textarea
                placeholder="Additional notes"
                className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm min-h-[80px]"
                {...register("notes")}
              />
            </span>
          </div>

        </div>
      </Space>

      <div className="sm:flex float-right mr-3 space-x-2 text-m mb-2 mt-3">
        {error && (
          <div className="text-red-600 text-sm">
            <p>{error}</p>
          </div>
        )}
        <button
          style={{ display: "none" }}
          ref={submitBtnRef}
          className="bg-blue-600 rounded-md px-5 h-10 font-medium text-md ml-4 py-0.5"
          onClick={handleSubmit(handleUpdate)}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Supplier"}
        </button>
      </div>
    </div>
  );
};

export default UpdateSupplierForm;