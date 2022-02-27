import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import api from '../../api';
import { Button } from '../../components/general/Button';
import { MaterialIcon } from '../../components/general/MaterialIcon';
import { TooltipWrapper } from '../../components/general/TooltipWrapper';
import { useNotify } from '../../hooks/useNotify';

export const Login = () => {
    const { t } = useTranslation();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [passwordShown, setPasswordShown] = useState(false);
    const [errorText, setErrorText] = useState(false);

    const history = useHistory();

    const { warn } = useNotify();

    const login = async () => {
        if (!username || !password) return warn(t('messages.warn.requiredCredentials'));
        try {
            const { token } = await api.auth.login(username, password);
            window.localStorage.setItem('token', token);
            history.push('/conferences');
        } catch (err) {
            console.error(err);
            setErrorText(true);
        }
    };

    const togglePasswordShown = () => {
        setPasswordShown(!passwordShown);
    };

    return (
        <div className="login_wrap">
            <div className="login_form padding_20">
                <div className="title column justify_center align_center">
                    <MaterialIcon icon="groups" size={48} />
                    <span className="text">{t('title')}</span>
                </div>
                <div className="column justify_center align_center">
                    <span className="col_8 margin_5 font_14">{t('username')}</span>
                    <input
                        className="col_8 margin_5"
                        type="text"
                        value={username}
                        onChange={(event) => setUsername(event?.target?.value)}
                        autoFocus
                    />
                </div>
                <div className="column justify_center align_center margin_bottom_30">
                    <span className="col_8 margin_5 font_14">{t('password')}</span>
                    <div className="row col_9 margin_10 align_center">
                        <input
                            className="col_12"
                            type={passwordShown ? 'text' : 'password'}
                            value={password}
                            onChange={(event) => {
                                setPassword(event.target.value);
                            }}
                        />
                        <MaterialIcon
                            icon={`${passwordShown ? 'visibility_off' : 'visibility'}`}
                            className="show_password"
                            cursor="pointer"
                            onClick={togglePasswordShown}
                        />
                    </div>
                </div>

                <Button text={t('login')} onClick={login} />
                {errorText ? <span className="font_14 text_red margin_top_20">username or password wrong</span> : null}
            </div>
        </div>
    );
};
