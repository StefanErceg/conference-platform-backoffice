import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { SidebarLink } from "./SidebarLink";
import { navLinks } from "./utils";

export const Sidebar: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <div className="logo">
        <span className="material-icons icon md-36">groups</span>
        <span className="text">{t("title")}</span>
      </div>
      {navLinks?.map((link, index) => (
        <SidebarLink key={index} {...link} />
      ))}
    </div>
  );
};
