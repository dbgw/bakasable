import React from "react";

export default function DashboardSide({ children, className, ...props }) {
  return (
    <div className={`side-content-dashboard ${className} active-side`}>
      {children}
    </div>
  );
}
