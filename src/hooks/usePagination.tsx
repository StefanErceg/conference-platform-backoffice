import { useState, useEffect, useMemo } from "react";

export interface PaginationData {
  from: number;
  total: number;
  setTotal: (total: number) => void;
  currentPage: number;
  selectPage: (page: number) => void;
  pages: number[];
  perPage: number;
}

export default function usePagination(): PaginationData {
  const [perPage, setPerPage] = useState(15);
  const [from, setFrom] = useState(0);
  const [total, setTotal] = useState<number>(0);

  const [pages, setPages] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useEffect(() => {
    if (typeof total !== "number") return;
    console.log(total);
    const numberOfPages = Math.ceil(total / perPage);
    const pages = [];

    for (let i = 1; i < numberOfPages + 1; i++) pages.push(i);
    setPages(pages);
  }, [total]);

  const selectPage = (page: number) => {
    const from = page - 1;
    setFrom(from);
    setCurrentPage(page);
  };

  return {
    from,
    total,
    setTotal,
    currentPage,
    selectPage,
    pages,
    perPage,
  };
}
