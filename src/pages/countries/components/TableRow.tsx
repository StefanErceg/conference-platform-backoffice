import React, { FC } from "react";
import { TableActions } from "../../../components/general/TableActions";
import { Country } from "../types";

interface Props {
  country: Country;
}

export const TableRow: FC<Props> = ({ country: { id, name } }) => {
  return (
    <tr>
      <td className="small text_center">{id}</td>
      <td>{name}</td>
      <TableActions onEdit={() => {}} onDelete={() => {}} />
    </tr>
  );
};
