import React from "react";

export const Button = ({ children, onClick, className = "", type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className={`px-4 py-2 bg-blue-600 text-white rounded-xl shadow-md hover:bg-blue-700 transition-all duration-300 transform hover:scale-105 active:scale-95 ${className}`}
    >
      {children}
    </button>
  );
};
