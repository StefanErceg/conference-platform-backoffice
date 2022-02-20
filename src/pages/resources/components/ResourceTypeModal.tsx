import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../api';
import { Modal } from '../../../components/general/Modal';
import { SaveFooter } from '../../../components/general/SaveFooter';
import { ResourceType } from '../types';

interface Props {
    close: () => void;
    updateResourceTypes: (type: ResourceType) => void;
}

export const ResourceTypeModal: FC<Props> = ({ close, updateResourceTypes }) => {
    const { t } = useTranslation();

    const [name, setName] = useState('');

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event?.target?.value || '';
        setName(value);
    };

    const save = async () => {
        if (!name) return;
        try {
            const created = await api.resourceTypes.create(name);
            updateResourceTypes(created);
            close();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Modal
            close={close}
            title={t('addResourceType')}
            body={
                <div className="column justify_start padding_10">
                    <div className="row justify_center align_center margin_20">
                        <span className="col_4 margin_10">{t('name')}</span>
                        <input className="col_6 margin_10" type="text" value={name} onChange={handleNameChange} />
                    </div>
                </div>
            }
            footer={<SaveFooter close={close} save={save} />}
        />
    );
};
