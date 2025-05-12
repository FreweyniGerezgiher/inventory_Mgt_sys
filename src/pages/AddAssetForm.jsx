import { Collapse, Space } from "antd";
import Label from "../components/controlled/Label";
import BaseInput from "../components/controlled/BaseInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { URL } from "../config/config";
import { http } from "../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddAssetForm = ({ submitBtnRef, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

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
        url: `${URL + "/asset/write/Type-1"}`,
        data: {
          structural_info: {
            vehicle_cargo_volume: parseFloat(data?.vehicle_cargo_volume),
            vehicle_number_of_airbags: parseInt(
              data?.vehicle_number_of_airbags
            ),
            vehicle_payload: parseFloat(data?.vehicle_payload),
            vehicle_roof_load: parseFloat(data?.vehicle_roof_load),
            vehicle_seating_capacity: parseInt(data?.vehicle_seating_capacity),
            vehicle_total_weight: parseFloat(data?.vehicle_total_weight),
          },
          tyre_info: {
            vehicle_tyre_manufacturer: data?.vehicle_tyre_manufacturer,
            vehicle_tyre_size: parseInt(data?.vehicle_tyre_size),
            vehicle_tyre_type: data?.vehicle_tyre_type,
            vehicle_tyre_model: data?.vehicle_tyre_model,
            vehicle_number_of_wheel: parseInt(data?.vehicle_number_of_wheel),
          },
          engine_info: {
            vehicle_specific_usage: data?.vehicle_specific_usage,
            vehicle_engine_description: data?.vehicle_engine_description,
            vehicle_engine_horsepower: parseFloat(
              data?.vehicle_engine_horsepower
            ),
          },
          fuel_info: {
            vehicle_fuel_container_capacity:
              data.vehicle_fuel_container_capacity,
            vehicle_fuel_efficiency: data?.vehicle_fuel_efficiency,
            vehicle_fuel_type: data?.vehicle_fuel_type,
          },
          insurance_info: {
            policy_number: data?.policy_number,
            expiration_date: new Date(data?.expiration_date).toISOString(),
            insurance_provider: data?.insurance_provider,
          },
          product_info: {
            vehicle_type: data?.vehicle_type,
            vehicle_conventional_name: data?.vehicle_conventional_name,
            vehicle_brand: data?.vehicle_brand,
            vehicle_model: data?.vehicle_model,
            vehicle_id_num: data?.vehicle_id_num,
            vehicle_manufacturer: data?.vehicle_manufacturer,
            vehicle_mileage: data?.vehicle_mileage,
            purchase_date: new Date(data?.purchase_date).toISOString(),
            production_date: new Date(data?.production_date).toISOString(),
            vehicle_license_number: data?.vehicle_license_number,
            vehicle_desc: data?.vehicle_desc,
          },
          asset_state: "Active",
        },
      };

      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("Asset added successfully");
        onSuccess();
      } else {
        toast.error("Error adding asset");
      }
    } catch (error) {
      toast.error(error);
    }
    setLoading(false);
  };

  return (
    <div className="">
      <Space direction="vertical" className="w-full">
        <Collapse
          collapsible="header"
          expandIconPosition="right"
          size="large"
          items={[
            {
              key: "1",
              label: "Product Info",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1">
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Name" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle conventional name"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_conventional_name", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_conventional_name && (
                        <span className="text-red-400 mt-2 text-xs">
                          vehicle name is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Type" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle type"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_type", { required: true })}
                      />
                      {errors.vehicle_type && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle type is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-4"
                      name="License Number"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle type"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_license_number", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_license_number && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle license number is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Brand" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle brand"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_brand", { required: true })}
                      />
                      {errors.vehicle_brand && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle brand is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Model" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle model"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_model", { required: true })}
                      />
                      {errors.vehicle_model && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle model is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="ID" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle id number"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_id_num", { required: true })}
                      />
                      {errors.vehicle_id_num && (
                        <span className="text-red-400 mt-2 text-xs">
                          vehicle id number is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Mileage" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle mileage"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_mileage", { required: true })}
                      />
                      {errors.vehicle_mileage && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle mileage is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Manufacturer"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle manufacturer"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_manufacturer", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_manufacturer && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle manufacturer is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Production Date"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="date"
                        placeholder="production date"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("production_date", { required: true })}
                      />
                      {errors.production_date && (
                        <span className="text-red-400 text-xs mt-2">
                          production date is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Purchase Date"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="date"
                        placeholder="purchase date"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("purchase_date", { required: true })}
                      />
                      {errors.purchase_date && (
                        <span className="text-red-400 text-xs mt-2">
                          purchase date is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Description"
                    />
                    <span className="flex flex-col w-full">
                      <textarea
                        rows="5"
                        placeholder="vehicle description"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm font-normal"
                        {...register("vehicle_desc", { required: true })}
                      />
                      {errors.vehicle_desc && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle description type is required
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <Collapse
          collapsible="icon"
          expandIconPosition="right"
          size="large"
          items={[
            {
              key: "1",
              label: "Structural Info",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1">
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Air Bags" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="number of air bags"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_number_of_airbags", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_number_of_airbags && (
                        <span className="text-red-400 mt-2 text-xs">
                          number of airbags is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Capacity" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="seating capacity"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_seating_capacity", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_seating_capacity && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle seating capacity is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Volume" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="cargo volume"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_cargo_volume", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_cargo_volume && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle cargo volume is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Weight" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="total weight"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_total_weight", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_total_weight && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle total weight is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Payload" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="vehicle payload"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_payload", { required: true })}
                      />
                      {errors.vehicle_payload && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle payload is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-4 w-full"
                      name="Roof Load"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="roof load"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_roof_load", { required: true })}
                      />
                      {errors.vehicle_roof_load && (
                        <span className="text-red-400 text-xs mt-2">
                          vehicle roof load is required
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <Collapse
          collapsible="icon"
          expandIconPosition="right"
          size="large"
          items={[
            {
              key: "1",
              label: "Tyre Info",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1 ">
                  <div className="sm:flex mb-4 sm:space-x-4">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Manufacturer"
                    />
                    <span className="flex flex-col w-full">
                      <input
                        placeholder="tire manufacturer"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_tyre_manufacturer", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_tyre_manufacturer && (
                        <span className="text-red-400 text-xs mt-2">
                          manufacturer is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="sm:flex mb-4 sm:space-x-4">
                    <Label required={true} className="mt-4" name="Model" />
                    <span className="flex flex-col w-full">
                      <input
                        placeholder="tire model"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_tyre_model", { required: true })}
                      />
                      {errors.vehicle_tyre_model && (
                        <span className="mt-2 text-red-600 text-xs">
                          tyre model is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="sm:flex mb-4 sm:space-x-4">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Number of Tires"
                    />
                    <span className="flex flex-col w-full">
                      <input
                        type="number"
                        placeholder="number of tires"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_number_of_wheel", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_numberOf_wheel && (
                        <span className="mt-2 text-red-600 text-xs">
                          number of wheels required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="sm:flex mb-4 sm:space-x-4">
                    <Label required={true} className="mt-4" name="Type" />
                    <span className="flex flex-col w-full">
                      <input
                        placeholder="tire type"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_tyre_type", { required: true })}
                      />
                      {errors.vehicle_tyre_type && (
                        <span className="mt-2 text-red-600 text-xs">
                          vehicle tyre type is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="sm:flex mb-4 sm:space-x-4">
                    <Label required={true} className="mt-4" name="Size" />
                    <span className="flex flex-col w-full">
                      <input
                        type="number"
                        placeholder="tire size"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_tyre_size", { required: true })}
                      />
                      {errors.vehicle_tyre_size && (
                        <span className="mt-2 text-red-600 text-xs">
                          vehicle tyre size is required
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <Collapse
          collapsible="icon"
          expandIconPosition="right"
          size="large"
          items={[
            {
              key: "1",
              label: "Fuel Info",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1 ">
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Capacity" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="fuel container capacity"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_fuel_container_capacity", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_fuel_container_capacity && (
                        <span className="text-red-400 text-xs mt-2">
                          container capacity is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Efficiency" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="vehicle fuel efficiency"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_fuel_efficiency", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_fuel_efficiency && (
                        <span className="text-red-400 text-xs mt-2">
                          fuel efficiency is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Type" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="fuel type"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_fuel_type", { required: true })}
                      />
                      {errors.vehicle_fuel_type && (
                        <span className="text-red-400 text-xs mt-2">
                          fuel type is required
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <Collapse
          collapsible="icon"
          expandIconPosition="right"
          size="large"
          items={[
            {
              key: "1",
              label: "Engine Info",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1 ">
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Usage" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="specific usage"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_specific_usage", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_specific_usage && (
                        <span className="text-red-400 text-xs mt-2">
                          specific usage is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Description"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="engine description"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_engine_description", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_engine_description && (
                        <span className="text-red-400 text-xs mt-2">
                          Number of assets is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label required={true} className="mt-4" name="Horsepower" />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="engine horsepower"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("vehicle_engine_horsepower", {
                          required: true,
                        })}
                      />
                      {errors.vehicle_engine_horsepower && (
                        <span className="text-red-400 text-xs mt-2">
                          engine horsepower is required
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />
        <Collapse
          collapsible="icon"
          expandIconPosition="right"
          size="large"
          items={[
            {
              key: "1",
              label: "Insurance Info",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1 ">
                  <div className="sm:flex mb-4 sm:space-x-4">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Policy Number"
                    />
                    <span className="flex flex-col w-full">
                      <input
                        placeholder="policy number"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("policy_number", { required: true })}
                      />
                      {errors.policy_number && (
                        <span className="text-red-400 text-xs mt-2">
                          policy number is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="sm:flex mb-4 sm:space-x-4">
                    <Label
                      required={true}
                      className="mt-4"
                      name="Expiration Date"
                    />
                    <span className="flex flex-col w-full">
                      <input
                        type="date"
                        placeholder="expiration date"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("expiration_date", { required: true })}
                      />
                      {errors.expiration_date && (
                        <span className="mt-2 text-red-600 text-xs">
                          expiration date is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="sm:flex mb-4 sm:space-x-4">
                    <Label required={true} className="mt-4" name="Provider" />
                    <span className="flex flex-col w-full">
                      <input
                        placeholder="insurance provider"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("insurance_provider", { required: true })}
                      />
                      {errors.insurance_provider && (
                        <span className="mt-2 text-red-600 text-xs">
                          Confirm your password
                        </span>
                      )}
                    </span>
                  </div>
                </div>
              ),
            },
          ]}
        />
      </Space>

      <div className="sm:flex float-right mr-3 space-x-2 text-m mb-2 mt-3">
        <button
          style={{ display: "none" }}
          value="Register"
          ref={submitBtnRef}
          className="bg-blue-600 rounded-md px-5 h-10 font-medium text-md  ml-4 py-0.5"
          onClick={handleSubmit(handleRegistration)}
        >
          Register
        </button>
      </div>
    </div>
  );
};

AddAssetForm.propTypes = {};

export default AddAssetForm;
