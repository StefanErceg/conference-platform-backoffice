import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../../../../api';
import { DropdownItem, User } from '../../../../../../common/types';
import { Dropdown } from '../../../../../../components/general/Dropdown';
import { Loader } from '../../../../../../components/general/Loader';
import { Modal } from '../../../../../../components/general/Modal';
import { SaveFooter } from '../../../../../../components/general/SaveFooter';
import { Session, SessionRequest } from '../types';

interface Props {
    session: Session | null;
    close: () => void;
    updateSessions: (session: Session) => void;
    conferenceId: number;
}

export const SessionModal: FC<Props> = ({ session = null, close, updateSessions, conferenceId }) => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState(session?.name || '');
    const [start, setStart] = useState(session?.start || '');
    const [end, setEnd] = useState(session?.end || '');
    const [selectedUser, setSelectedUser] = useState(session?.moderator?.id || null);
    const [users, setUsers] = useState<DropdownItem[]>([]);

    useEffect(() => {
        (async () => {
            try {
                setLoaded(false);
                const data = await api.users.getAll();
                setUsers(data?.map(({ id, ...user }) => ({ id, name: `${user?.firstName} ${user?.lastName}` })));
            } catch (error) {
                console.error(error);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    const save = async () => {
        try {
            if (!name || !start || !end || !selectedUser) return;
            const payload: SessionRequest = {
                name,
                start,
                end,
                moderatorId: selectedUser,
                active: true,
                conferenceId,
            };
            if (session == null) {
                const created = await api.sessions.create(payload);
                updateSessions(created);
            } else {
                const updated = await api.sessions.update(session?.id, payload);
                updateSessions(updated);
            }
            close();
        } catch (error) {
            console.error(error);
        }
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>, setter: (element: string) => void) => {
        const value = event?.target?.value;
        setter(value);
    };

    return (
        <Modal
            close={close}
            size="lg"
            title={session === null ? t('addSession') : t('editSession')}
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
                    </div>
                </Loader>
            }
            footer={<SaveFooter save={save} close={close} />}
        />
    );
};
