import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../../../../api';
import { getDate, getTime } from '../../../../../../common/utils';
import { MaterialIcon } from '../../../../../../components/general/MaterialIcon';
import { TableActions } from '../../../../../../components/general/TableActions';
import { TooltipWrapper } from '../../../../../../components/general/TooltipWrapper';
import { Session } from '../types';

interface Props {
    session: Session;
    openSessionModal: (session: Session | null) => void;
    openEventsModal: (sessionId: number) => void;
    deleteSession: (id: number) => void;
}

export const TableRow: FC<Props> = ({ session, openSessionModal, deleteSession, openEventsModal }) => {
    const { t } = useTranslation();
    const { id = 0, name = '', start = '', end = '', moderator } = session;
    const moderatorField = `${moderator?.username} - ${moderator?.firstName} ${moderator?.lastName}`;

    const handleEdit = () => {
        openSessionModal(session);
    };

    const handleDelete = async () => {
        try {
            await api.sessions.delete(id);
            deleteSession(id);
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
            <td>{moderatorField}</td>
            <td className="text_center">
                <TooltipWrapper text={t('viewEvents')}>
                    <MaterialIcon
                        icon={'event'}
                        size={24}
                        cursor="pointer"
                        hoverColor="blue"
                        onClick={() => openEventsModal(id)}
                    />
                </TooltipWrapper>
            </td>
            <TableActions onEdit={handleEdit} onDelete={handleDelete} />
        </tr>
    );
};
