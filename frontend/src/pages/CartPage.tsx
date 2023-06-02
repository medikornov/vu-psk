import React, { Suspense, useState } from "react";
import { Header } from "../components/header/Header";
import { OrderItem } from "../clients/FlowersApiClient";
import { useCurrentOrder, useDeleteOrder, useDeleteOrderItem, useOrderCreation, useOrderItems, useOrderItemsQuery, useUpdateOrder, useUpdateOrderItem } from "../clients/hook";
import "./CartPage.scss";
import { Button } from "../components/buttons/Button";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { ToastMessage } from "../components/toasts/Toast";

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
            if (orderItem.quantity !== 0) {
                const newItem: OrderItem = { ...orderItem, quantity: orderItem.quantity - 1 };
                setOrderItem(newItem);
                updateOrder.mutate(newItem, {
                    onSuccess: () => orderItemsQuery.refetch()
                });
            }
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
    const updateOrder = useUpdateOrder();
    const orderItems = useOrderItems(false);
    const orderItemsQuery = useOrderItemsQuery(false);
    const createEmptyOrder = useOrderCreation();

    const price = orderItems.reduce((acc, orderItem) => acc + orderItem.item.price * orderItem.quantity, 0);

    const [number, setNumber] = useState<string>("");
    const [address, setAddress] = useState<string>("");

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
                {orderItemsQuery.isFetched && (
                    orderItems.length === 0 ?
                        <div className="flowers-cart-page-body-title" style={{ paddingLeft: 50 }}>
                            Your cart is empty
                        </div>
                        :
                        <div>
                            <div>
                                <label className="flowers-cart-page-input-label">Contact phone number:</label>
                                <input type="text" placeholder={"+37061234560"} className="flowers-cart-page-input" onChange={(e) => {
                                    setNumber(e.target.value);
                                }} />
                                <label className="flowers-cart-page-input-label">Address:</label>
                                <input type="text" placeholder={"Vilnius, Gedimino pr. 1"} className="flowers-cart-page-input" onChange={(e) => {
                                    setAddress(e.target.value);
                                }} />
                            </div>
                            <div style={{ display: "flex", marginLeft: -54, paddingTop: 10 }}>
                                <span className="flowers-cart-page-body-all-price">Price: {price}$</span>
                                <div className="buttons-container">
                                    {currentOrder && <>
                                        <Button text={"Cancel"}
                                            className="btn-add-to-cart"
                                            disabled={deleteOrder.isLoading}
                                            onClick={() => {
                                                // not working
                                                deleteOrder.mutate(currentOrder!.orderId, {
                                                    onSuccess: () => {
                                                        createEmptyOrder.refetch();
                                                    }
                                                });
                                            }} />
                                        <Button text={"Order"}
                                            className="btn-add-to-cart"
                                            disabled={number.length === 0 || address.length === 0 || updateOrder.isLoading}
                                            onClick={() => {
                                                updateOrder.mutate({
                                                    ...currentOrder,
                                                    status: "InProgress",
                                                    orderTotal: price,
                                                    address,
                                                    phone: number
                                                });
                                            }} />
                                    </>}
                                </div>
                            </div>
                        </div>
                )}
                <ToastMessage />
            </div>
        </div>
    );
};;