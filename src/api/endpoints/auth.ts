import { http } from '../http';

export const auth = {
    login(username: string, password: string) {
        return http.post('/login', { username, password }).then((res) => res.data);
    },
};
