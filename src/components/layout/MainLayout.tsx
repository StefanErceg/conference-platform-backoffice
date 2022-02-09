import React, { FC } from "react";
import { Sidebar } from "./Sidebar";

export const MainLayout: FC = ({ children }) => {
  return (
    <div className="main_layout">
      <Sidebar />
      <div className="main_content">{children}</div>
    </div>
  );
};
