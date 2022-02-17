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
import { CountryModal } from "./components/CountryModal";

export const Countries: FC = () => {
  const { t } = useTranslation();

  const [loaded, setLoaded] = useState(false);
  const [countries, setCountries] = useState<Country[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  const { setTotal, from, total, perPage, ...pagination } = usePagination();

  const [selectedCountry, setSelectedCountry] = useState<Country | null>(null);

  const loadCountries = async () => {
    try {
      setLoaded(false);
      const data = await api.countries.getAll(from, perPage);
      setCountries(data.content);
      setTotal(data.totalElements);
    } catch (error) {
      console.error(error);
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

  const openModal = (country: Country | null) => {
    setSelectedCountry(country);
    setModalOpened(true);
  };

  const closeModal = () => {
    setModalOpened(false);
    setSelectedCountry(null);
  };

  const updateCountries = (updated: Country | null) => {
    if (updated !== null) {
      if (countries?.find(({ id }) => id === updated?.id)) {
        setCountries((countries) =>
          countries?.map((country) =>
            country?.id === updated?.id ? updated : country
          )
        );
      } else setCountries([...countries, updated]);
    }
  };

  const deleteCountry = (id: number) => {
    setCountries((countries) =>
      countries.filter((country) => country?.id !== id)
    );
  };

  return (
    <Loader loaded={loaded}>
      <Header
        title={t("nav.countries")}
        leftTool={
          <Button text={t("addCountry")} onClick={() => openModal(null)} />
        }
        rightTool={<Search onChange={handleSearch} />}
      />
      <table>
        <TableHeader />
        <tbody>
          {!isEmpty(countries) &&
            countries?.map((country) => (
              <TableRow
                key={country?.id}
                country={country}
                openModal={openModal}
                deleteCountry={deleteCountry}
              />
            ))}
        </tbody>
      </table>
      <Footer right={<Pagination {...pagination} />} />
      {modalOpened ? (
        <CountryModal
          close={closeModal}
          country={selectedCountry}
          updateCountries={updateCountries}
        />
      ) : null}
    </Loader>
  );
};
