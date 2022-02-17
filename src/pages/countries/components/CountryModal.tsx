import React, { ChangeEvent, FC, useState } from "react";
import { useTranslation } from "react-i18next";
import api from "../../../api";
import { Button } from "../../../components/general/Button";
import { Modal } from "../../../components/general/Modal";
import { SaveFooter } from "../../../components/general/SaveFooter";
import { Country } from "../types";

interface Props {
  close: () => void;
  country: Country | null;
  updateCountries: (country: Country | null) => void;
}

export const CountryModal: FC<Props> = ({
  close,
  country = null,
  updateCountries,
}) => {
  const { t } = useTranslation();
  const [name, setName] = useState(country != null ? country?.name || "" : "");

  const save = async () => {
    try {
      if (!name) return;
      if (country != null) {
        const updated = await api.countries.update(country?.id, name);
        updateCountries(updated);
      } else {
        const created = await api.countries.create(name);
        updateCountries(created);
      }
      close();
    } catch (error) {
      console.error(error);
    }
  };

  const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
    const value = event?.target?.value || "";
    setName(value);
  };

  return (
    <Modal
      close={close}
      title={country == null ? t("addCountry") : t("editCountry")}
      body={
        <div className="column justify_start padding_10">
          <div className="row justify_center align_center">
            <span className="col_4 margin_10">{t("name")}</span>
            <input
              className="col_6 margin_10"
              type="text"
              value={name}
              onChange={handleNameChange}
            />
          </div>
        </div>
      }
      footer={<SaveFooter save={save} close={close} />}
    />
  );
};
