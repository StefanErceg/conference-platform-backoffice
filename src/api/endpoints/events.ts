import { Event, EventRequest } from '../../pages/conferences/components/editor/sessions/types';
import { http } from '../http';

export const events = {
    getAll(sessionId: number): Promise<Event[]> {
        return http.get(`/events/filter?sessionId=${sessionId}`).then((res) => res.data);
    },
    create(data: EventRequest): Promise<Event> {
        return http.post('/events', data).then((res) => res.data);
    },
    update(id: number, data: EventRequest): Promise<Event> {
        return http.put(`/events/${id}`, data).then((res) => res.data);
    },
    delete(id: number) {
        return http.delete(`/events/${id}`).then((res) => res.data);
    },
};
