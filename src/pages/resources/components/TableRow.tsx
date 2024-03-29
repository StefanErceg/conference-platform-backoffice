import React, { FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../api';
import { ConfirmationModal } from '../../../components/general/ConfirmationModal';
import { TableActions } from '../../../components/general/TableActions';
import { Resource } from '../types';

interface Props {
    resource: Resource;
    openModal: (resource: Resource | null) => void;
    deleteResource: (id: number) => void;
}

export const TableRow: FC<Props> = ({ resource, openModal, deleteResource }) => {
    const { t } = useTranslation();
    const {
        id = 0,
        name = '',
        identifier = '',
        description = '',
        resourceType: { name: type = '' },
    } = resource || {};

    const [confirmModal, setConfirmModal] = useState(false);

    const deleteHandler = async () => {
        try {
            await api.resources.delete(id);
            deleteResource(id);
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <tr>
            <td className="small text_center">{id}</td>
            <td>{name}</td>
            <td>{identifier}</td>
            <td>{description}</td>
            <td>{type}</td>
            <TableActions
                onEdit={() => {
                    openModal(resource);
                }}
                onDelete={() => setConfirmModal(true)}
            />

            {confirmModal ? (
                <ConfirmationModal onConfirm={deleteHandler} onCancel={() => setConfirmModal(false)} />
            ) : null}
        </tr>
    );
};
