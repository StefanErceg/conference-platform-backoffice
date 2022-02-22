import { PaginationResponse } from '../../common/types';
import { RatingProperty } from '../../pages/ratings/types';
import { http } from '../http';

export const ratingProperties = {
    getAll(page: number = 0, perPage: number = 1000): Promise<PaginationResponse<RatingProperty>> {
        return http.get(`/rating-properties?page=${page}&size=${perPage}`).then((res) => res.data);
    },
};
