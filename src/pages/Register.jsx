import { useState } from "react";
import { Link } from "react-router-dom";
import { URL } from "../config/config";
import { http } from "../services/http/http";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useForm } from "react-hook-form";

function Register({ onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const [loading, setLoading] = useState(false);

  const registerUser = async (data) => {
    setLoading(true);
    const requestPayload = {
      method: "post",
      url: `${URL}/users/add`,
      data,
    };

    try {
      const response = await http.request(requestPayload);
      if (!response.isError) {
        toast.success("User registered successfully");
        onSuccess?.();
      } else {
        toast.error("Error registering user");
      }
    } catch (error) {
      toast.error("Error registering user");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 h-screen items-center place-items-center">
      <div className="w-full max-w-md space-y-8 p-10 rounded-lg">
        <div>
          <img
            className="mx-auto h-12 w-auto"
            src="src/assets/logo.png"
            alt="Your Company"
          />
          <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
            Register your account
          </h2>
        </div>

        <form className="mt-8 space-y-6" onSubmit={handleSubmit(registerUser)}>
          <div className="flex flex-col gap-4 rounded-md shadow-sm">
            <div className="flex gap-4">
              <input
                {...register("firstName", { required: "First name is required" })}
                type="text"
                placeholder="First Name"
                className="block w-full py-1.5 px-1.5 border border-gray-300 rounded"
              />
              <input
                {...register("lastName", { required: "Last name is required" })}
                type="text"
                placeholder="Last Name"
                className="block w-full py-1.5 px-1.5 border border-gray-300 rounded"
              />
            </div>

            <input
              {...register("email", { required: "Email is required" })}
              type="email"
              placeholder="Email address"
              className="block w-full py-1.5 px-1.5 border border-gray-300 rounded"
            />
            <input
              {...register("password", { required: "Password is required" })}
              type="password"
              placeholder="Password"
              className="block w-full py-1.5 px-1.5 border border-gray-300 rounded"
            />
            <input
              {...register("phoneNumber", { required: "Phone number is required" })}
              type="number"
              placeholder="Phone Number"
              className="block w-full py-1.5 px-1.5 border border-gray-300 rounded"
            />
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <input
                id="terms"
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600"
                required
              />
              <label htmlFor="terms" className="ml-2 block text-sm text-gray-900">
                I Agree Terms & Conditions
              </label>
            </div>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600  py-2 rounded hover:bg-indigo-500"
          >
            {loading ? "Registering..." : "Sign up"}
          </button>

          <p className="mt-2 text-center text-sm text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-indigo-600 hover:text-indigo-500">
              Sign in now
            </Link>
          </p>
        </form>
      </div>
      <div className="flex justify-center order-first sm:order-last">
        <img src="src/assets/Login.png" alt="Login Visual" />
      </div>
    </div>
  );
}

export default Register;
