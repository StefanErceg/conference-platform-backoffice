import { User } from '../../common/types';
import { http } from '../http';

export const users = {
    getAll(): Promise<User[]> {
        return http.get('/users').then((res) => res.data);
    },
};
