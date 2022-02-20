import { PaginationResponse } from '../../common/types';
import { PaginationData } from '../../hooks/usePagination';
import { ResourceType } from '../../pages/resources/types';
import { http } from '../http';

export const resourceTypes = {
    getAll(): Promise<PaginationResponse<ResourceType>> {
        return http.get('/resource-types').then((res) => res.data);
    },
};
