import React, { FC } from "react";

interface Props {
  pages: number[];
  currentPage: number;
  selectPage: (page: number) => void;
}

export const Pagination: FC<Props> = ({
  pages = [],
  currentPage = 1,
  selectPage = () => {},
}) => {
  return (
    <div className="pagination_wrap">
      {pages.map((page, index) => (
        <span
          key={index}
          className={`pagination_item ${
            page === currentPage ? "selected" : ""
          }`}
          onClick={() => selectPage(page)}
        >
          {page}
        </span>
      ))}
    </div>
  );
};
