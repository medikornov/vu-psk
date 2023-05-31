import React from "react";
import { Header } from "../components/header/Header";
import { useMyOrders } from "../clients/hook";
import './MyOrdersPage.scss';

export const MyOrdersPage = () => {
    const myOrders = useMyOrders();

    return (
        <div className='global'>
            <div className="myorders-page">
                <Header />
                <div className="myorders-body">
                    <div className="myorders-body-text">
                        <div className="myorders-body-text-title">My Orders</div>
                        <div className="myorders-page-orders">
                            {myOrders.map(order => {
                                return (
                                    <div className="myorders-page-order">
                                        <div className="myorders-page-order-id">
                                            {order.orderId}
                                        </div>
                                        <div className="myorders-page-order-date">
                                            {new Date(order.creationTime).toDateString()}
                                        </div>
                                        <div className="myorders-page-order-price">
                                            {order.orderTotal}
                                        </div>
                                        <div className="myorders-page-order-status">
                                            {order.status}
                                        </div>
                                    </div>
                                );
                            })
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};