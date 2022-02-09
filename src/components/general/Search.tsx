import React, { FC } from "react";
import { useTranslation } from "react-i18next";

interface Props {}

export const Search: FC = () => {
  const { t } = useTranslation();
  return (
    <div className="search">
      <span className="material-icons md-22 icon">search</span>
      <input
        className="search_field"
        type="text"
        name="search"
        required={false}
        placeholder={`${t("search")}`}
      />
    </div>
  );
};
