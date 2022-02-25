import { isEmpty, isNaN } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps } from 'react-router-dom';
import api from '../../../../../api';
import { Button } from '../../../../../components/general/Button';
import { Loader } from '../../../../../components/general/Loader';
import { Header } from '../../../../../components/layout/Header';
import { EventsModal } from './components/EventsModal';
import { SessionModal } from './components/SessionModal';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { Event, Session } from './types';

interface Props {
    id: string;
}

export const ConferenceSessions: FC<RouteComponentProps<Props>> = ({
    match: {
        params: { id },
    },
}) => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [sessions, setSessions] = useState<Session[]>([]);
    const [sessionModal, setSessionModal] = useState(false);
    const [eventsModal, setEventsModal] = useState(false);
    const [sessionEvents, setSessionEvents] = useState<number | null>(null);
    const [selectedSession, setSelectedSession] = useState<Session | null>(null);

    useEffect(() => {
        (async () => {
            try {
                setLoaded(false);
                const data = await api.sessions.getByConference(+id);
                setSessions(data);
            } catch (error) {
                console.error(error);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    const openSessionModal = (session: Session | null) => {
        setSelectedSession(session);
        setSessionModal(true);
    };

    const closeSessionModal = () => {
        setSessionModal(false);
        setSelectedSession(null);
    };

    const openEventsModal = (sessionId: number) => {
        setSessionEvents(sessionId);
        setEventsModal(true);
    };

    const closeEventsModal = () => {
        setEventsModal(false);
    };

    const updateSessions = (session: Session) => {
        if (session !== null) {
            if (sessions?.find(({ id }) => id === session?.id)) {
                setSessions((sessions) =>
                    sessions?.map((element) => (session?.id === element?.id ? session : element))
                );
            } else setSessions([...sessions, session]);
        }
    };

    const deleteSession = (id: number) => {
        setSessions((sessions) => sessions.filter(({ id: sessionId }) => sessionId !== id));
    };

    return (
        <Loader loaded={loaded}>
            <Header
                title={t('sessions')}
                leftTool={<Button text={t('addSession')} onClick={() => openSessionModal(null)} />}
            />
            <table>
                <TableHeader />
                <tbody>
                    {!isEmpty(sessions) &&
                        sessions?.map((session, index) => (
                            <TableRow
                                key={index}
                                session={session}
                                openSessionModal={openSessionModal}
                                openEventsModal={openEventsModal}
                                deleteSession={deleteSession}
                            />
                        ))}
                </tbody>
            </table>
            {sessionModal ? (
                <SessionModal
                    session={selectedSession}
                    close={closeSessionModal}
                    updateSessions={updateSessions}
                    conferenceId={+id}
                />
            ) : null}
            {eventsModal ? <EventsModal close={closeEventsModal} sessionId={sessionEvents || 0} /> : null}
        </Loader>
    );
};
