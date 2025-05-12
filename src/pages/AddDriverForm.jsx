import PropTypes from "prop-types";
import { Collapse, Space } from "antd";
import Label from "../components/controlled/Label";
import BaseInput from "../components/controlled/BaseInput";
import { useForm } from "react-hook-form";
import { useState } from "react";
import { URL } from "../config/config";
import { http } from "../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddDriverForm = ({ submitBtnRef, onSuccess }) => {
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
        url: `${URL + "/driver/driver_write"}`,
        data: {
          address: data?.address,
          driver_full_name: data?.driver_full_name,
          contact_information: { phone: data?.phone, email: data?.email },
          license_information: {
            license_number: data?.license_number,
            license_expiration: new Date(
              data?.license_expiration
            ).toISOString(),
            license_type: data?.license_type,
          },
          emergency_contact: {
            emergency_full_name: data?.emergency_full_name,
            emergency_phone: data?.emergency_phone,
            emergency_email: data?.emergency_email,
          },
          skills: [data?.skills],
          status: "Active",
        },
      };

      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("Driver added successfully");
        onSuccess();
      } else {
        toast.error("Failed to add driver");
      }
    } catch (error) {
      toast.error("Failed to add driver");
    }
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
              label: "Personal Detail Section",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1">
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2 sm:text-nowrap "
                      name="Name"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="full name"
                        className="outline-none focus-within:border-2 pl-2 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("driver_full_name", { required: true })}
                      />
                      {errors.driver_full_name && (
                        <span className="text-red-400 mt-2 text-xs">
                          First name is required
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2"
                      name="Email"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="email"
                        className="outline-none focus-within:border-2 pl-2 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("email", { required: true })}
                      />
                      {errors.email && (
                        <span className="text-red-400 text-xs mt-2">
                          Email is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col  mb-3 sm:mb-1 sm:space-x-3">
                    <Label
                      required={true}
                      className="sm:justify-start sm:mt-2 mt-3"
                      name="Telephone"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="telephone"
                        className="outline-none focus-within:border-2 pl-2 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("phone", { required: true })}
                      />
                      {errors.phone && (
                        <span className="text-red-400 text-xs mt-2">
                          Telephone is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2"
                      name="Address"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="address"
                        className="outline-none focus-within:border-2 pl-2 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("address", { required: true })}
                      />
                      {errors.address && (
                        <span className="text-red-400 text-xs mt-2">
                          Address is required
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
              label: "Licence Info",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1">
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2"
                      name="Number"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="licence number"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("license_number", { required: true })}
                      />
                      {errors.license_number && (
                        <span className="text-red-400 text-xs mt-2">
                          License Number is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2"
                      name="Type"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="licence type"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("license_type", { required: true })}
                      />
                      {errors.license_type && (
                        <span className="text-red-400 text-xs mt-2">
                          License type required
                        </span>
                      )}
                    </span>
                  </div>

                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2 text-nowrap w-full"
                      name="Expire_Date"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="date"
                        placeholder="expire date"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("license_expiration", { required: true })}
                      />
                      {errors.license_expiration && (
                        <span className="text-red-400 text-xs mt-2">
                          Company is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2"
                      name="Skill"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="main skill"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("skills", { required: true })}
                      />
                      {errors.skills && (
                        <span className="text-red-400 text-xs mt-2">
                          skill is required
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
              label: "Emergency Contact Info",
              children: (
                <div className="w-full grid sm:grid-cols-2 sm:gap-x-3 sm:gap-y-1 ">
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2"
                      name="Name"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="Full name"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("emergency_full_name", { required: true })}
                      />
                      {errors.emergency_full_name && (
                        <span className="text-red-400 mt-2 text-xs">
                          emergency name is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2"
                      name="Email"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        placeholder="email"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("emergency_email", { required: true })}
                      />
                      {errors.emergency_email && (
                        <span className="text-red-400 text-xs mt-2">
                          Email is required
                        </span>
                      )}
                    </span>
                  </div>
                  <div className="flex flex-col mb-3 sm:mb-1">
                    <Label
                      required={true}
                      className="mt-3 sm:mt-2"
                      name="Telephone"
                    />
                    <span className="flex flex-col w-full">
                      <BaseInput
                        type="number"
                        placeholder="telephone"
                        className="outline-none focus-within:border-2 pl-3 border border-gray-700  rounded py-2 w-full text-sm"
                        {...register("emergency_phone", { required: true })}
                      />
                      {errors.emergency_phone && (
                        <span className="text-red-400 text-xs mt-2">
                          Telephone is required
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
        {error && (
          <div className="text-red-600 text-sm ">
            <p>{error}</p>
          </div>
        )}
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

AddDriverForm.propTypes = {};

export default AddDriverForm;
