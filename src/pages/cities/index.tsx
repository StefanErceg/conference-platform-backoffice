import { isEmpty } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api';
import { Button } from '../../components/general/Button';
import { Dropdown } from '../../components/general/Dropdown';
import { Loader } from '../../components/general/Loader';
import { Pagination } from '../../components/general/Pagination';
import { Search } from '../../components/general/Search';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import usePagination from '../../hooks/usePagination';
import { CityModal } from './components/CityModal';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { City } from './types';

export const Cities: FC = () => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [cities, setCities] = useState<City[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [modalOpened, setModalOpened] = useState(false);

    const { setTotal, from, total, perPage, ...pagination } = usePagination();

    const [selectedCity, setSelectedCity] = useState<City | null>(null);

    const loadCities = async () => {
        try {
            setLoaded(false);
            const data = await api.cities.getAll(from, perPage);
            setCities(data.content);
            setTotal(data.totalElements);
        } catch (error) {
            console.error(error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        loadCities();
    }, [from]);

    const handleSearch = (value: string) => {
        setSearchValue(value?.trim());
    };

    const openModal = (city: City | null) => {
        setSelectedCity(city);
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
        setSelectedCity(null);
    };

    const updateCities = (updated: City | null) => {
        if (updated !== null) {
            if (cities?.find(({ id }) => id === updated?.id)) {
                setCities((cities) => cities?.map((city) => (city?.id === updated?.id ? updated : city)));
            } else setCities([...cities, updated]);
        }
    };

    const deleteCity = (id: number) => {
        setCities((cities) => cities.filter((city) => city?.id !== id));
    };

    return (
        <Loader loaded={loaded}>
            <Header
                title={t('nav.cities')}
                leftTool={
                    <Button
                        text={t('addCity')}
                        onClick={() => {
                            openModal(null);
                        }}
                        icon="add_circle_outline"
                    />
                }
                rightTool={<Search onChange={handleSearch} />}
            />
            <table>
                <TableHeader />
                <tbody>
                    {!isEmpty(cities) &&
                        cities?.map((city) => (
                            <TableRow key={city?.id} city={city} openModal={openModal} deleteCity={deleteCity} />
                        ))}
                </tbody>
            </table>
            <Footer
                left={
                    <span>
                        {t('total')}: {total}
                    </span>
                }
                right={<Pagination {...pagination} />}
            />
            {modalOpened ? <CityModal close={closeModal} city={selectedCity} updateCities={updateCities} /> : null}
        </Loader>
    );
};
