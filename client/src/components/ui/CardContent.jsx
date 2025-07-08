import React from "react";

export const CardContent = ({ children, className = "" }) => {
  return (
    <div className={`text-gray-800 ${className}`}>
      {children}
    </div>
  );
};
