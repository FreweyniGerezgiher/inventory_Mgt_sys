import { http } from "../services/http/http";
import { URL } from "../config/config";

import Label from "../components/controlled/Label";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
export default function AssignAsset({ submitBtnRef, driver, onSuccess }) {
  const [asset, setAsset] = useState({ id: "", name: "" });
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  async function onCompleteClick() {
    console.log("values assid:", asset);
    const response = await http.request({
      method: "Post",
      url: `${URL + "/assign_driver/write"}`,
      data: {
        did: driver.driver_id,
        asset_id: asset.id,
      },
    });
    console.log(response);
    if (!response.isError) {
      toast.success("Driver assigned successfully");
      onSuccess();
    } else {
      toast.error("Failed to assign driver");
    }
  }

  const [assets, setAssets] = useState([]);
  const getAssets = async () => {
    try {
      // Make the HTTP requests to fetch the asset and asset-driver data
      const assetResponse = await http.request({
        url: `${URL + "/asset/list"}`,
      });
      const assetDriverResponse = await http.request({
        url: `${URL + "/assign_driver/list"}`,
      });

      // Ensure that both requests were successful
      if (!assetResponse.isError && !assetDriverResponse.isError) {
        const assetDriverIds = assetDriverResponse.map((item) => item.asset_id);

        // Filter the assets that are not assigned to a driver
        const filteredAssets = assetResponse.filter(
          (item) => !assetDriverIds.includes(item.asset_id)
        );

        // Update the state with the filtered assets
        setAssets(
          filteredAssets.map((item) => ({
            id: item.asset_id,
            name: item?.product_info?.vehicle_conventional_name,
          }))
        );
      }
    } catch (error) {
      console.error("Error fetching assets:", error);
    }
  };

  const handleAssetChange = (event) => {
    const selectedId = event.target.value;
    const selectedAssetObject = assets.find((asset) => asset.id === selectedId);
    setAsset(selectedAssetObject);
  };

  useEffect(() => {
    getAssets();
  }, []);
  return (
    <form
      onSubmit={handleSubmit(onCompleteClick)}
      noValidate
      className="overflow-y-auto h-full p-4"
    >
      <div className="mt-2 w-full text-center sm:mt-0 sm:text-left pr-3  ">
        <div className="flex flex-col sm:flex-row   my-1 items-start sm:space-x-4 w-full">
          <Label required={true} className="mt-2" name="Asset" />
          <span className="flex flex-col w-full">
            <select
              className="w-3/4 focus-within:border-2 pl-3 border text-sm border-gray-300 bg-white rounded py-2 pr-5"
              value={asset.id}
              onChange={handleAssetChange}
            >
              <option value="">Select asset...</option>
              {assets.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
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
          Submit
        </button>
      </div>
    </form>
    //   </div>
    // </div>
  );
}
