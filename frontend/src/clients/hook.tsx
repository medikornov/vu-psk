import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { useFlowersApiClient } from "./FlowersApiProvider";
import { useEffect, useMemo, useState } from "react";
import { Order, OrderItem } from "./FlowersApiClient";

export const useAuth0Token = () => {
    const auth0 = useAuth0();
    const token = useQuery(["auth0Token", auth0], () => auth0.isAuthenticated ? auth0.getAccessTokenSilently() : undefined);
    return token.data;
};

export const useItems = () => {
    const flowersApiClient = useFlowersApiClient();
    const items = useQuery(['items', !!flowersApiClient], () => flowersApiClient?.getAllItems().then(response => response.data),
        {
            suspense: true,
        });
    return items.data?.data || [];
};

export const useItem = (id?: string) => {
    const flowersApiClient = useFlowersApiClient();
    const item = useQuery(
        ['item', !!flowersApiClient, id],
        () => id ? flowersApiClient?.getItem(id).then(response => response.data.data) : undefined
    );
    return item.data;
};

export const useCustomer = () => {
    const token = useAuth0Token();
    const auth0 = useAuth0();
    const flowersApiClient = useFlowersApiClient();
    const customer = useQuery(
        ['customer', !!flowersApiClient, token, auth0?.user?.sub],
        () => token && flowersApiClient && auth0.isAuthenticated && auth0?.user?.sub
            ? flowersApiClient.getCustomerByAuth0Id(token, auth0.user.sub).then(response => response.data.data)
            : undefined,
        {
            cacheTime: Infinity,
            retry: false
        }
    );
    return customer.data;
};

export const useOrders = () => {
    const token = useAuth0Token();
    const customer = useCustomer();
    const flowersApiClient = useFlowersApiClient();
    const orders = useQuery(
        ['orders', !!flowersApiClient, token, customer?.customerId],
        () => token && flowersApiClient && customer?.customerId
            ? flowersApiClient.getOrders(token, customer.customerId).then(response => response.data.data)
            : undefined,
        {
            cacheTime: Infinity,
            retry: false,
            refetchOnWindowFocus: false,
            refetchOnMount: false
        }
    );
    return orders;
};

type CreationState = "NOT_CREATED" | "CREATING" | "CREATED";

export const useCurrentOrder = () => {
    const token = useAuth0Token();
    const customer = useCustomer();
    const flowersApiClient = useFlowersApiClient();
    const orders = useOrders();
    const [orderState, setOrderState] = useState<CreationState>("CREATED");

    const currentOrder = useMemo(() => {
        if (orders.data) {
            const currentOrder = orders.data.find(order => order.status === "Created");
            if (currentOrder) {
                return currentOrder;
            } else {
                setOrderState("NOT_CREATED");
            }
        }
        return undefined;
    }, [orders.data]);

    useEffect(() => {
        if (orderState == "NOT_CREATED" && orders.isFetched && token && flowersApiClient && customer?.customerId && !currentOrder) {
            setOrderState("CREATING");
            flowersApiClient.createEmptyOrder(token, customer.customerId).then(() => {
                console.log("Order created");
                setOrderState("CREATED");
                orders.refetch();
            });
        }
    }, [currentOrder, orderState, orders.isFetched]);

    return currentOrder;
};

export const useMyOrders = () => {
    // get only succeded orders
    const orders = useOrders();
    return orders.data ?? [];
};

export const useCustomerCreation = () => {
    const token = useAuth0Token();
    const auth0 = useAuth0();
    const flowersApiClient = useFlowersApiClient();

    const [userState, setUserState] = useState<CreationState>("NOT_CREATED");

    useEffect(() => {
        if (userState == "NOT_CREATED" && token && flowersApiClient && auth0.isAuthenticated && auth0?.user?.sub) {
            setUserState("CREATING");
            flowersApiClient.getCustomerByAuth0Id(token, auth0.user.sub)
                .then(() => { setUserState("CREATED"); })
                .catch(error => {
                    if (error.response.status === 404 && error.response.data.Succeeded === false) {
                        console.log("User not created yet, creating...");
                        flowersApiClient.createCustomer(token, {
                            userName: auth0.user!.nickname ?? '',
                            password: "",
                            firstName: auth0.user!.given_name ?? '',
                            lastName: "",
                            email: auth0.user!.email!,
                            phone: auth0.user!.phone_number ?? '',
                            address: auth0.user!.address ?? '',
                            authZeroUserId: auth0.user!.sub!
                        })
                            .then(() => {
                                console.log("User created successfully.");
                                setUserState("CREATED");
                            });
                    }
                });
        }
    }, [userState, token, flowersApiClient, auth0]);
};

export const useOrderItemsQuery = () => {
    const auth0Token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();
    const currentOrder = useCurrentOrder();

    return useQuery(["orderItems", !!auth0Token, !!currentOrder, currentOrder?.orderId],
        () => currentOrder && auth0Token && flowersApiClient ?
            flowersApiClient?.getOrderItems(auth0Token, currentOrder.orderId).then(data => data.data) : undefined,
        { refetchOnMount: false, refetchOnWindowFocus: false, suspense: true }
    );
};

export const useOrderItems = () => {
    const orderItems = useOrderItemsQuery();
    return orderItems.data?.data ?? [];
};

export const useDeleteOrderItem = () => {
    const token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();
    const orderItemsQuery = useOrderItemsQuery();
    return useMutation({
        mutationFn: (orderItemId: string) => token && flowersApiClient ?
            flowersApiClient.removeItemFromOrder(token, orderItemId) : Promise.reject("No client"),
        onSuccess: () => {
            orderItemsQuery.refetch();
        }
    });
};

export const useUpdateOrderItem = () => {
    const token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();
    const orderItemsQuery = useOrderItemsQuery();
    return useMutation({
        mutationFn: (orderItem: OrderItem) => token && flowersApiClient ?
            flowersApiClient.updateOrderItem(token, orderItem) : Promise.reject("No client"),
        onSuccess: () => {
            //orderItemsQuery.refetch();
        }
    });
};

export const useDeleteOrder = () => {
    const token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();
    return useMutation({
        mutationFn: (orderId: string) => token && flowersApiClient ?
            flowersApiClient.deleteOrder(token, orderId) : Promise.reject("No client"),
    });
};

export const useUpdateOrder = () => {
    const token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();
    return useMutation({
        mutationFn: (order: Order) => token && flowersApiClient ?
            flowersApiClient.updateOrder(token, order) : Promise.reject("No client"),
    });
};