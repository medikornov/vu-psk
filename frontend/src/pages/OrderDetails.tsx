import React, { Suspense, useState } from "react";
import { Header } from "../components/header/Header";
import { OrderItem } from "../clients/FlowersApiClient";
import { useCurrentOrder, useDeleteOrder, useDeleteOrderItem, useOrderById, useOrderCreation, useOrderItems, useOrderItemsById, useOrderItemsQuery, useUpdateOrder, useUpdateOrderItem } from "../clients/hook";
import "./CartPage.scss";
import { Button } from "../components/buttons/Button";
import { Spinner } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
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
                <div style={{ paddingTop: 5, paddingRight: 20 }}>{orderItem.quantity}</div>
            </div>
        </div>
    );
};

export const OrderItems = ({ id }: { id?: string; }) => {
    const orderItems = useOrderItemsById(id, true).data?.data ?? [];
    const order = useOrderById(id);
    const price = orderItems.reduce((acc, orderItem) => acc + orderItem.item.price * orderItem.quantity, 0);

    return <>{
        orderItems.map((orderItem: OrderItem) => {
            return <OrderItemCard orderItem={orderItem} />;
        })
    }
        <div style={{
            color: "white",
            width: "100%",
            fontFamily: "abel",
            paddingTop: 20,
            paddingLeft: 10,
            fontSize: 20
        }}>
            <div>Price: {price}$</div>
            <div>
                Contact information
            </div>
            <div style={{paddingLeft: 35}}>
                Address: {order?.address ?? ""}
            </div>
            <div style={{paddingLeft: 35}}>
                Number: {order?.phone ?? ""}
            </div>
        </div >
    </>;
};

export const OrderDetailsPage = () => {
    // get id from url
    const { id } = useParams();
    const orderItems = useOrderItemsById(id).data?.data ?? [];

    return (
        <div className='global'>
            <div className="flowers-cart-page">
                <Header />
                <div className="flowers-cart-page-body">
                    <div className="flowers-cart-page-body-title">
                        Order details
                    </div>
                    <Suspense fallback={
                        <div className="flowers-cart-page-spinner">
                            <Spinner animation="border" role="status" />
                        </div>
                    }>
                        <OrderItems id={id} />
                    </Suspense>
                </div>
            </div>
        </div>
    );
};