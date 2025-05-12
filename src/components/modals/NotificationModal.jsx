import React, {useState} from "react";

export default function NotificationModal({ isOpen, onCancel, onConfirm }) {
  const [expanded, setExpanded] = useState([]);

  const handleToggleExpand = (index) => {
    const newExpanded = [...expanded];
    newExpanded[index] = !newExpanded[index];
    setExpanded(newExpanded);
  };

  const notificationContent = [
    "notification 1 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqb notification 1 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqbnotification 1 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqbnotification 1 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqb",
    "notification 2 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqb notification 1 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqbnotification 1 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqbnotification 1 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqbnotification 1 xqkjhqkj jkbkq kqjbskqb jbksqbk jbqsskjqb",
    // Add more notifications as needed
  ];
  return (
    <div className={`fixed inset-0 ${isOpen ? "block" : "hidden"} bg-opacity-50 z-50 `}>
      <div
        className="justify-end items-start mt-10 flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none"
      >
        <div className="relative w-3/4 md:w-1/3 mx-auto max-w-3xl">          
          <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-gray-700 outline-none focus:outline-none" style={{ float: "right" }}>
            <div className="flex items-start justify-between px-5 py-2 border-b border-solid border-blueGray-200 rounded-t">
              <h3 className="text-xl font-semibold">
                Notifications
              </h3>
              <button
                className="p-1 ml-auto bg-transparent border-0 text-black float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                onClick={onCancel}
              >
                <span className="bg-transparent  h-6 w-6 text-2xl block outline-none focus:outline-none">
                  ×
                </span>
              </button>
            </div>
            {notificationContent.map((content, index) => (
              <div key={index} className="relative px-2 flex-auto  my-1">
                <p
                  className={`mt-2 text-blueGray-500 text-lg leading-relaxed ${
                    expanded[index] ? "" : "truncate"
                  }`}
                  onClick={() => handleToggleExpand(index)}
                  style={{ cursor: "pointer" }}
                >
                  {content}
                </p>
              </div>
            ))}
            <div className="flex items-center justify-end px-6 py-3 border-t border-solid border-blueGray-200 rounded-b">
              <button
                className="text-red-500 background-transparent font-bold uppercase px-6 py-2 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                type="button"
                onClick={onCancel}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="opacity-25 fixed inset-0 z-40 "></div>
    </div> 
  );
}