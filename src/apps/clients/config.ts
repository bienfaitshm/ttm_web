import axios from "axios";

export const ROOT_API_URL = "https://ttm.jungostudy.com";
export const COMPANY_URL = "/accounts/company/";
export const JOURNEY_URL = "/transport/journey/";
export const PASSENGER_URL = "/passenger/";
export const RESERVE_URL = "/reserve/";

export const apis = axios.create({
    baseURL : ROOT_API_URL
})