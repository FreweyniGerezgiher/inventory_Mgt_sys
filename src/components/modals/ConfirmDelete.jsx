// DeleteConfirmationModal.js
import React from "react";

export default function DeleteConfirmationModal ({ isOpen, onCancel, onConfirm }){
  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"} bg-opacity-50 z-50 text-black`}>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white p-8 rounded-md">
        <p className="mb-4">Are you sure you want to delete this item?</p>
        <div className="flex justify-end">
          <button className="mr-2 bg-gray-300 px-4 py-2 rounded-md" onClick={onCancel}>
            Cancel
          </button>
          <button className="bg-red-500  px-4 py-2 rounded-md" onClick={onConfirm}>
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

