import React, { FC } from "react";

interface Props {
  title: string;
  leftTool?: JSX.Element;
  rightTool?: JSX.Element;
}

export const Header: FC<Props> = ({ title, leftTool, rightTool }) => {
  return (
    <header className="main_header">
      <span className="title">{title}</span>
      <div className="toolbar">
        <div className="left_tool">{leftTool}</div>
        <div className="right_tool">{rightTool}</div>
      </div>
    </header>
  );
};
