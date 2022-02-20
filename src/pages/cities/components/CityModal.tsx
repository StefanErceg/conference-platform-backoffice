import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../api';
import { Dropdown } from '../../../components/general/Dropdown';
import { Modal } from '../../../components/general/Modal';
import { SaveFooter } from '../../../components/general/SaveFooter';
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

    const save = async () => {
        try {
            if (!name || !selectedCountry) return;
            if (city !== null) {
                const updated = await api.cities.update(city?.id, name, selectedCountry);
                updateCities(updated);
            } else {
                const created = await api.cities.create(name, selectedCountry);
                updateCities(created);
            }
            close();
        } catch (error) {
            console.error(error);
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
                        <span className="col_4 margin_10">{t('name')}</span>
                        <input className="col_6 margin_10" type="text" value={name} onChange={handleNameChange} />
                    </div>
                    <div className="row justify_center align_center">
                        <span className="col_4 margin_10">{t('country')}</span>
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
