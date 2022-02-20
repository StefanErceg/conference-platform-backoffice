import { isEmpty } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api';
import { Button } from '../../components/general/Button';
import { Loader } from '../../components/general/Loader';
import { Pagination } from '../../components/general/Pagination';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import usePagination from '../../hooks/usePagination';
import { LocationModal } from './components/LocationModal';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { Location } from './types';

export const Locations: FC = () => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(true);
    const [locations, setLocations] = useState<Location[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [modalOpened, setModalOpened] = useState(false);

    const { setTotal, from, total, perPage, ...pagination } = usePagination();

    const [selectedLocation, setSelectedLocation] = useState<Location | null>(null);

    const loadLocations = async () => {
        try {
            setLoaded(false);
            const data = await api.locations.getAll(from, perPage);
            setLocations(data.content);
            setTotal(data.totalElements);
        } catch (error) {
            console.error(error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        loadLocations();
    }, [from]);

    const handleSearch = (value: string) => {
        setSearchValue(value?.trim());
    };

    const openModal = (location: Location | null) => {
        setSelectedLocation(location);
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
        setSelectedLocation(null);
    };

    const updateLocations = (updated: Location | null) => {
        if (updated !== null) {
            if (locations?.find(({ id }) => id === updated?.id)) {
                setLocations((locations) =>
                    locations?.map((location) => (location?.id === updated?.id ? updated : location))
                );
            } else setLocations([...locations, updated]);
        }
    };

    const deleteLocation = (id: number) => {
        setLocations((locations) => locations.filter((location) => location?.id !== id));
    };

    return (
        <Loader loaded={loaded}>
            <Header
                title={t('nav.locations')}
                leftTool={<Button text={t('addLocation')} onClick={() => openModal(null)} icon="add_circle_outline" />}
            />
            <table>
                <TableHeader />
                <tbody>
                    {!isEmpty(locations) &&
                        locations?.map((location) => (
                            <TableRow
                                key={location?.id}
                                location={location}
                                openModal={openModal}
                                deleteLocation={deleteLocation}
                            />
                        ))}
                </tbody>
            </table>
            <Footer
                left={
                    <span className="margin_left_25">
                        {t('total')}: {total}
                    </span>
                }
                right={<Pagination {...pagination} />}
            />
            {modalOpened ? (
                <LocationModal close={closeModal} location={selectedLocation} updateLocations={updateLocations} />
            ) : null}
        </Loader>
    );
};
