import { Session, SessionRequest } from '../../pages/conferences/components/editor/sessions/types';
import { http } from '../http';

export const sessions = {
    getByConference(conferenceId: number): Promise<Session[]> {
        return http.get(`/sessions/filter?conferenceId=${conferenceId}`).then((res) => res.data);
    },
    create(data: SessionRequest) {
        return http.post('/sessions', data).then((res) => res.data);
    },
    update(id: number, data: SessionRequest) {
        return http.put(`/sessions/${id}`, data).then((res) => res.data);
    },
    delete(id: number) {
        return http.delete(`/sessions/${id}`).then((res) => res.data);
    },
};
