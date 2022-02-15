import React, { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "../../components/general/Button";
import { Loader } from "../../components/general/Loader";
import { Search } from "../../components/general/Search";
import { Header } from "../../components/layout/Header";
import { City } from "./types";

export const Cities: FC = () => {
  const { t } = useTranslation();
  const [loaded, setLoaded] = useState(false);
  const [cities, setCities] = useState<City[]>([]);
  const [searchValue, setSearchValue] = useState("");
  const [modalOpened, setModalOpened] = useState(false);

  const handleSearch = (value: string) => {
    setSearchValue(value?.trim());
  };

  return (
    <Loader loaded={loaded}>
      <Header
        title={t("nav.cities")}
        leftTool={<Button text={t("addCity")} onClick={() => {}} />}
        rightTool={<Search onChange={handleSearch} />}
      />
    </Loader>
  );
};
