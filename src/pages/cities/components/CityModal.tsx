import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../api';
import { Dropdown } from '../../../components/general/Dropdown';
import { Modal } from '../../../components/general/Modal';
import { SaveFooter } from '../../../components/general/SaveFooter';
import { useNotify } from '../../../hooks/useNotify';
import { Country } from '../../countries/types';
import { City } from '../types';

interface Props {
    close: () => void;
    city: City | null;
    updateCities: (city: City | null) => void;
}

export const CityModal: FC<Props> = ({ close, city = null, updateCities }) => {
    const { t } = useTranslation();
    const [name, setName] = useState(city != null ? city?.name || '' : '');
    const [countries, setCountries] = useState<Country[]>([]);
    const [selectedCountry, setSelectedCountry] = useState<number | null>(null);

    useEffect(() => {
        (async () => {
            try {
                const data = await api.countries.getAll(0, 1000);
                setCountries(data.content);
                if (city != null) {
                    setSelectedCountry(data.content.find(({ name }) => city?.countryName === name)?.id || null);
                }
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    const { success, error, warn } = useNotify();

    const save = async () => {
        if (!name || !selectedCountry) return warn(t('messages.warn.requiredFields'));
        if (city !== null) {
            try {
                const updated = await api.cities.update(city?.id, name, selectedCountry);
                updateCities(updated);
                success(t('messages.success.update', { entity: t('city'), name }));
                close();
            } catch (err) {
                console.error(err);
                error(t('messages.error.update', { entity: t('city'), name }));
            }
        } else {
            try {
                const created = await api.cities.create(name, selectedCountry);
                updateCities(created);
                success(t('messages.success.create', { entity: t('city'), name }));
                close();
            } catch (err) {
                console.error(err);
                error(t('messages.error.create', { entity: t('city'), name }));
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
            title={city == null ? t('addCity') : t('editCity')}
            body={
                <div className="column justify_start padding_10">
                    <div className="row justify_center align_center">
                        <span className="col_4 margin_10">
                            {t('name')} <span className="text_red">*</span>
                        </span>
                        <input className="col_6 margin_10" type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="row justify_center align_center">
                        <span className="col_4 margin_10">
                            {t('country')} <span className="text_red">*</span>
                        </span>
                        <div className="col_6 margin_10">
                            <Dropdown
                                items={countries}
                                selectItem={(id) => setSelectedCountry(id)}
                                selectedItem={selectedCountry}
                            />
                        </div>
                    </div>
                </div>
            }
            footer={<SaveFooter save={save} close={close} />}
        />
    );
};
