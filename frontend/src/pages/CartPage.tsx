import React, { Suspense, useState } from "react";
import { Header } from "../components/header/Header";
import { OrderItem } from "../clients/FlowersApiClient";
import { useCurrentOrder, useDeleteOrder, useDeleteOrderItem, useOrderItems, useOrderItemsQuery, useUpdateOrderItem } from "../clients/hook";
import "./CartPage.scss";
import { Button } from "../components/buttons/Button";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const OrderItemCard = ({ orderItem: initialOrderItem }: { orderItem: OrderItem; }) => {
    const deleteOrderItem = useDeleteOrderItem();

    const [orderItem, setOrderItem] = useState<OrderItem>(initialOrderItem);
    const updateOrder = useUpdateOrderItem();
    const navigate = useNavigate();
    const orderItemsQuery = useOrderItemsQuery();

    const changeQuantity = (inc: boolean) => {
        if (orderItem.quantity === 0 && !inc && deleteOrderItem.isLoading)
            return;
        if (inc) {
            const newItem: OrderItem = { ...orderItem, quantity: orderItem.quantity + 1 };
            setOrderItem(newItem);
            updateOrder.mutate(newItem, {
                onSuccess: () => orderItemsQuery.refetch()
            });
        } else {
            const newItem: OrderItem = { ...orderItem, quantity: orderItem.quantity - 1 };
            setOrderItem(newItem);
            updateOrder.mutate(newItem, {
                onSuccess: () => orderItemsQuery.refetch()
            });
        }
    };

    return (
        <div className="flowers-cart-page-body-text">
            <div className="flowers-cart-page-body-img">
                <img
                    src={`data:${orderItem.item.photoContentType};base64,${orderItem.item.photoContent}`}
                    alt={orderItem.item.photoName}
                />
            </div>
            <div style={{ cursor: "pointer" }} onClick={() => navigate(`/flowers/${orderItem.itemId}`)}>{orderItem.item.name}</div>
            <div className="flowers-cart-page-body-price">
                {orderItem.item.price + "$"}
            </div>
            <div className="flowers-cart-page-body-quantity">
                <Button
                    text={"-"}
                    className="flowers-cart-page-body-quantity-button"
                    onClick={() => changeQuantity(false)} />
                <div style={{ paddingTop: 5 }}>{orderItem.quantity}</div>
                <Button
                    text={"+"}
                    className="flowers-cart-page-body-quantity-button"
                    onClick={() => changeQuantity(true)} />
            </div>
            <Button disabled={deleteOrderItem.isLoading}
                text="x"
                className="btn-delete-order-item"
                onClick={() => deleteOrderItem.mutate(orderItem.orderItemId)} />
        </div>
    );
};

export const OrderItems = () => {
    const orderItems = useOrderItems();
    return <>{
        orderItems.map((orderItem: OrderItem) => {
            return <OrderItemCard orderItem={orderItem} />;
        })
    }</>;
};

export const CartPage = () => {
    const currentOrder = useCurrentOrder();
    const deleteOrder = useDeleteOrder();
    return (
        <div className='global'>
            <div className="flowers-cart-page">
                <Header />
                <div className="flowers-cart-page-body">
                    <div className="flowers-cart-page-body-title">
                        Cart
                    </div>
                    <Suspense fallback={
                        <div className="flowers-cart-page-spinner">
                            <Spinner animation="border" role="status" />
                        </div>
                    }>
                        <OrderItems />
                    </Suspense>
                </div>
                <div className="buttons-container">
                    {currentOrder && <>
                        <Button text={"Cancel"}
                            className="btn-add-to-cart"
                            disabled={deleteOrder.isLoading}
                            onClick={() => {
                                // not working
                                deleteOrder.mutate(currentOrder!.orderId, {
                                    onSuccess: () => { }
                                });
                            }} />
                        <Button text={"Order"} className="btn-add-to-cart" />
                    </>}
                </div>
            </div>
        </div>
    );
};