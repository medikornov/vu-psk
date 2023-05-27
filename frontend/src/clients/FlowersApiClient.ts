import axios, { AxiosResponse } from "axios";

export type QuantityType = "Gram" | "Kilo";

export interface ApiResponse<T> {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: T;
    succeeded: boolean,
    errors: any,
    message: string;
}

export interface Item {
    itemId: string;
    name: string;
    description: string;
    quantity: number;
    quantityType: QuantityType;
    price: number;
    photoContent: string;
    photoName: string;
    photoContentType: string;
    weight: number;
}

const baseUrl = process.env.FLOWERSAPI_BASEURL;

export default class FlowersApiClient {
    baseUrl: string;
    constructor() {
        this.baseUrl = baseUrl ?? "";
    }

    public async getAllItems() {
        return axios.get<ApiResponse<Item[]>>(this.baseUrl + "/api/items");
    }

    public async getItem(id: string) {
        return axios.get<ApiResponse<Item>>(this.baseUrl + "/api/items/" + id);
    }
}