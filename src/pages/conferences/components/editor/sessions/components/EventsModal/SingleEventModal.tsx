import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../../../../../api';
import { DropdownItem, User } from '../../../../../../../common/types';
import { Dropdown } from '../../../../../../../components/general/Dropdown';
import { Loader } from '../../../../../../../components/general/Loader';
import { Modal } from '../../../../../../../components/general/Modal';
import { SaveFooter } from '../../../../../../../components/general/SaveFooter';
import { Location } from '../../../../../../locations/types';
import { Event, EventRequest, EventType } from '../../types';

interface Props {
    event: Event | null;
    close: () => void;
    updateEvents: (event: Event) => void;
    sessionId: number;
}

export const SingleEventModal: FC<Props> = ({ event: initialEvent, close, updateEvents, sessionId }) => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [locations, setLocations] = useState<DropdownItem[]>([]);
    const [users, setUsers] = useState<DropdownItem[]>([]);
    const [eventTypes, setEventTypes] = useState<EventType[]>([]);
    const [name, setName] = useState<string>(initialEvent?.name || '');
    const [start, setStart] = useState<string>(initialEvent?.start || '');
    const [end, setEnd] = useState<string>(initialEvent?.end || '');
    const [selectedLocation, setSelectedLocation] = useState<number | null>(initialEvent?.location?.id || null);
    const [selectedUser, setSelectedUser] = useState<number | null>(initialEvent?.moderator?.id || null);
    const [selectedEventType, setSelectedEventType] = useState<number | null>(initialEvent?.eventType?.id || null);
    const [accessCode, setAccessCode] = useState<string>(initialEvent?.accessCode || '');

    useEffect(() => {
        (async () => {
            try {
                setLoaded(false);
                const { content: locations } = await api.locations.getAll(0, 1000);
                setLocations(
                    locations?.map(({ id, name, locationTypeName, city }) => ({
                        id,
                        name: `${name} ${city?.name ? `, ${city.name}` : ''} - ${locationTypeName}`,
                    }))
                );
                const users = await api.users.getAll();
                setUsers(
                    users?.map(({ id, firstName, lastName, username }) => ({
                        id,
                        name: `${firstName} ${lastName} - ${username}`,
                    }))
                );

                const { content: eventTypes } = await api.eventTypes.getAll();
                setEventTypes(eventTypes);
            } catch (error) {
                console.error(error);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement>, setter: (element: string) => void) => {
        const value = event?.target?.value;
        setter(value);
    };

    const save = async () => {
        if (!name || !start || !end || !selectedLocation || !selectedUser || !selectedEventType) return;
        try {
            const payload: EventRequest = {
                name,
                active: true,
                start,
                end,
                accessCode,
                locationId: selectedLocation,
                moderatorId: selectedUser,
                sessionId,
                eventTypeId: selectedEventType,
            };
            if (initialEvent != null) {
                const updated = await api.events.update(initialEvent?.id, payload);
                updateEvents(updated);
            } else {
                const created = await api.events.create(payload);
                updateEvents(created);
            }
            close();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            close={close}
            title={initialEvent != null ? t('editEvent') : t('addEvent')}
            size="lg"
            body={
                <Loader loaded={loaded}>
                    <div className="column justify_start padding_10">
                        <div className="row justify_start margin_left_30 align_center margin_bottom_10">
                            <span className="col_3 margin_10">{t('name')}</span>
                            <input
                                className="col_4 margin_10"
                                type="text"
                                value={name}
                                onChange={(event) => handleChange(event, setName)}
                            />
                        </div>
                        <div className="row justify_start margin_left_30 align_center">
                            <label htmlFor="start" className="col_3 margin_10">
                                {t('start')}
                            </label>
                            <input
                                type="datetime-local"
                                id="start"
                                value={
                                    start &&
                                    new Date(new Date(start).getTime() - new Date(start).getTimezoneOffset() * 60000)
                                        .toISOString()
                                        .substring(0, 19)
                                }
                                onChange={(event) => handleChange(event, setStart)}
                                min={new Date().toISOString().substring(0, 16)}
                            />
                        </div>
                        <div className="row justify_start margin_left_30 align_center margin_bottom_10">
                            <label htmlFor="end" className="col_3 margin_10">
                                {t('end')}
                            </label>
                            <input
                                type="datetime-local"
                                id="end"
                                value={
                                    end &&
                                    new Date(new Date(end).getTime() - new Date(end).getTimezoneOffset() * 60000)
                                        .toISOString()
                                        .substring(0, 19)
                                }
                                onChange={(event) => handleChange(event, setEnd)}
                                min={new Date(start).toISOString().substring(0, 16)}
                            />
                        </div>
                        <div className="row justify_start margin_left_30 align_center margin_bottom_10">
                            <span className="col_3 margin_10">{t('moderator')}</span>
                            <div className="col_4 margin_10">
                                <Dropdown
                                    items={users}
                                    selectItem={(id) => setSelectedUser(id)}
                                    selectedItem={selectedUser}
                                />
                            </div>
                        </div>
                        <div className="row justify_start margin_left_30 align_center margin_bottom_10">
                            <span className="col_3 margin_10">{t('location')}</span>
                            <div className="col_4 margin_10">
                                <Dropdown
                                    items={locations}
                                    selectItem={(id) => setSelectedLocation(id)}
                                    selectedItem={selectedLocation}
                                />
                            </div>
                        </div>
                        <div className="row justify_start margin_left_30 align_center margin_bottom_10">
                            <span className="col_3 margin_10">{t('eventType')}</span>
                            <div className="col_4 margin_10">
                                <Dropdown
                                    items={eventTypes}
                                    selectItem={(id) => setSelectedEventType(id)}
                                    selectedItem={selectedEventType}
                                />
                            </div>
                        </div>
                        <div className="row justify_start margin_left_30 align_center margin_bottom_10">
                            <span className="col_3 margin_10">{t('accessCode')}</span>
                            <input
                                className="col_4 margin_10"
                                type="text"
                                value={accessCode}
                                onChange={(event) => handleChange(event, setAccessCode)}
                            />
                        </div>
                    </div>
                </Loader>
            }
            footer={<SaveFooter save={save} close={close} />}
        />
    );
};
