import React, { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from './Button';
import { MaterialIcon } from './MaterialIcon';
import { Modal } from './Modal';

interface Props {
    onConfirm: () => void;
    onCancel: () => void;
}

export const ConfirmationModal: FC<Props> = ({ onConfirm, onCancel }) => {
    const { t } = useTranslation();
    return (
        <Modal
            close={onCancel}
            body={
                <div className="column align_center padding_top_20">
                    <MaterialIcon icon="warning_amber" size={48} color="red" />
                    <span className="margin_top_30 font_18">{t('messages.confirm')}</span>
                </div>
            }
            footer={
                <div className="row justify_center align_center margin_10">
                    <Button text={t('confirm')} onClick={onConfirm} className="margin_5 background_green" />
                    <Button text={t('cancel')} onClick={onCancel} className="margin_5 background_red" />
                </div>
            }
        />
    );
};
