import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { http } from "../../services/http/http";
import { URL } from "../../config/config";
import Label from "../../components/controlled/Label";
import BaseInput from "../../components/controlled/BaseInput";

export default function EditLocationForm({ submitBtnRef, onSuccess, location }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  // Pre-fill form when location data changes
  useEffect(() => {
    if (location) {
      reset({
        name: location.name || "",
        address: location.address || "",
      });
    }
  }, [location, reset]);

  const handleEditLocation = async (values) => {
    try {
      const response = await http.request({
        method: "put",
        url: `${URL}/locations/${location.id}`,
        data: values,
      });

      if (!response.isError) {
        toast.success("Location updated successfully");
        onSuccess();
      } else {
        toast.error("Failed to update location");
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <form onSubmit={handleSubmit(handleEditLocation)} noValidate className="overflow-y-auto h-full p-4">
      <div className="mt-2 w-full text-center sm:mt-0 sm:text-left pr-3">
        <div className="flex flex-col sm:flex-row my-1 items-start sm:space-x-4 w-full">
          <Label required={true} className="mt-2" name="Name" />
          <span className="flex flex-col w-full">
            <BaseInput
              type="text"
              placeholder="Location name"
              className="outline-none focus-within:border-2 pl-2 border border-gray-300 rounded py-2 w-full text-sm"
              {...register("name", { required: true })}
            />
            {errors.name && (
              <span className="text-red-400 text-xs mt-2">Name is required</span>
            )}
          </span>
        </div>

        <div className="flex flex-col sm:flex-row my-1 items-start sm:space-x-4 w-full">
          <Label className="mt-2" name="Address" />
          <span className="flex flex-col w-full">
            <BaseInput
              type="text"
              placeholder="Location address"
              className="outline-none focus-within:border-2 pl-2 border border-gray-300 rounded py-2 w-full text-sm"
              {...register("address")}
            />
          </span>
        </div>
      </div>

      <div className="py-3 sm:flex sm:flex-row-reverse">
        <button
          style={{ display: "none" }}
          ref={submitBtnRef}
          type="submit"
          className="w-fit bg-blue-600 rounded hover:bg-blue-700 py-2 px-3 font-bold"
        >
          Save
        </button>
      </div>
    </form>
  );
}
