import React from "react";
import { Header } from "../components/header/Header";
import { useAllOrders, useMyOrders } from "../clients/hook";
import './MyOrdersPage.scss';
import { ToastMessage } from "../components/toasts/Toast";
import { useNavigate } from "react-router-dom";

export const AllOrdersPage = () => {
    const myOrders = useAllOrders();
    const navigate = useNavigate();
    return (
        <div className='global'>
            <div className="myorders-page">
                <Header />
                <div className="myorders-body">
                    <div className="myorders-body-text">
                        <div className="myorders-body-text-title">All Orders</div>
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
                                {myOrders.filter((a) => {
                                    return a.status === "InProgress" || a.status === "Completed";
                                }).sort((a, b) => {
                                    return new Date(b.creationTime).getTime() - new Date(a.creationTime).getTime();
                                }).map(order => (
                                    <tr key={order.orderId}>
                                        <td style={{ cursor: "pointer" }} onClick={() => {
                                            navigate(`/order/${order.orderId}`);
                                        }}>{order.orderId}</td>
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