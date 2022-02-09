import React, { FC } from "react";
import { Button } from "../general/Button";
import { Search } from "../general/Search";

interface Props {
  title: string;
  leftTool?: JSX.Element;
  rightTool?: JSX.Element;
}

export const Header: FC<Props> = () => {
  return (
    <header className="main_header">
      <span className="title">Conferences</span>
      <div className="toolbar">
        <div className="left_tool">
          <Button />
        </div>
        <div className="right_tool">
          <Search />
        </div>
      </div>
    </header>
  );
};
