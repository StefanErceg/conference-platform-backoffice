import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { Button } from "./Button";

interface Props {
  save: () => void;
  close: () => void;
}

export const SaveFooter: FC<Props> = ({ save, close }) => {
  const { t } = useTranslation();

  return (
    <div className="row justify_center align_center margin_10">
      <Button text={t("save")} onClick={save} className="margin_5" />
      <Button text={t("cancel")} onClick={close} className="margin_5" />
    </div>
  );
};
