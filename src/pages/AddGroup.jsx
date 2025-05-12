import { http } from "../services/http/http";
import { URL } from "../config/config";

import Label from "../components/controlled/Label";
import BaseInput from "../components/controlled/BaseInput";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
export default function CreateNewGroup({ submitBtnRef, onSuccess }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  async function onCompleteClick(values) {
    const response = await http.request({
      method: "post",
      url: `${URL + "/group/write"}`,
      data: values,
    });
    if (!response.isError) {
      toast.success("Group created successfully");
      onSuccess();
    } else {
      toast.error("Failed to create group");
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onCompleteClick)}
      noValidate
      className="overflow-y-auto h-full p-4"
    >
      <div className="mt-2 w-full text-center sm:mt-0 sm:text-left pr-3  ">
        <div className="flex flex-col sm:flex-row   my-1 items-start sm:space-x-4 w-full">
          <Label required={true} className="mt-2" name="Name" />
          <span className="flex flex-col w-full">
            <BaseInput
              type="text"
              placeholder="group name"
              className="outline-none focus-within:border-2 pl-2 border border-gray-300 rounded py-2 w-full text-sm"
              {...register("group_name", { required: true })}
            />
            {errors.group_name && (
              <span className="text-red-400 text-xs mt-2">
                group name is required
              </span>
            )}
          </span>
        </div>
      </div>

      <div className="py-3 sm:flex sm:flex-row-reverse">
        <button
          style={{ display: "none" }}
          ref={submitBtnRef}
          type="submit"
          className="w-fit bg-blue-600 rounded hover:bg-blue-700 py-2 px-3 font-bold "
        >
          Create
        </button>
      </div>
    </form>
    //   </div>
    // </div>
  );
}
