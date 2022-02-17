import axios from 'axios';
import settings from '../settings.json';

export const http = axios.create({
    baseURL: settings.apiUrl,
});
