import { isEmpty } from 'lodash';
import React, { ChangeEvent, FC, useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import api from '../../../../api';
import { Loader } from '../../../../components/general/Loader';
import { Header } from '../../../../components/layout/Header';
import { RatingProperty, RatingSchemaRequest } from '../../types';
import { RatingPropertyRow } from './components/RatingPropertyRow';
import { DragDropContext, Draggable, DragStart, Droppable, DropResult } from 'react-beautiful-dnd';
import { SaveFooter } from '../../../../components/general/SaveFooter';
import { useNotify } from '../../../../hooks/useNotify';

interface Props {
    id: string;
}
export const RatingSchemaEditor: FC<RouteComponentProps<Props>> = ({
    match: {
        params: { id },
    },
}) => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [ratingSchema, setRatingSchema] = useState<RatingSchemaRequest>({ name: '', properties: [] });
    const [ratingProperties, setRatingProperties] = useState<RatingProperty[]>([]);
    const [selectedSchemaPropertyId, setSelectedSchemaPropertyId] = useState<number | null>(null);
    const [selectedPropertyId, setSelectedPropertyId] = useState<number | null>(null);

    const history = useHistory();

    useEffect(() => {
        (async () => {
            try {
                setLoaded(false);
                const { content: properties } = await api.ratingProperties.getAll();
                setRatingProperties(properties.sort(({ id: idA }, { id: idB }) => idA - idB));
                if (id != null && id != 'new') {
                    const { id: schemaId, ...schemaData } = await api.ratings.getSchemaById(+id);
                    setRatingSchema(schemaData);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoaded(true);
            }
        })();
    }, [id]);

    const handleNameChange = (event: ChangeEvent<HTMLInputElement>) => {
        const name = event?.target?.value || '';
        setRatingSchema({ ...ratingSchema, name });
    };

    const handleDragStart = (initial: DragStart) => {
        const { draggableId } = initial;
        if (draggableId.startsWith('rating_schema_prop')) {
            const id = +draggableId.split('rating_schema_prop')[1];
            setSelectedSchemaPropertyId(id);
        } else setSelectedPropertyId(+draggableId);
    };

    const handleDragEnd = (result: DropResult) => {
        setSelectedSchemaPropertyId(null);
        setSelectedPropertyId(null);
        const { source, destination, draggableId } = result;
        if (!destination) return;
        if (source?.droppableId === destination?.droppableId) return;

        if (draggableId.startsWith('rating_schema_prop')) {
            const id = +draggableId.split('rating_schema_prop')[1];
            const properties = ratingSchema.properties.filter(({ id: propId }) => propId !== id);
            setRatingSchema({ ...ratingSchema, properties });
        } else {
            const id = +draggableId;
            const property = ratingProperties.find(({ id: propId }) => propId === id);
            const properties = [...ratingSchema.properties];
            properties.splice(destination.index, 0, property!);
            setRatingSchema({ ...ratingSchema, properties });
        }
    };

    const { success, error, warn } = useNotify();

    const save = async () => {
        if (!ratingSchema.name) return warn(t('messages.warn.requiredFields'));
        if (id != 'new' && id != null) {
            try {
                await api.ratings.updateSchema(+id, ratingSchema);
                success(t('messages.success.update', { entity: t('rating'), name: ratingSchema?.name }));
                history.push('/ratings');
            } catch (err) {
                console.error(err);
                error(t('messages.error.update', { entity: t('rating'), name: ratingSchema?.name }));
            }
        } else {
            try {
                await api.ratings.createSchema(ratingSchema);
                success(t('messages.success.create', { entity: t('rating'), name: ratingSchema?.name }));
                history.push('/ratings');
            } catch (err) {
                console.error(err);
                error(t('messages.error.create', { entity: t('rating'), name: ratingSchema?.name }));
            }
        }
    };

    const close = () => {
        history.push('/ratings');
    };

    const filteredRatingProperties = useMemo(() => {
        return ratingProperties.filter((property) => !ratingSchema?.properties?.find(({ id }) => property.id === id));
    }, [ratingSchema.properties, ratingProperties]);

    return (
        <DragDropContext onDragEnd={handleDragEnd} onDragStart={handleDragStart}>
            <Loader loaded={loaded}>
                <Header title={t('ratingSchemaEditor')} rightTool={<SaveFooter save={save} close={close} />} />
                <div className="col_12 row">
                    <div className="col_6 column border_right margin_10">
                        <span className="rating_properties_header">&#8203;</span>
                        <div className="row col_11 margin_10 padding_10 rating_properties_subheader ">
                            <span className="col_3 margin_10">
                                {t('ratingSchemaName')} <span className="text_red">*</span>
                            </span>
                            <input
                                className="col_4 margin_10"
                                type="text"
                                value={ratingSchema.name}
                                onChange={handleNameChange}
                            />
                        </div>
                        <Droppable droppableId="ratingProperties">
                            {(provided) => (
                                <div
                                    className="properties rating_properties_column col_12"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {!isEmpty(ratingSchema?.properties) &&
                                        ratingSchema?.properties?.map((property, index) => (
                                            <Draggable
                                                key={`rating_schema_prop${index}`}
                                                draggableId={`rating_schema_prop${property?.id}`}
                                                index={index}
                                            >
                                                {(provided) => (
                                                    <RatingPropertyRow
                                                        {...property}
                                                        provided={provided}
                                                        selectedPropertyId={selectedSchemaPropertyId}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                    {provided.placeholder}
                                </div>
                            )}
                        </Droppable>
                    </div>
                    <div className="col_6 column margin_10 align_center">
                        <span className="rating_properties_header">{t('availableProperties')}</span>
                        <div className="row col_11 margin_10 padding_10 rating_properties_subheader ">
                            <span className="col_3  margin_left_10 padding_right_10 margin_right_10">{t('name')}</span>
                            <span className="col_7  padding_right_10 margin_right_10">{t('description')}</span>
                            <span className="col_1  padding_right_10 margin_right_10 text_center">
                                {t('rangeStart')}
                            </span>
                            <span className="col_1 text_center">{t('rangeEnd')}</span>
                        </div>
                        <Droppable droppableId="properties">
                            {(provided) => (
                                <div
                                    className="properties rating_properties_column col_12"
                                    {...provided.droppableProps}
                                    ref={provided.innerRef}
                                >
                                    {!isEmpty(filteredRatingProperties) &&
                                        filteredRatingProperties?.map((property, index) => (
                                            <Draggable key={index} draggableId={`${property?.id}`} index={index}>
                                                {(provided) => (
                                                    <RatingPropertyRow
                                                        {...property}
                                                        provided={provided}
                                                        selectedPropertyId={selectedPropertyId}
                                                    />
                                                )}
                                            </Draggable>
                                        ))}
                                </div>
                            )}
                        </Droppable>
                    </div>
                </div>
            </Loader>
        </DragDropContext>
    );
};
