import React from "react";

const BaseInput = React.forwardRef(
  ({ type = "text", label, placeholder, setter, required, ...rest }, ref) => {
    return (
      <div className="">
        {label && (
          <div className="text-gray-2 mb-1 leading-6 text-xs font-normal">
            <span style={{ color: "red" }}> {required && "*"} </span>
            {label}
          </div>
        )}
        <input
          type={type}
          placeholder={placeholder}
          // onKeyDown={(event) => setter(event.target.value)}
          className="block autofill:bg-transparent h-9 w-full px-3 mt-1 transition duration-150 ease-in-out border border-gray-1 rounded-md inset-px shadow-sm focus:shadow-blue-300 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 text-xs sm:text-sm sm:leading-5"
          {...rest}
          ref={ref}
        />
      </div>
    );
  }
);

export default BaseInput;
