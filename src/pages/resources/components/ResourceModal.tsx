import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import api from '../../../api';
import { Button } from '../../../components/general/Button';
import { Dropdown } from '../../../components/general/Dropdown';
import { Loader } from '../../../components/general/Loader';
import { Modal } from '../../../components/general/Modal';
import { SaveFooter } from '../../../components/general/SaveFooter';
import { Resource, ResourceRequest, ResourceType } from '../types';
import { ResourceTypeModal } from './ResourceTypeModal';

interface Props {
    resource: Resource | null;
    close: () => void;
    updateResources: (resource: Resource | null) => void;
}

export const ResourceModal: FC<Props> = ({ resource = null, close, updateResources }) => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [name, setName] = useState(resource?.name || '');
    const [identifier, setIdentifier] = useState(resource?.identifier || '');
    const [description, setDescription] = useState(resource?.description || '');
    const [resourceTypeId, setResourceTypeId] = useState(resource?.resourceType?.id || null);

    const [resourceTypes, setResourceTypes] = useState<ResourceType[]>([]);
    const [newTypeModal, setNewTypeModal] = useState(false);

    useEffect(() => {
        (async () => {
            try {
                setLoaded(false);
                const { content: resourceTypesData } = await api.resourceTypes.getAll();
                setResourceTypes(resourceTypesData);
            } catch (error) {
                console.error(error);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    const handleInputChange = (event: ChangeEvent<HTMLInputElement>, setter: (element: string) => void) => {
        const value = event?.target?.value || '';
        setter(value);
    };

    const save = async () => {
        try {
            if (!name || !identifier || !description || !resourceTypeId) return;
            const payload: ResourceRequest = {
                name,
                identifier,
                description,
                resourceTypeId,
            };
            if (resource !== null) {
                const updated = await api.resources.update(resource.id, payload);
                updateResources(updated);
            } else {
                const created = await api.resources.create(payload);
                updateResources(created);
            }
            close();
        } catch (error) {
            console.error(error);
        }
    };

    const openNewTypeModal = () => {
        setNewTypeModal(true);
    };

    const closeNewTypeModal = () => {
        setNewTypeModal(false);
    };

    const updateResourceTypes = (newType: ResourceType) => {
        setResourceTypes((resourceTypes) => [...resourceTypes, newType]);
    };

    return (
        <Modal
            close={close}
            size="lg"
            title={resource === null ? t('addResource') : t('editResource')}
            body={
                <Loader loaded={loaded}>
                    <div className="column justify_start padding_10"></div>
                    <div className="row justify_start margin_left_30 align_center">
                        <span className="col_3 margin_10">{t('name')}</span>
                        <input
                            className="col_4 margin_10"
                            type="text"
                            value={name}
                            onChange={(event) => handleInputChange(event, setName)}
                        />
                    </div>
                    <div className="row justify_start margin_left_30 align_center">
                        <span className="col_3 margin_10">{t('identifier')}</span>
                        <input
                            className="col_4 margin_10"
                            type="text"
                            value={identifier}
                            onChange={(event) => handleInputChange(event, setIdentifier)}
                        />
                    </div>
                    <div className="row justify_start margin_left_30 align_center">
                        <span className="col_3 margin_10">{t('description')}</span>
                        <input
                            className="col_4 margin_10"
                            type="text"
                            value={description}
                            onChange={(event) => handleInputChange(event, setDescription)}
                        />
                    </div>
                    <div className="row justify_start margin_left_30 align_center">
                        <span className="col_3 margin_10">{t('type')}</span>
                        <div className="col_4 margin_10">
                            <Dropdown
                                items={resourceTypes}
                                selectItem={(id) => setResourceTypeId(id)}
                                selectedItem={resourceTypeId}
                            />
                        </div>
                        <div className="col_2 margin_10">
                            <Button text={t('create')} onClick={openNewTypeModal} icon="add_circle_outline" />
                        </div>
                    </div>
                    {newTypeModal ? (
                        <ResourceTypeModal close={closeNewTypeModal} updateResourceTypes={updateResourceTypes} />
                    ) : null}
                </Loader>
            }
            footer={<SaveFooter save={save} close={close} />}
        />
    );
};
