import React, { FC } from "react";
import api from "../../../api";
import { TableActions } from "../../../components/general/TableActions";
import { City } from "../types";

interface Props {
  city: City;
  openModal: (city: City | null) => void;
  deleteCity: (id: number) => void;
}

export const TableRow: FC<Props> = ({ city, openModal, deleteCity }) => {
  const { id, name, countryName } = city;

  const deleteHandler = async () => {
    try {
      await api.cities.delete(city?.id);
      deleteCity(id);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <tr>
      <td className="small text_center">{id}</td>
      <td>{name}</td>
      <td>{countryName}</td>
      <TableActions
        onEdit={() => {
          openModal(city);
        }}
        onDelete={deleteHandler}
      />
    </tr>
  );
};
