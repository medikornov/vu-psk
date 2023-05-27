import React from "react";
import { Header } from "../components/header/Header";
import { OrderItem } from "../clients/FlowersApiClient";
import { useQuery } from "react-query";
import { useFlowersApiClient } from "../clients/FlowersApiProvider";
import { useAuth0Token, useCurrentOrder } from "../clients/hook";
import "./CartPage.scss";

const useOrderItems = () => {
    const auth0Token = useAuth0Token();
    const flowersApiClient = useFlowersApiClient();
    const currentOrder = useCurrentOrder();

    const orderItems = useQuery(["orderItems", !!auth0Token, !!currentOrder, currentOrder?.orderId],
        () => currentOrder && auth0Token && flowersApiClient ?
            flowersApiClient?.getOrderItems(auth0Token, currentOrder.orderId).then(data => data.data) : undefined,
        { refetchOnMount: false, refetchOnWindowFocus: false }
    );
    return orderItems.data?.data ?? [];
};

const OrderItemCard = ({ orderItem }: { orderItem: OrderItem; }) => {
    return (
        <div className="flowers-cart-page-body-text">
            {orderItem.item.name}
            {orderItem.item.price}
            {orderItem.quantity}
        </div>
    );
};

export const CartPage = () => {
    const orderItems = useOrderItems();

    return (
        <div className='global'>
            <div className="flowers-cart-page">
                <Header />
                <div className="flowers-cart-page-body">
                    <div className="flowers-cart-page-body-title">
                        Cart
                    </div>
                    {
                        orderItems.map((orderItem: OrderItem) => {
                            return <OrderItemCard orderItem={orderItem} />;
                        })
                    }
                </div>
            </div>
        </div>
    );
};