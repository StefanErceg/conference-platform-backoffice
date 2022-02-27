import React, { FC } from 'react';
import api from '../../../../../../../api';
import { getDate, getTime } from '../../../../../../../common/utils';
import { TableActions } from '../../../../../../../components/general/TableActions';
import { Event } from '../../types';

interface Props {
    event: Event;
    openSingleEventModal: (event: Event | null) => void;
    deleteEvent: (id: number) => void;
}

export const TableRow: FC<Props> = ({ event, openSingleEventModal, deleteEvent }) => {
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
    const editHandler = () => {
        openSingleEventModal(event);
    };

    const deleteHandler = async () => {
        try {
            await api.events.delete(id);
            deleteEvent(id);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <tr>
            <td className="small text_center">{id}</td>
            <td className="small text_center">{name}</td>
            <td>
                {getTime(start)} | {getDate(start)}
            </td>
            <td>
                {getTime(end)} | {getDate(end)}
            </td>
            <td>{locationField}</td>
            <td>
                {moderator?.firstName} {moderator?.lastName}
            </td>
            <td>{type}</td>
            <td className="small text_center">{accessCode}</td>
            <TableActions onEdit={editHandler} onDelete={deleteHandler} />
        </tr>
    );
};
