import ProductTable from "./products/ProductList";
import UserTable from "./users/UserList";
import Dashboard from "./Dashboard";
import LocationTable from "./locations/LocationList";
import CategoryTable from "./product-categories/CategoryList"
import PurchaseTable from "./purchases/PurchaseList"
import SupplierTable from "./suppliers/SupplierList";
import SalesTable from "./sales/SalesList"
import { Tab } from "@headlessui/react";
import Header from "../components/layouts/HeaderNav"
import { userService } from "../services/storageService";
import { 
  ShoppingCartIcon, 
  TruckIcon, 
  UserGroupIcon,
  UsersIcon,
  MapPinIcon,
  CubeIcon,
  TagIcon,
  ChartBarIcon,
} from '@heroicons/react/24/outline';

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function ListDashBoard() {
  let user = userService.getUser();

  return (
    <div className="w-full flex justify-center">
      <div className="w-full flex">
        <Tab.Group>
          <div className="flex flex-col md:flex-row w-full">
            <Tab.List className="flex flex-col bg-gray-900 h-screen w-full md:w-48 lg:w-56 py-4 gap-2 sticky top-0">
              {/* Dashboard */}
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
                  <ChartBarIcon className="w-5 h-5 font-bold" />
                  <p className="text-xs md:text-base">Dashboard</p>
                </div>
              </Tab>

              {/* Sales */}
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
                  <ShoppingCartIcon className="w-5 h-5 font-bold" />
                  <p className="text-xs md:text-base">Sales</p>
                </div>
              </Tab>

              {/* Purchases */}
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
                  <TruckIcon className="w-5 h-5 font-bold" />
                  <p className="text-xs md:text-base">Purchases</p>
                </div>
              </Tab>                
              
              <hr className="border-gray-700 mx-2" />

              {/* Users (Admin only) */}
              {user.role === "Admin" && (
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
                    <UserGroupIcon className="w-5 h-5 font-bold" />
                    <p className="text-xs md:text-base">Users</p>
                  </div>
                </Tab>
              )}
              
              {/* Suppliers */}
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
                  <p className="text-xs md:text-base">Suppliers</p>
                </div>
              </Tab>
              
              {/* Locations */}
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
                  <MapPinIcon className="w-5 h-5 font-bold" />
                  <p className="text-xs md:text-base">Locations</p>
                </div>
              </Tab>

              <hr className="border-gray-700 mx-2" />

              {/* Products */}
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
                  <CubeIcon className="w-5 h-5 font-bold" />
                  <p className="text-xs md:text-base">Products</p>
                </div>
              </Tab>
              
              {/* Product Categories */}
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
                  <TagIcon className="w-5 h-5 font-bold" />
                  <p className="text-xs md:text-base">Product Categories</p>
                </div>
              </Tab>
            </Tab.List>
            <div className="flex-1 flex flex-col min-h-screen">
              <Header className="sticky top-0 z-10" />
              <Tab.Panels className="flex-1 overflow-y-auto">
                <Tab.Panel className="h-full">
                  <Dashboard />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <SalesTable />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <PurchaseTable />
                </Tab.Panel>
                
                {user.role === "Admin" && (<Tab.Panel className="h-full">
                  <UserTable />
                </Tab.Panel>)}
                <Tab.Panel className="h-full">
                  <SupplierTable />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <LocationTable />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <ProductTable />
                </Tab.Panel>
                <Tab.Panel className="h-full">
                  <CategoryTable />
                </Tab.Panel>
              </Tab.Panels>
            </div>
          </div>
        </Tab.Group>
      </div>
    </div>
  );
}