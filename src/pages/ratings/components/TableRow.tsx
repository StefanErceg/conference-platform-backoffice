import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../api';
import { ConfirmationModal } from '../../../components/general/ConfirmationModal';
import { TableActions } from '../../../components/general/TableActions';
import { RatingSchema } from '../types';

interface Props {
    ratingSchema: RatingSchema;
    deleteSchema: (id: number) => void;
}

export const TableRow: FC<Props> = ({ ratingSchema, deleteSchema }) => {
    const { id = 0, name = '', properties = [] } = ratingSchema;

    const propertiesField = properties?.map(({ name }) => name).join(' | ');

    const history = useHistory();

    const editHandler = () => {
        history.push(`/ratings/editor/${id}`);
    };

    const [confirmModal, setConfirmModal] = useState(false);

    const deleteHandler = async () => {
        try {
            await api.ratings.deleteSchema(id);
            deleteSchema(id);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <tr>
            <td className="small text_center">{id}</td>
            <td>{name}</td>
            <td>{propertiesField}</td>
            <TableActions onEdit={editHandler} onDelete={() => setConfirmModal(true)} />
            {confirmModal ? (
                <ConfirmationModal onConfirm={deleteHandler} onCancel={() => setConfirmModal(false)} />
            ) : null}
        </tr>
    );
};
