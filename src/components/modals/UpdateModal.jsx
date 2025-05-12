import { Fragment, useState } from 'react'
import { useDispatch } from "react-redux";
import { Dialog, Transition } from '@headlessui/react'
import { http } from "../../services/http/http";

import Label from '../controlled/Label'
import BaseInput from '../controlled/BaseInput'

import { useForm } from "react-hook-form"
import { XMarkIcon } from '@heroicons/react/24/outline'


function* getId() {
  let id = 0
  while (true) {
    yield ++id
  }
}

const id = getId()

export default function CreateNewGroup({ onClose, onComplete }) {
  const { register, handleSubmit, control, formState: { errors }} = useForm()

  async function onCompleteClick(values) {

    const data = new FormData()
    data.append("language", values.language)
    
    const response = await http.request({
      method: 'post',
      url: '/quests/add',
      data
    })
    console.log("Quest Response:", response)
    if (response) {
      let quest = response?.data
      quest.answers = []

      onComplete(false)
      await toastSuccess('You have successfully added new app!')
    }
    else {
      alert('testdmk')
    }
  }


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
          <Dialog.Panel className="relative transform h-fit bg-white text-left shadow-xl transition-all sm:w-full mt-10 m-auto">
            <form onSubmit={handleSubmit(onCompleteClick)} noValidate className='overflow-y-auto h-full p-4'>
              <div className="bg-white pb-4 sm:pb-4 ">
                <div className="sm:flex flex-col sm:items-start">
                  <div className="mt-3 w-full text-center sm:mt-0 sm:text-left border-b pb-5">
                    <Dialog.Title as="h3" className="flex justify-between items-center text-xl font-semibold my-5">
                      <span className='font-bold '>Create New Group</span>
                      <XMarkIcon className='w-6 h-6 font-bold text-black' onClick={() => onClose(false)} />
                    </Dialog.Title>
                    <div className="flex flex-col my-1 items-center">
                     <div className="sm:flex mb-4 sm:space-x-4 w-full">
                      <Label required={true} className="mt-4" name="Name" />
                      <span className="flex flex-col w-full">
                        <BaseInput
                          type="text"
                          placeholder="group name"
                          className="outline-none focus-within:border-2 pl-3 border border-gray-300 rounded py-2 w-full text-sm"
                          {...register('model', { required: true })}
                        />
                        {errors.model && (
                          <span className="text-red-400 text-xs mt-2">
                            channel name is required
                          </span>
                        )}
                      </span>
                    </div>
                    </div> 
                  </div>
                </div>
              </div>
              <div className="py-3 sm:flex sm:flex-row-reverse">
                <button className="w-full bg-[#192E39] rounded hover:bg-[#0a1922] py-3 px-3 font-bold ">
                  Complete
                </button>
              </div>
            </form>
          </Dialog.Panel>
        </Transition.Child>
      </div>
    </div>
  )
}
