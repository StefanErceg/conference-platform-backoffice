import React, { FC } from "react";
import usePagination from "../../hooks/usePagination";
import { Pagination } from "../general/Pagination";

interface Props {
  left?: JSX.Element;
  right?: JSX.Element;
}

export const Footer: FC<Props> = ({ left = <div />, right }) => {
  return (
    <div className="main_footer">
      {left}
      {right}
    </div>
  );
};
