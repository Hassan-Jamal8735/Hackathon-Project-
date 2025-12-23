import React, { forwardRef } from 'react';

const Input = forwardRef(({ 
  label, 
  type = "text", 
  error, 
  className = "", 
  ...props 
}, ref) => {
  return (
    <div className="flex flex-col w-full gap-1.5 mb-4">
      {label && (
        <label className="text-sm font-medium text-gray-700">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          flex h-10 w-full rounded-md border border-gray-300 bg-white px-3 py-2 
          text-sm placeholder:text-gray-400 
          focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
          disabled:cursor-not-allowed disabled:opacity-50
          transition-colors duration-200
          ${error ? "border-red-500 focus:ring-red-500" : "border-gray-300"}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="text-xs text-red-500 mt-1">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;