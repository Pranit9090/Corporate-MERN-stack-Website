// src/components/ui/Checkbox.jsx
import React from "react";

export function Checkbox({ checked = false, onChange }) {
  return (
    <input
      type="checkbox"
      checked={checked}
      onChange={onChange}
      className="w-5 h-5 text-blue-600 bg-white border-2 border-gray-300 rounded-md focus:ring-0 focus:outline-none transition-all duration-200 cursor-pointer"
    />
  );
}
