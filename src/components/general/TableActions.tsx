import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { MaterialIcon } from "./MaterialIcon";
import { TooltipWrapper } from "./TooltipWrapper";

interface Props {
  onEdit: () => void;
  onDelete: () => void;
}

export const TableActions: FC<Props> = ({ onEdit, onDelete }) => {
  const { t } = useTranslation();
  return (
    <td className="small text_center">
      <TooltipWrapper text={t("edit")}>
        <MaterialIcon
          icon="edit"
          size={24}
          onClick={onEdit}
          cursor="pointer"
          hoverColor="green"
        />
      </TooltipWrapper>
      <TooltipWrapper text={t("delete")}>
        <MaterialIcon
          icon="delete"
          size={24}
          onClick={onDelete}
          cursor="pointer"
          hoverColor="red"
        />
      </TooltipWrapper>
    </td>
  );
};
