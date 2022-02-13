import React, { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../api";
import { Button } from "../../components/general/Button";
import { Loader } from "../../components/general/Loader";
import { Search } from "../../components/general/Search";
import { Header } from "../../components/layout/Header";
import { TableHeader } from "./components/TableHeader";
import { Country } from "./types";
import { isEmpty } from "lodash";
import { TableRow } from "./components/TableRow";
import { Footer } from "../../components/layout/Footer";
import usePagination from "../../hooks/usePagination";
import { Pagination } from "../../components/general/Pagination";
import { Modal } from "../../components/general/Modal";

export const Countries: FC = () => {
  const { t } = useTranslation();

  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState<Country[]>();
  const [searchValue, setSearchValue] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  const { setTotal, from, total, perPage, ...pagination } = usePagination();

  const loadCountries = async () => {
    try {
      setLoaded(false);
      const data = await api.countries.getAll(from, perPage);
      setCountries(data.content);
      setTotal(data.totalElements);
    } catch (error) {
    } finally {
      setLoaded(true);
    }
  };

  useEffect(() => {
    loadCountries();
  }, [from]);

  const handleSearch = (value: string) => {
    setSearchValue(value?.trim());
  };

  const openModal = () => {
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
  };

  return (
    <Loader loaded={loaded}>
      <Header
        title={t("nav.countries")}
        leftTool={<Button text={t("addCountry")} onClick={openModal} />}
        rightTool={<Search onChange={handleSearch} />}
      />
      <table>
        <TableHeader />
        <tbody>
          {!isEmpty(countries) &&
            countries?.map((country, index) => (
              <TableRow key={index} country={country} />
            ))}
        </tbody>
      </table>
      <Footer right={<Pagination {...pagination} />} />
      {modalOpened ? <Modal close={closeModal} /> : null}
    </Loader>
  );
};
