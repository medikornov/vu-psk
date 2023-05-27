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

export interface Customer {
    customerId?: string;
    creationTime?: string;
    userName: string;
    password: string;
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
    authZeroUserId: string;
}

export interface Order {
    orderId: string;
    customerId: string;
    creationTime: string;
    status: string;
    orderTotal: number;
}

export interface OrderItem {
    orderItemId: string;
    orderId: string;
    itemId: string;
    item: Item,
    quantity: number;
    weight: number;
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

    public async getCustomerByAuth0Id(token: string, auth0id: string) {
        return axios.get<ApiResponse<Customer>>(this.baseUrl + "/api/customers/auth0/" + auth0id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async createCustomer(token: string, customer: Customer) {
        return axios.post<ApiResponse<Customer>>(this.baseUrl + "/api/customers", customer, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async getOrders(token: string, customerId: string) {
        return axios.get<ApiResponse<Order[]>>(this.baseUrl + `/api/customers/${customerId}/orders`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async createEmptyOrder(token: string, customerId: string) {
        return axios.post<ApiResponse<Order>>(this.baseUrl + "/api/orders", { customerId, status: "Created", orderTotal: 0 }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async getOrderItems(token: string, orderId: string) {
        return axios.get<ApiResponse<OrderItem[]>>(this.baseUrl + `/api/orders/${orderId}/orderItems`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async addItemToOrder(token: string, orderId: string, itemId: string, quantity: number, weight: number) {
        return axios.post<ApiResponse<Order>>(this.baseUrl + `/api/orderItems`, { orderId, itemId, quantity, weight }, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }


}