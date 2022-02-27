import React, { ChangeEvent, FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { RouteComponentProps, useHistory } from 'react-router-dom';
import api from '../../../../../api';
import { Button } from '../../../../../components/general/Button';
import { Dropdown } from '../../../../../components/general/Dropdown';
import { Loader } from '../../../../../components/general/Loader';
import { Footer } from '../../../../../components/layout/Footer';
import { Header } from '../../../../../components/layout/Header';
import { useNotify } from '../../../../../hooks/useNotify';
import { RatingSchema } from '../../../../ratings/types';
import { ConferenceRequest } from '../../../types';

interface Props {
    id: string;
}

export const ConferenceBaseData: FC<RouteComponentProps<Props>> = ({
    match: {
        params: { id },
    },
}) => {
    const { t } = useTranslation();
    const [loaded, setLoaded] = useState(false);
    const [ratingSchemas, setRatingSchemas] = useState<RatingSchema[]>([]);
    // const [selectedRatingSchema, setSelectedRatingSchema] = useState<number | null>(null);

    const [conference, setConference] = useState<ConferenceRequest>({
        name: '',
        start: '',
        end: '',
        description: '',
        visitorRatingSchemaId: 0,
    });
    useEffect(() => {
        (async () => {
            try {
                const { content: ratingSchemaData } = await api.ratings.getAllSchemas(0, 1000);
                setRatingSchemas(ratingSchemaData);
                if (id != null && id != 'new') {
                    const data = await api.conferences.getById(+id);
                    setConference(data);
                }
            } catch (error) {
                console.error(error);
            } finally {
                setLoaded(true);
            }
        })();
    }, []);

    const handleChange = (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, field: string) => {
        const value = event?.target?.value;
        setConference({ ...conference, [field]: value });
    };

    const history = useHistory();

    const goBack = () => {
        history.push('/conferences');
    };

    const { warn } = useNotify();

    const goNext = async () => {
        if (!conference.name || !conference.start || !conference.end || !conference.visitorRatingSchemaId)
            return warn(t('messages.warn.requiredFields'));
        try {
            if (id != null && id != 'new') {
                await api.conferences.update(+id, conference);
                history.push(`/conferences/editor/${id}/sessions`);
            } else {
                const created = await api.conferences.create(conference);
                history.push(`/conferences/editor/${created?.id}/sessions`);
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Loader loaded={loaded}>
            <Header title={t('conferenceEditor')} leftTool={<span>{t('info')}</span>} />
            <div className="col_11 margin_30">
                <div className="row col_5 margin_bottom_30">
                    <label htmlFor="name" className="col_4">
                        {t('name')} <span className="text_red">*</span>
                    </label>
                    <input
                        type="text"
                        id="name"
                        value={conference.name}
                        onChange={(event) => handleChange(event, 'name')}
                    />
                </div>
                <div className="row col_5 margin_bottom_30">
                    <label htmlFor="start" className="col_4">
                        {t('start')} <span className="text_red">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        id="start"
                        value={
                            conference?.start &&
                            new Date(
                                new Date(conference.start).getTime() -
                                    new Date(conference.start).getTimezoneOffset() * 60000
                            )
                                .toISOString()
                                .substring(0, 19)
                        }
                        onChange={(event) => handleChange(event, 'start')}
                        min={new Date().toISOString().substring(0, 16)}
                    />
                </div>
                <div className="row col_5 margin_bottom_30">
                    <label htmlFor="end" className="col_4">
                        {t('end')} <span className="text_red">*</span>
                    </label>
                    <input
                        type="datetime-local"
                        id="end"
                        value={
                            conference?.end &&
                            new Date(
                                new Date(conference.end).getTime() -
                                    new Date(conference.end).getTimezoneOffset() * 60000
                            )
                                .toISOString()
                                .substring(0, 19)
                        }
                        onChange={(event) => handleChange(event, 'end')}
                        min={conference?.start && new Date(conference?.start).toISOString().substring(0, 16)}
                    />
                </div>
                <div className="row col_5 margin_bottom_30">
                    <span className="col_4 ">
                        {t('ratingSchema')} <span className="text_red">*</span>
                    </span>
                    <div>
                        <Dropdown
                            items={ratingSchemas}
                            selectItem={(id) => setConference({ ...conference, visitorRatingSchemaId: id })}
                            selectedItem={conference.visitorRatingSchemaId}
                        />
                    </div>
                </div>

                <div className="row col_5 margin_bottom_30">
                    <label htmlFor="description" className="col_4">
                        {t('description')}
                    </label>
                    <textarea
                        id="description"
                        value={conference.description}
                        onChange={(event) => handleChange(event, 'description')}
                    />
                </div>
            </div>
            <Footer
                left={<Button text={t('previous')} onClick={goBack} />}
                right={<Button text={t('next')} onClick={goNext} />}
            />
        </Loader>
    );
};
