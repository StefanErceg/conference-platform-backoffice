import React, { FC, useEffect, useState } from 'react';
import api from '../../../../../../../api';
import { Modal } from '../../../../../../../components/general/Modal';
import { Event } from '../../types';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface Props {
    close: () => void;
    sessionId: number;
}

export const EventsModal: FC<Props> = ({ close, sessionId }) => {
    const [events, setEvents] = useState<Event[]>([]);

    useEffect(() => {
        (async () => {
            try {
                const data = await api.events.getAll(sessionId);
                setEvents(data);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return (
        <Modal
            close={close}
            size="xl"
            body={
                <table>
                    <TableHeader />
                    <tbody>
                        {events?.map((event, index) => (
                            <TableRow key={index} event={event} />
                        ))}
                    </tbody>
                </table>
            }
        />
    );
};
