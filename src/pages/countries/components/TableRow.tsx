import React, { FC } from "react";
import api from "../../../api";
import { TableActions } from "../../../components/general/TableActions";
import { Country } from "../types";

interface Props {
  country: Country;
  openModal: (country: Country | null) => void;
  deleteCountry: (id: number) => void;
}

export const TableRow: FC<Props> = ({ country, openModal, deleteCountry }) => {
  const { id, name } = country;

  const deleteHandler = async () => {
    try {
      await api.countries.delete(country?.id);
      deleteCountry(id);
    } catch (err) {
      console.error(err);
    }
  };
  return (
    <tr>
      <td className="small text_center">{id}</td>
      <td>{name}</td>
      <TableActions
        onEdit={() => {
          openModal(country);
        }}
        onDelete={deleteHandler}
      />
    </tr>
  );
};
