import React, { FC, useState } from 'react';
import { useHistory } from 'react-router-dom';
import api from '../../../../api';
import { getDate, getTime } from '../../../../common/utils';
import { ConfirmationModal } from '../../../../components/general/ConfirmationModal';
import { TableActions } from '../../../../components/general/TableActions';
import { Conference } from '../../types';

interface Props {
    conference: Conference;
    deleteConference: (id: number) => void;
}

export const TableRow: FC<Props> = ({ conference, deleteConference }) => {
    const { id = 0, name = '', start = '', end = '', description = '' } = conference;

    const history = useHistory();

    const handleEdit = () => {
        history.push(`conferences/editor/${id}/base`);
    };

    const [confirmModal, setConfirmModal] = useState(false);

    const deleteHandler = async () => {
        try {
            await api.conferences.delete(id);
            deleteConference(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <tr>
            <td className="small text_center">{id}</td>
            <td>{name}</td>
            <td>
                {getDate(start)} | {getTime(start)}h
            </td>
            <td>
                {getDate(end)} | {getTime(end)}h
            </td>
            <td>{description}</td>

            <TableActions onEdit={handleEdit} onDelete={() => setConfirmModal(true)} />
            {confirmModal ? (
                <ConfirmationModal onConfirm={deleteHandler} onCancel={() => setConfirmModal(false)} />
            ) : null}
        </tr>
    );
};
