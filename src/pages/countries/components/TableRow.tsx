import React, { FC, useState } from 'react';
import api from '../../../api';
import { ConfirmationModal } from '../../../components/general/ConfirmationModal';
import { TableActions } from '../../../components/general/TableActions';
import { Country } from '../types';

interface Props {
    country: Country;
    openModal: (country: Country | null) => void;
    deleteCountry: (id: number) => void;
}

export const TableRow: FC<Props> = ({ country, openModal, deleteCountry }) => {
    const { id, name } = country;

    const [confirmModal, setConfirmModal] = useState(false);

    const deleteHandler = async () => {
        try {
            await api.countries.delete(country?.id);
            deleteCountry(id);
        } catch (error) {
            console.error(error);
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
                onDelete={() => setConfirmModal(true)}
            />
            {confirmModal ? (
                <ConfirmationModal onConfirm={deleteHandler} onCancel={() => setConfirmModal(false)} />
            ) : null}
        </tr>
    );
};
