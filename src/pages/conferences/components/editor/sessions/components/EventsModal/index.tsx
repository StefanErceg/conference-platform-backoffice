import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../../../../../api';
import { Button } from '../../../../../../../components/general/Button';
import { Modal } from '../../../../../../../components/general/Modal';
import { Header } from '../../../../../../../components/layout/Header';
import { Event } from '../../types';
import { SingleEventModal } from './SingleEventModal';
import { TableHeader } from './TableHeader';
import { TableRow } from './TableRow';

interface Props {
    close: () => void;
    sessionId: number;
}

export const EventsModal: FC<Props> = ({ close, sessionId }) => {
    const { t } = useTranslation();
    const [events, setEvents] = useState<Event[]>([]);
    const [singleEventModal, setSingleEventModal] = useState(false);
    const [selectedEvent, setSelectedEvent] = useState<Event | null>(null);

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

    const openSingleEventModal = (event: Event | null) => {
        setSelectedEvent(event);
        setSingleEventModal(true);
    };

    const closeSingleEventModal = () => {
        setSingleEventModal(false);
        setSelectedEvent(null);
    };

    const updateEvents = (event: Event) => {
        if (event !== null) {
            if (events?.find(({ id }) => id === event?.id)) {
                setEvents((events) => events?.map((element) => (element?.id === event?.id ? event : element)));
            } else setEvents([...events, event]);
        }
    };

    const deleteEvent = (id: number) => {
        setEvents((events) => events?.filter((event) => event?.id !== id));
    };

    return (
        <Modal
            close={close}
            size="xl"
            header={
                <Button
                    text={t('addEvent')}
                    onClick={() => {
                        openSingleEventModal(null);
                    }}
                    className="margin_left_30"
                    icon="add_circle_outline"
                />
            }
            body={
                <>
                    <table>
                        <TableHeader />
                        <tbody>
                            {events?.map((event, index) => (
                                <TableRow
                                    key={index}
                                    event={event}
                                    openSingleEventModal={openSingleEventModal}
                                    deleteEvent={deleteEvent}
                                />
                            ))}
                        </tbody>
                    </table>
                    {singleEventModal ? (
                        <SingleEventModal
                            event={selectedEvent}
                            close={closeSingleEventModal}
                            updateEvents={updateEvents}
                            sessionId={sessionId}
                        />
                    ) : null}
                </>
            }
        />
    );
};
