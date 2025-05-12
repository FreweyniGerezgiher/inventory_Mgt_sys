import { Fragment} from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { XMarkIcon } from '@heroicons/react/24/outline'

export default function InfoModal({ data, onClose}) {
  console.log(data)
  return (
    <div className="fixed w-full inset-0 overflow-hidden sm:max-w-lg m-auto">
      <div className="flex items-end justify-center text-center sm:items-center overflow-hidden">
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-500"
          enterFrom="opacity-0 translate-y-10 sm:translate-y-0 sm:scale-95"
          enterTo="opacity-100 translate-y-0 sm:scale-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100 translate-y-0 sm:scale-100"
          leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
        >
          <Dialog.Panel className="relative rounded-md transform h-fit bg-white text-left shadow-xl transition-all sm:w-full mt-10 m-auto">
            <div className='overflow-y-auto h-full p-4'>
              <div className="bg-white pb-4 sm:pb-4 ">
                <div className="sm:flex flex-col sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:text-left border-b pb-5">
                    <Dialog.Title as="h3" className="flex justify-between items-center text-xl font-semibold my-5">
                      <span className='font-bold'>28/08/2023</span>
                      <XMarkIcon className='w-6 h-6 hover:cursor-pointer font-bold text-black'  onClick={() => onClose(false)} />
                    </Dialog.Title>
                     <div className="flex flex-col sm:flex-row mb-4  my-1 items-start sm:space-x-4 w-full">
                      <span className="flex flex-col w-full">
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. </p>
                      </span>
                    </div>
                    </div>
                </div>
              </div>
            </div>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}
