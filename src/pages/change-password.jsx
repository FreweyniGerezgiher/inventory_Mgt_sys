import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { setStatus } from "../store/slices/authSlice";
import { useState } from "react";
import auth from "../services/http/auth";
import { http } from "../services/http/http";
import { useNavigate } from "react-router-dom";
import { URL } from "../config/config";

function ChangePasswordForm() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showCurrentPassword, setShowCurrentPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {
    register,
    handleSubmit,
    formState: { errors: fError },
  } = useForm();

  const handleChangePassword = async ({
    currentPassword,
    newPassword,
    confirmPassword,
  }) => {
    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }
    setLoading(true);
    const requestPayload = {
      method: "post",
      url: `${URL + "/user/change_password"}`,
      data: { old_password: currentPassword, new_password: newPassword },
    };
    const response = await http.request(requestPayload);
    if (response && !response.isError) {
      dispatch(setStatus({ passwordChanged: true }));
      auth.signOut();
      navigate("/");
    } else {
      setError("Failed to change password. Please try again.");
    }
    setLoading(false);
  };

  return (
    <div className="w-full md:w-1/3 border mx-2 md:mx-10 rounded-md flex flex-col justify-between">
      <div className="p-5 my-5  space-y-3">
        <h2 className="text-lg font-bold">Change Password</h2>
        <div className="space-y-2">
          <div className="flex space-x-2 sm:mb-1">
            <i
              className="fa fa-unlock-alt mt-2 text-sky-600"
              style={{ fontSize: 20 }}
            />
            <span className="flex flex-col w-full">
              <span className="flex relative">
                <input
                  type={showCurrentPassword ? "text" : "password"}
                  placeholder="Current Password"
                  className="outline-none focus-within:border-2 pl-3 pr-10 border border-sky-800 bg-transparent rounded py-2 w-full text-sm"
                  {...register("currentPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                  className="absolute right-0 top-0 mt-2 mr-3"
                >
                  {showCurrentPassword ? (
                    <i className="fa fa-eye-slash" aria-hidden="true" />
                  ) : (
                    <i className="fa fa-eye" aria-hidden="true" />
                  )}
                </button>
              </span>
              {fError.currentPassword && (
                <span className="text-xs text-red-600">
                  Current password is required
                </span>
              )}
            </span>
          </div>

          <div className="flex space-x-2 sm:mb-1">
            <i
              className="fa fa-lock mt-2 text-sky-600"
              style={{ fontSize: 20 }}
            />
            <span className="flex flex-col w-full">
              <span className="flex relative ">
                <input
                  type={showNewPassword ? "text" : "password"}
                  placeholder="New Password"
                  className="outline-none focus-within:border-2 pl-3 border border-sky-800 bg-transparent rounded py-2 w-full text-sm"
                  {...register("newPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowNewPassword(!showNewPassword)}
                  className="absolute right-0 top-0 mt-2 mr-3"
                >
                  {showNewPassword ? (
                    <i className="fa fa-eye-slash" aria-hidden="true" />
                  ) : (
                    <i className="fa fa-eye" aria-hidden="true" />
                  )}
                </button>
              </span>
              {fError.newPassword && (
                <span className="text-xs text-red-600">
                  New password is required
                </span>
              )}
            </span>
          </div>
          <div className="flex space-x-2 sm:mb-1">
            <i
              className="fa fa-lock mt-2 text-sky-600"
              style={{ fontSize: 20 }}
            />
            <span className="flex flex-col w-full">
              <span className="flex relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="outline-none focus-within:border-2 pl-3 border border-sky-800 bg-transparent rounded py-2 w-full text-sm"
                  {...register("confirmPassword", { required: true })}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  className="absolute right-0 top-0 mt-2 mr-3"
                >
                  {showConfirmPassword ? (
                    <i className="fa fa-eye-slash" aria-hidden="true" />
                  ) : (
                    <i className="fa fa-eye" aria-hidden="true" />
                  )}
                </button>
              </span>
              {fError.confirmPassword && (
                <span className="text-xs text-red-600">
                  Confirmation password is required
                </span>
              )}
            </span>
          </div>
        </div>

        {error && <div className="text-red-400 text-sm">{error}</div>}
      </div>

      <div className="flex justify-end items-center p-2 py-3 bg-transparent ">
        <div
          className="py-2 px-4 rounded  text-sm flex space-x-2 items-center bg-blue-700 hover:bg-primary cursor-pointer"
          onClick={handleSubmit(handleChangePassword)}
        >
          {loading && (
            <i
              className="fa fa-circle-o-notch animate-spin"
              style={{ fontSize: 14 }}
            />
          )}
          <div>Change Password</div>
        </div>
      </div>
    </div>
  );
}

export default function ChangePassword() {
  return (
    <div className="relative h-screen  py-1 mx-auto">
      <div className="flex items-center justify-center h-full w-full">
        <ChangePasswordForm />
      </div>
    </div>
  );
}
