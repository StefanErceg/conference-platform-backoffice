import React, { FC } from 'react';
import { useHistory } from 'react-router-dom';
import { getDate, getTime } from '../../../../common/utils';
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
    const handleDelete = () => {};
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

            <TableActions onEdit={handleEdit} onDelete={handleDelete} />
        </tr>
    );
};
