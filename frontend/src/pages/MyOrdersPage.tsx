import React from "react";
import { Header } from "../components/header/Header";
import { useMyOrders } from "../clients/hook";
import './MyOrdersPage.scss';
import { ToastMessage } from "../components/toasts/Toast";

export const MyOrdersPage = () => {
    const myOrders = useMyOrders();

    return (
        <div className='global'>
            <div className="myorders-page">
                <Header />
                <div className="myorders-body">
                    <div className="myorders-body-text">
                        <div className="myorders-body-text-title">My Orders</div>
                        <table className="myorders-page-orders">
                            <thead>
                                <tr>
                                    <th>Order ID</th>
                                    <th>Date</th>
                                    <th>Price</th>
                                    <th>Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {myOrders.map(order => (
                                    <tr key={order.orderId}>
                                        <td>{order.orderId}</td>
                                        <td>{new Date(order.creationTime).toDateString()}</td>
                                        <td>{order.orderTotal}</td>
                                        <td>{order.status}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <ToastMessage />
            </div>
        </div>
    );
};