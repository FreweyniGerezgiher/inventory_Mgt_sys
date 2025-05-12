import AssetTable from "./AssetList";
import DriverTable from "./DriverList";
import AssetsDashboard from "./AssetsDashboard";
import LocationTable from "./GroupList";
import { Tab } from "@headlessui/react";
import { ArrowsPointingOutIcon, UsersIcon, WrenchScrewdriverIcon } from '@heroicons/react/24/outline'
import Header from "../components/layouts/HeaderNav"
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
export default function ListDashBoard() {
  return (
    <div className="w-full flex justify-center">
      <div className="w-full">
        <Tab.Group>
          <div className="flex flex-col md:flex-row">
           <Tab.List className="flex flex-col bg-gray-900 md:sticky h-screen w-full md:w-[12.5%] py-4 gap-2">
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full px-2 py-2 font-semibold border-white text-base text-start focus:outline-none",
                      selected
                        ? "bg-slate-700 md:border-l-2 border-b-2 md:border-b-0"
                        : "border-l-0"
                    )
                  }
                >
                  <div className="flex gap-3">
                    <ArrowsPointingOutIcon className="w-5 h-5 font-bold" />
                    <p className="text-xs md:text-base">Dashboard</p>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full px-2 py-2 font-semibold border-white text-base text-start focus:outline-none",
                      selected
                        ? "bg-slate-700 md:border-l-2 border-b-2 md:border-b-0"
                        : "border-l-0"
                    )
                  }
                >
                  <div className="flex gap-3">
                    <ArrowsPointingOutIcon className="w-5 h-5 font-bold" />
                    <p className="text-xs md:text-base">Locations</p>
                  </div>
                </Tab>
                
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full px-2 py-2 font-semibold border-white text-base text-start focus:outline-none",
                      selected
                        ? "bg-slate-700 md:border-l-2 border-b-2 md:border-b-0"
                        : "border-l-0"
                    )
                  }
                >
                  <div className="flex gap-3">
                    <WrenchScrewdriverIcon className="w-5 h-5 font-bold" />
                    <p className="text-xs md:text-base">Products</p>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full px-2 py-2 font-semibold border-white text-base text-start focus:outline-none",
                      selected
                        ? "bg-slate-700 md:border-l-2 border-b-2 md:border-b-0"
                        : "border-l-0"
                    )
                  }
                >
                  <div className="flex gap-3">
                    <ArrowsPointingOutIcon className="w-5 h-5 font-bold" />
                    <p className="text-xs md:text-base">Sales</p>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full px-2 py-2 font-semibold border-white text-base text-start focus:outline-none",
                      selected
                        ? "bg-slate-700 md:border-l-2 border-b-2 md:border-b-0"
                        : "border-l-0"
                    )
                  }
                >
                  <div className="flex gap-3">
                    <ArrowsPointingOutIcon className="w-5 h-5 font-bold" />
                    <p className="text-xs md:text-base">Orders</p>
                  </div>
                </Tab>
                <Tab
                  className={({ selected }) =>
                    classNames(
                      "w-full px-2 py-2 font-semibold border-white text-base text-start focus:outline-none",
                      selected
                        ? "bg-slate-700 md:border-l-2 border-b-2 md:border-b-0"
                        : "border-l-0"
                    )
                  }
                >
                  <div className="flex gap-3">
                    <UsersIcon className="w-5 h-5 font-bold" />
                    <p className="text-xs md:text-base">Users</p>
                  </div>
                </Tab>
            </Tab.List>

            <div className="flex-grow">
              <Header/>
              <Tab.Panels className="border-gray-800">
                <Tab.Panel>
                  <AssetsDashboard />
                </Tab.Panel>
                <Tab.Panel>
                  <AssetTable />
                </Tab.Panel>
                <Tab.Panel>
                  <DriverTable />
                </Tab.Panel>
                <Tab.Panel>
                  <LocationTable />
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
}
