import React from "react";
import { Header } from "../components/header/Header";
import { OrderItem } from "../clients/FlowersApiClient";
import { useQuery } from "react-query";
import { useFlowersApiClient } from "../clients/FlowersApiProvider";
import { useAuth0Token, useCurrentOrder } from "../clients/hook";
import "./CartPage.scss";
import { Button } from "../components/buttons/Button";

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
            <div className="flowers-cart-page-body-img">
            <img
                src={`data:${orderItem.item.photoContentType};base64,${orderItem.item.photoContent}`}
                alt={orderItem.item.photoName}
                />
            </div>
            {orderItem.item.name}
            <div className="flowers-cart-page-body-price">
                {orderItem.item.price + "$"}
            </div>
            <div className="flowers-cart-page-body-quantity">
                {"x"+orderItem.quantity}
            </div>
            <Button text="x" className ="btn-delete-order-item"/>
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
                <div className="buttons-container">
                    <Button text={"Cancel"} className="btn-add-to-cart" />
                    <Button text={"Order"} className="btn-add-to-cart" />
                </div>
            </div>
        </div>
    );
};