import { Space } from "antd";
import Label from "../../components/controlled/Label";
import BaseInput from "../../components/controlled/BaseInput";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { URL } from "../../config/config";
import { http } from "../../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AddUserForm = ({ submitBtnRef, onSuccess }) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

    const [locations, setLocations] = useState([]);
    const [location, setLocation] = useState({ id: "", name: "" });

    const [roles, setRoles] = useState([]);
    const [role, setRole] = useState({ id: "", name: "" });

  const getLocations = async () => {
    const response = await http.request({
      url: `${URL + "/locations/all"}`,
    });

    if (!response.isError) {
      setLocations(response.data);
    }
  };
  const getRoles = async () => {
    const response = await http.request({
      url: `${URL + "/roles/all"}`,
    });

    if (!response.isError) {
      setRoles(response.data);
    }
  };

  const handleRegistration = async (data) => {
    setLoading(true);
    try {
      const requestPayload = {
        method: "post",
        url: `${URL + "/users/add"}`,
        data: {...data, location_id: location.id, role_id: role.id},
      };

      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("User added successfully");
        onSuccess();
      } else {
        toast.error("Failed to add user");
      }
    } catch (error) {
      toast.error("Failed to add user");
    }
  };

  useEffect(() => {
    getLocations();
    getRoles();
  }, []);

return (
  <div>
    <Space direction="vertical" className="w-full">
      <div className="w-full grid sm:grid-cols-2 sm:gap-x-4 sm:gap-y-1">
        
        <div className="flex flex-col mb-3 sm:mb-1">
          <Label required={true} className="mt-3 sm:mt-2" name="First Name" />
          <span className="flex flex-col w-full">
            <BaseInput
              placeholder="first name"
              className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("first_name", { required: true })}
            />
            {errors.first_name && (
              <span className="text-red-400 mt-2 text-xs">First name is required</span>
            )}
          </span>
        </div>

        <div className="flex flex-col mb-3 sm:mb-1">
          <Label required={true} className="mt-3 sm:mt-2" name="Last Name" />
          <span className="flex flex-col w-full">
            <BaseInput
              placeholder="last name"
              className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("last_name", { required: true })}
            />
            {errors.last_name && (
              <span className="text-red-400 mt-2 text-xs">Last name is required</span>
            )}
          </span>
        </div>

        <div className="flex flex-col mb-3 sm:mb-1">
          <Label required={true} className="mt-3 sm:mt-2" name="Email" />
          <span className="flex flex-col w-full">
            <BaseInput
              placeholder="email"
              className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("email", { required: true })}
            />
            {errors.email && (
              <span className="text-red-400 mt-2 text-xs">Email is required</span>
            )}
          </span>
        </div>

        <div className="flex flex-col mb-3 sm:mb-1">
          <Label required={true} className="mt-3 sm:mt-2" name="Password" />
          <span className="flex flex-col w-full">
            <BaseInput
              type="password"
              placeholder="password"
              className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("password", { required: true })}
            />
            {errors.password && (
              <span className="text-red-400 mt-2 text-xs">Password is required</span>
            )}
          </span>
        </div>

        <div className="flex flex-col mb-3 sm:mb-1">
          <Label required={true} className="mt-3 sm:mt-2" name="Phone" />
          <span className="flex flex-col w-full">
            <BaseInput
              placeholder="phone"
              className="outline-none focus-within:border-2 pl-2 border border-gray-700 rounded py-2 w-full text-sm"
              {...register("phone", { required: true })}
            />
            {errors.phone && (
              <span className="text-red-400 mt-2 text-xs">Phone is required</span>
            )}
          </span>
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

        <div className="flex flex-col mb-3 sm:mb-1">
          <Label required={true} className="mt-2" name="Role" />
          <span className="flex flex-col w-full">
            <select
              className="w-full outline-none focus-within:border-2 pl-3 border text-sm border-gray-300 bg-white rounded py-2 pr-5"
              value={role.id}
              onChange={(e) => setRole({ id: e.target.value })}
            >
              <option value="">Select role</option>
              {roles.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
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
        value="Register"
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

AddUserForm.propTypes = {};

export default AddUserForm;
