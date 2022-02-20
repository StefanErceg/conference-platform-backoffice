import { isEmpty } from 'lodash';
import React, { FC, useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../api';
import { Button } from '../../components/general/Button';
import { Loader } from '../../components/general/Loader';
import { Pagination } from '../../components/general/Pagination';
import { Footer } from '../../components/layout/Footer';
import { Header } from '../../components/layout/Header';
import usePagination from '../../hooks/usePagination';
import { ResourceModal } from './components/ResourceModal';
import { TableHeader } from './components/TableHeader';
import { TableRow } from './components/TableRow';
import { Resource } from './types';

export const Resources: FC = () => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [resources, setResources] = useState<Resource[]>([]);
    const [searchValue, setSearchValue] = useState('');
    const [modalOpened, setModalOpened] = useState(false);

    const { setTotal, from, total, perPage, ...pagination } = usePagination();

    const [selectedResource, setSelectedResource] = useState<Resource | null>(null);

    const loadResources = async () => {
        try {
            setLoaded(false);
            const data = await api.resources.getAll(from, perPage);
            setResources(data.content);
            setTotal(data.totalElements);
        } catch (error) {
            console.error(error);
        } finally {
            setLoaded(true);
        }
    };

    useEffect(() => {
        loadResources();
    }, [from]);

    const handleSearch = (value: string) => {
        setSearchValue(value?.trim());
    };

    const openModal = (resource: Resource | null) => {
        setSelectedResource(resource);
        setModalOpened(true);
    };

    const closeModal = () => {
        setModalOpened(false);
        setSelectedResource(null);
    };

    const updateResources = (updated: Resource | null) => {
        if (updated !== null) {
            if (resources?.find(({ id }) => id === updated?.id)) {
                setResources((resources) =>
                    resources?.map((resource) => (resource?.id === updated?.id ? updated : resource))
                );
            } else setResources([...resources, updated]);
        }
    };

    const deleteResource = (id: number) => {
        setResources((resources) => resources.filter((resource) => resource?.id !== id));
    };

    return (
        <Loader loaded={loaded}>
            <Header
                title={t('nav.resources')}
                leftTool={<Button text={t('addResource')} onClick={() => openModal(null)} icon="add_circle_outline" />}
            />
            <table>
                <TableHeader />
                <tbody>
                    {!isEmpty(resources) &&
                        resources?.map((resource) => (
                            <TableRow
                                key={resource?.id}
                                resource={resource}
                                openModal={openModal}
                                deleteResource={deleteResource}
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
                <ResourceModal resource={selectedResource} close={closeModal} updateResources={updateResources} />
            ) : null}
        </Loader>
    );
};
