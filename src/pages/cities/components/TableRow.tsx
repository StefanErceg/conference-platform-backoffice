import React, { FC, useState } from 'react';
import api from '../../../api';
import { ConfirmationModal } from '../../../components/general/ConfirmationModal';
import { TableActions } from '../../../components/general/TableActions';
import { City } from '../types';

interface Props {
    city: City;
    openModal: (city: City | null) => void;
    deleteCity: (id: number) => void;
}

export const TableRow: FC<Props> = ({ city, openModal, deleteCity }) => {
    const { id, name, countryName } = city;

    const [confirmModal, setConfirmModal] = useState(false);

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
                onDelete={() => setConfirmModal(true)}
            />
            {confirmModal ? (
                <ConfirmationModal onConfirm={deleteHandler} onCancel={() => setConfirmModal(false)} />
            ) : null}
        </tr>
    );
};
