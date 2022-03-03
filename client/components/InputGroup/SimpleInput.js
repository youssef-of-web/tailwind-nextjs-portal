import React from "react";
import Classnames  from 'classnames'
function SimpleInput({label, type, name, placeholder, errors, onChange}) {
  return (
    <div className="relative w-full mb-3">
      <label
        className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
        htmlFor="grid-password"
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        className={Classnames("border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150", {"border border-red-600": errors})}
        placeholder={placeholder}
        onChange={onChange}
      />
      {
          errors && (<span style={{ color: "red" }}>{errors}</span>)
      }
    </div>
  );
}

export default SimpleInput;
