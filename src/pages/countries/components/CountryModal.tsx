import React, { ChangeEvent, FC, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../api';
import { Button } from '../../../components/general/Button';
import { Modal } from '../../../components/general/Modal';
import { SaveFooter } from '../../../components/general/SaveFooter';
import { useNotify } from '../../../hooks/useNotify';
import { Country } from '../types';

interface Props {
    close: () => void;
    country: Country | null;
    updateCountries: (country: Country | null) => void;
}

export const CountryModal: FC<Props> = ({ close, country = null, updateCountries }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(country != null ? country?.name || '' : '');

    const { success, error, warn } = useNotify();

    const save = async () => {
        if (!name) return warn(t('messages.warn.requiredFields'));
        if (country != null) {
            try {
                const updated = await api.countries.update(country?.id, name);
                updateCountries(updated);
                success(t('messages.success.update', { entity: t('country'), name }));
                close();
            } catch (err) {
                console.error(err);
                error(t('messages.error.update', { entity: t('country'), name }));
            }
        } else {
            try {
                const created = await api.countries.create(name);
                updateCountries(created);
                success(t('messages.success.create', { entity: t('country'), name }));
                close();
            } catch (err) {
                console.error(err);
                error(t('messages.error.create', { entity: t('country'), name }));
            }
        }
    };

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const value = event?.target?.value || '';
        setName(value);
    };

    return (
        <Modal
            close={close}
            title={country == null ? t('addCountry') : t('editCountry')}
            body={
                <div className="column justify_start padding_10">
                    <div className="row justify_center align_center">
                        <span className="col_4 margin_10">
                            {t('name')}
                            <span className="text_red">*</span>
                        </span>
                        <input className="col_6 margin_10" type="text" value={name} onChange={handleNameChange} />
                    </div>
                </div>
            }
            footer={<SaveFooter save={save} close={close} />}
        />
    );
};
