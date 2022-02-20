import { isEmpty } from 'lodash';
import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api';
import { Loader } from '../../components/general/Loader';
import { Pagination } from '../../components/general/Pagination';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import usePagination from '../../hooks/usePagination';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { RatingSchema } from './types';

export const Ratings: FC = () => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [ratingSchemas, setRatingSchemas] = useState<RatingSchema[]>([]);
    const [searchValue, setSearchValue] = useState('');

    const { setTotal, from, total, perPage, ...pagination } = usePagination();

    const loadRatingSchemas = async () => {
        try {
            setLoaded(false);
            const data = await api.ratings.getAllSchemas(from, perPage);
            setRatingSchemas(data.content);
            setTotal(data.totalElements);
        } catch (error) {
            console.error(error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        loadRatingSchemas();
    }, [from]);

    const handleSearch = (value: string) => {
        setSearchValue(value?.trim());
    };

    const deleteSchema = (id: number) => {
        setRatingSchemas((ratingSchemas) => ratingSchemas.filter((schema) => schema?.id !== id));
    };

    return (
        <Loader loaded={loaded}>
            <Header title={t('nav.ratings')} />
            <table>
                <TableHeader />
                <tbody>
                    {!isEmpty(ratingSchemas) &&
                        ratingSchemas?.map((schema) => <TableRow ratingSchema={schema} deleteSchema={deleteSchema} />)}
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
        </Loader>
    );
};
