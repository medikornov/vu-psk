import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQuery } from "react-query";
import { useFlowersApiClient } from "./FlowersApiProvider";
import { useEffect, useMemo, useState } from "react";
import { Item, Order, OrderItem, UpdateItem, UploadItem } from "./FlowersApiClient";
import { useNavigate } from "react-router-dom";

export const useAuth0Token = () => {
    const auth0 = useAuth0();
    const token = useQuery(["auth0Token", auth0], () => auth0.isAuthenticated ? auth0.getAccessTokenSilently() : undefined);
    return token.data;
};

const useItemsQuery = (suspense = true) => {
    const flowersApiClient = useFlowersApiClient();
    return useQuery(['items', !!flowersApiClient], () => flowersApiClient?.getAllItems().then(response => response.data),
        {
            suspense: suspense,
            refetchOnMount: false,
        });
};

export const useItems = () => {
    const items = useItemsQuery();
    return items.data?.data || [];
};

const useItemQuery = (id?: string) => {
    const flowersApiClient = useFlowersApiClient();
    return useQuery(
        ['item', !!flowersApiClient, id],
        () => id ? flowersApiClient?.getItem(id).then(response => response.data.data) : undefined,
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false
        }
    );
};

export const useItem = (id?: string) => {
    const item = useItemQuery(id);
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
            retry: false,
            enabled: !!token && !!flowersApiClient && !!auth0?.user?.sub
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
            refetchOnMount: false,
            enabled: !!token && !!flowersApiClient && !!customer?.customerId,
            keepPreviousData: false
        }
    );
    return orders;
};

type CreationState = "NOT_CREATED" | "CREATING" | "CREATED";

export const useOrderCreation = () => {
    const token = useAuth0Token();
    const customer = useCustomer();
    const flowersApiClient = useFlowersApiClient();
    const orders = useOrders();

    return useQuery(['orderCreation', !!flowersApiClient, token, customer?.customerId, orders.data],
        () => flowersApiClient && token && customer
            ? flowersApiClient.createEmptyOrder(token, customer!.customerId!)
            : Promise.reject("Not authenticated"),
        {
            onSuccess: () => {
                orders.refetch();
            },
            enabled: false
        }
    );
};

export const useCurrentOrder = () => {
    const orders = useOrders();
    const createEmptyOrder = useOrderCreation();
    const currentOrder = useMemo(() => {
        if (orders.data) {
            const currentOrder = orders.data.find(order => order.status === "Created");
            if (currentOrder) {
                return currentOrder;
            }
        }
        return undefined;
    }, [orders.data]);

    useEffect(() => {
        if (orders.isSuccess && !orders.isLoading && !orders.isFetching && !currentOrder && !createEmptyOrder.isLoading && !createEmptyOrder.isRefetching) {
            createEmptyOrder.refetch();
        }
    }, [orders.isSuccess, createEmptyOrder, currentOrder]);

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

export const useOrderItemsQuery = (suspense = true) => {
    const auth0Token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();
    const currentOrder = useCurrentOrder();

    return useQuery(
        ["orderItems", !!auth0Token, currentOrder?.orderId],
        () => flowersApiClient?.getOrderItems(auth0Token!, currentOrder!.orderId).then(data => data.data),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            suspense: suspense,
            enabled: !!currentOrder && !!auth0Token && !!flowersApiClient
        }
    );
};

export const useOrderItemsById = (id?: string, suspense = false) => {
    const auth0Token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();

    return useQuery(
        ["orderItems", !!auth0Token, id],
        () => flowersApiClient?.getOrderItems(auth0Token!, id!).then(data => data.data),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            suspense: suspense,
            enabled: !!id && !!auth0Token && !!flowersApiClient
        }
    );
};

export const useOrderItems = (suspesne = true) => {
    const orderItems = useOrderItemsQuery(suspesne);
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
    const orders = useOrders();
    return useMutation({
        mutationFn: (order: Order) => token && flowersApiClient ?
            flowersApiClient.updateOrder(token, order).then(() => orders.refetch()) : Promise.reject("No client"),
    });
};

export const useCreateItem = () => {
    const flowersApiClient = useFlowersApiClient();
    const auth0Token = useAuth0Token();
    const itemsQuery = useItemsQuery(false);
    const navigate = useNavigate();
    return useMutation({
        mutationFn: (item: UploadItem) => flowersApiClient && auth0Token ?
            flowersApiClient.createItem(auth0Token, item).then(
                (data) => {
                    itemsQuery.refetch();
                    navigate(`/flowers/${data.data.data.itemId}`);
                }
            ) : Promise.reject("No client"),
    });
};

export const useUpdateItem = (id: string) => {
    const flowersApiClient = useFlowersApiClient();
    const auth0Token = useAuth0Token();
    const itemQuery = useItemQuery(id);
    return useMutation({
        mutationFn: (item: UpdateItem) => flowersApiClient && auth0Token ?
            flowersApiClient.updateFlowerItem(auth0Token, id, item).then(() => {
                itemQuery.refetch();
            }) : Promise.reject("No client")
    });
};

export const useAllOrders = () => {
    const token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();
    const query = useQuery(
        ["allOrders", !!token],
        () => flowersApiClient?.getAllOrders(token!).then(data => data.data),
        {
            refetchOnMount: false,
            refetchOnWindowFocus: false,
            enabled: !!token && !!flowersApiClient
        }
    );
    return query.data?.data ?? [];
};

export const useDeleteItem = () => {
    const flowersApiClient = useFlowersApiClient();
    const auth0Token = useAuth0Token();
    const itemsQuery = useItemsQuery(false);
    return useMutation({
        mutationFn: (itemId: string) => flowersApiClient && auth0Token ?
            flowersApiClient.deleteItem(auth0Token, itemId).then(() => {
                itemsQuery.refetch();
            }) : Promise.reject("No client")
    });
};

export const useOrderById = (id?: string) => {
    const flowersApiClient = useFlowersApiClient();
    const auth0Token = useAuth0Token();
    const query = useQuery(["order", id], () =>
        flowersApiClient!.getOrder(auth0Token!, id!),
        {
            enabled: !!flowersApiClient && !!auth0Token && !!id,
        }
    )
    return query.data?.data.data
}