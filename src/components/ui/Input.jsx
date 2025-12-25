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
        <label className="form-label">
          {label}
        </label>
      )}
      <input
        ref={ref}
        type={type}
        className={`
          form-input
          bg-slate-800/50 backdrop-blur-sm
          text-white placeholder:text-slate-400
          hover:border-slate-500
          ${error ? "border-red-500 focus:ring-red-500 focus:border-red-500" : ""}
          ${className}
        `}
        {...props}
      />
      {error && (
        <span className="form-error">
          {error}
        </span>
      )}
    </div>
  );
});

Input.displayName = "Input";

export default Input;