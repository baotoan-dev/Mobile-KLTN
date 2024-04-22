import { CONST_API_V1 } from "../contants/urlContant";
import axiosConfig from "../../config/axiosConfig";

export const searchApi = {
    getSearchByQueryV2: async (
        q,
        page,
        money_type,
        is_working_weekend,
        is_remotely,
        only_company,
        salary_min,
        salary_max,
        start_date,
        end_date,
        jobTypeId,
        category_ids,
        district_ids,
        salary_type,
        lang,
    ) => {
        const URL =
            `${CONST_API_V1}/api/v2/search?` +
            `${q !== null ? `q=${q}` : ``}` +
            `${page ? `&page=${page}` : ``}` +
            `${salary_min ? `&salary_min=${salary_min}` : ``}` +
            `${salary_max ? `&salary_max=${salary_max}` : ``}` +
            `${salary_type ? `&salary_type=${[salary_type]}` : ``}` +
            `${money_type ? `&money_type=${money_type}` : ``}` +
            `${is_working_weekend ? `&is_working_weekend=${is_working_weekend}` : ``
            }` +
            `${is_remotely ? `&is_remotely=${is_remotely}` : ``}` +
            `${only_company ? `&only_company=${only_company}` : ``}` +
            `${start_date ? `&start_date=${start_date}` : ``}` +
            `${end_date ? `&end_date=${end_date}` : ``}` +
            `${jobTypeId.length > 0 ? `&jobTypeId=${jobTypeId}` : ``}` +
            `${district_ids != null
                ? `${district_ids.length > 0
                    ? `&${district_ids
                        ?.map((n, index) => `district_ids[${index}]=${n}`)
                        .join('&')}`
                    : `&district_ids`
                }`
                : ''
            }` +
            `${category_ids != null
                ? `${category_ids.length > 0
                    ? `&${category_ids
                        ?.map((n, index) => `category_ids[${index}]=${n}`)
                        .join('&')}`
                    : `&category_ids`
                }`
                : ''
            }` +
            `${lang ? `&lang=${lang}` : 'vi'}`;

        return await axiosConfig.get(URL);
    },
}