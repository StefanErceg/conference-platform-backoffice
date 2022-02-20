import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../api';
import { Dropdown } from '../../../components/general/Dropdown';
import { Loader } from '../../../components/general/Loader';
import { Modal } from '../../../components/general/Modal';
import { SaveFooter } from '../../../components/general/SaveFooter';
import { City } from '../../cities/types';
import { Location, LocationRequest } from '../types';
import { locationTypes } from '../utils';

interface Props {
    close: () => void;
    location: Location | null;
    updateLocations: (location: Location | null) => void;
}

export const LocationModal: FC<Props> = ({ close, location = null, updateLocations }) => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState(location?.name || '');
    const [address, setAddress] = useState(location?.address || '');
    const [room, setRoom] = useState(location?.room || '');
    const [cities, setCities] = useState<City[]>([]);
    const [selectedCity, setSelectedCity] = useState(location?.city?.id || null);
    const [selectedLocationType, setSelectedLocationType] = useState(
        locationTypes[location?.locationTypeName || 'LIVE'].id
    );

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, setter: (element: string) => void) => {
        const value = event?.target?.value || '';
        setter(value);
    };

    useEffect(() => {
        (async () => {
            try {
                setLoaded(false);
                const { content: citiesData } = await api.cities.getAll(0, 1000);
                setCities(citiesData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    const save = async () => {
        try {
            if (!name || !address || !room) return;
            const payload: LocationRequest = {
                name,
                address,
                room,
                active: true,
                cityId: selectedCity,
                locationTypeId: selectedLocationType,
            };
            if (location !== null) {
                const updated = await api.locations.update(location.id, payload);
                updateLocations(updated);
            } else {
                const created = await api.locations.create(payload);
                updateLocations(created);
            }
            close();
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <Modal
            close={close}
            size="md"
            title={location == null ? t('addLocation') : t('editLocation')}
            body={
                <Loader loaded={loaded}>
                    <div className="column justify_start padding_10">
                        <div className="row justify_center align_center">
                            <span className="col_4 margin_10">{t('name')}</span>
                            <input
                                className="col_5 margin_10"
                                type="text"
                                value={name}
                                onChange={(event) => handleInputChange(event, setName)}
                            />
                        </div>
                        <div className="row justify_center align_center">
                            <span className="col_4 margin_10">{t('address')}</span>
                            <input
                                className="col_5 margin_10"
                                type="text"
                                value={address}
                                onChange={(event) => handleInputChange(event, setAddress)}
                            />
                        </div>
                        <div className="row justify_center align_center">
                            <span className="col_4 margin_10">{t('room')}</span>
                            <input
                                className="col_5 margin_10"
                                type="text"
                                value={room}
                                onChange={(event) => handleInputChange(event, setRoom)}
                            />
                        </div>
                        <div className="row justify_center align_center">
                            <span className="col_4 margin_10">{t('city')}</span>
                            <div className="col_5 margin_10">
                                <Dropdown
                                    items={cities}
                                    selectItem={(id) => setSelectedCity(id)}
                                    selectedItem={selectedCity}
                                />
                            </div>
                        </div>
                        <div className="row justify_center align_center">
                            <span className="col_4 margin_10">{t('type')}</span>
                            <div className="col_5 margin_10">
                                <Dropdown
                                    items={Object.values(locationTypes)}
                                    selectItem={(id) => setSelectedLocationType(id)}
                                    selectedItem={selectedLocationType}
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
