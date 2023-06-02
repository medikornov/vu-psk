import axios from "axios";

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
    phone?: string,
    address?: string;
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
    version: string;
}

export interface UploadItem {
    name: string;
    description: string;
    quantity: number;
    quantityType: QuantityType;
    price: number;
    photo: File;
    weight: number;
}

export interface UpdateItem {
    name: string;
    description: string;
    quantity: number;
    quantityType: QuantityType;
    price: number;
    photo?: File;
    weight: number;
    version: string;
    isOverride: boolean;
}

const baseUrl = process.env.FLOWERSAPI_BASEURL;

export default class FlowersApiClient {
    baseUrl: string;
    constructor() {
        this.baseUrl = baseUrl ?? "";
    }

    public async createItem(token: string, item: UploadItem) {
        return axios.post<ApiResponse<Item>>(this.baseUrl + "/api/items", item, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data; boundary=----",
            }
        });
    }

    public async getAllItems() {
        return axios.get<ApiResponse<Item[]>>(this.baseUrl + "/api/items");
    }

    public async getItem(id: string) {
        return axios.get<ApiResponse<Item>>(this.baseUrl + "/api/items/" + id);
    }

    // delete item
    public async deleteItem(token: string, id: string) {
        return axios.delete(this.baseUrl + "/api/items/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
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

    public async updateOrder(token: string, order: Order) {
        return axios.put<ApiResponse<Order>>(this.baseUrl + `/api/orders/${order.orderId}`, order, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async deleteOrder(token: string, orderId: string) {
        return axios.delete(this.baseUrl + `/api/orders/${orderId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }


    // OrderItems

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

    public async updateOrderItem(token: string, orderItem: OrderItem) {
        return axios.put(this.baseUrl + `/api/orderItems/${orderItem.orderItemId}`, orderItem, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async removeItemFromOrder(token: string, orderItemId: string) {
        return axios.delete<ApiResponse<Order>>(this.baseUrl + `/api/orderItems/${orderItemId}`, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async updateFlowerItem(token: string, itemId: string, item: UpdateItem) {
        return axios.put(this.baseUrl + `/api/items/${itemId}`, item, {
            headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "multipart/form-data; boundary=----",
            }
        });
    }

    // get all orders
    public async getAllOrders(token: string) {
        return axios.get<ApiResponse<Order[]>>(this.baseUrl + "/api/orders", {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

    public async getOrder(token: string, id: string) {
        return axios.get<ApiResponse<Order>>(this.baseUrl + "/api/orders/" + id, {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
    }

}