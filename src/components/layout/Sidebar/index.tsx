import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { MaterialIcon } from "../../general/MaterialIcon";
import { SidebarLink } from "./SidebarLink";
import { navLinks } from "./utils";

export const Sidebar: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="sidebar">
      <div className="logo">
        <MaterialIcon icon="groups" size={36} />
        <span className="text">{t("title")}</span>
      </div>
      {navLinks?.map((link, index) => (
        <SidebarLink key={index} {...link} />
      ))}
    </div>
  );
};
