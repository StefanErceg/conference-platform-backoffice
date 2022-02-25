import React, { FC } from 'react';
import { TableActions } from '../../../../../../../components/general/TableActions';
import { Event } from '../../types';

interface Props {
    event: Event;
}

export const TableRow: FC<Props> = ({ event }) => {
    const {
        id,
        name,
        start,
        end,
        location,
        moderator,
        eventType: { name: type },
        accessCode,
    } = event;

    const locationField = `${location?.name} ${location?.city?.name || ''} ${location?.city?.countryName || ''}`;
    const editHandler = () => {};

    const deleteHandler = () => {};

    return (
        <tr>
            <td className="small text_center">{id}</td>
            <td className="small text_center">{name}</td>
            <td>{start}</td>
            <td>{end}</td>
            <td>{locationField}</td>
            <td>
                {moderator?.firstName} {moderator?.lastName}
            </td>
            <td>{type}</td>
            <td>{accessCode}</td>
            <TableActions onEdit={editHandler} onDelete={deleteHandler} />
        </tr>
    );
};
