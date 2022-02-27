import { PaginationResponse } from '../../common/types';
import { EventType } from '../../pages/conferences/components/editor/sessions/types';
import { http } from '../http';

export const eventTypes = {
    getAll(): Promise<PaginationResponse<EventType>> {
        return http.get('/event-types').then((res) => res.data);
    },
};
