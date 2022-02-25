import React, { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api';
import { Loader } from '../../components/general/Loader';
import { Pagination } from '../../components/general/Pagination';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import usePagination from '../../hooks/usePagination';
import { TableHeader } from './components/table/TableHeader';
import { TableRow } from './components/table/TableRow';
import { Conference } from './types';

export const Conferences: FC = () => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [conferences, setConferences] = useState<Conference[]>([]);

    const { setTotal, from, total, perPage, ...pagination } = usePagination();

    const loadConferences = async () => {
        try {
            setLoaded(false);
            const data = await api.conferences.getAll(from, perPage);
            setConferences(data.content);
            setTotal(data.totalElements);
        } catch (error) {
            console.error(error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        loadConferences();
    }, [from, perPage]);

    const deleteConference = (id: number) => {};

    return (
        <Loader loaded={loaded}>
            <Header title={t('nav.conferences')} />
            <table>
                <TableHeader />
                <tbody>
                    {conferences?.map((conference, index) => (
                        <TableRow key={index} conference={conference} deleteConference={deleteConference} />
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
        </Loader>
    );
};
