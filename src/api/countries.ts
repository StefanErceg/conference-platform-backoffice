import { Response } from "../common/types";
import { Country } from "../pages/countries/types";
import { http } from "./http";

export const countries = {
  getAll(page: number, perPage: number = 15): Promise<Response<Country>> {
    return http
      .get(`/countries?page=${page}&size=${perPage}`)
      .then((res) => res.data);
  },
};
