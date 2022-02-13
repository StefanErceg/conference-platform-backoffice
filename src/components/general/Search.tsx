import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { MaterialIcon } from "./MaterialIcon";

interface Props {
  onChange: (value: string) => void;
}

export const Search: FC<Props> = ({ onChange = () => {} }) => {
  const { t } = useTranslation();
  return (
    <div className="search">
      <MaterialIcon icon="search" size={22} />
      <input
        className="search_field"
        type="text"
        name="search"
        required={false}
        placeholder={`${t("search")}`}
        onChange={({ target: { value } }) => onChange(value)}
      />
    </div>
  );
};
