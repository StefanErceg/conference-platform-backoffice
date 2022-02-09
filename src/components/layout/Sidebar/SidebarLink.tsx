import React, { FC } from "react";

interface Props {
  path: string;
  text: string;
  icon: string;
}

export const SidebarLink: FC<Props> = ({ path, text, icon }) => {
  return (
    <li className={`${false && "selected"}`}>
      <div className="icon">
        <span className="material-icons md-24">{icon}</span>
      </div>
      <span className="text">{text}</span>
    </li>
  );
};
