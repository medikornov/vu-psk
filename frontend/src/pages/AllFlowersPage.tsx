import React, { Suspense } from "react";
import { Header } from "../components/header/Header";
import { ToastMessage } from "../components/toasts/Toast";
import { useDeleteItem, useItems } from "../clients/hook";
import { Item } from "../clients/FlowersApiClient";
import "./AllFlowersPage.scss";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Items = () => {
    const items = useItems();
    const navigate = useNavigate();
    const deleteItem = useDeleteItem();
    return (
        <table className="allflowers-page-body">
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Name</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                {items.map((item) => (
                    <tr key={item.itemId}>
                        <td>
                            <span
                                onClick={() => navigate("/all-flowers/" + item.itemId)}
                                style={{ cursor: "pointer" }}
                            >
                                {item.itemId}
                            </span>
                        </td>
                        <td>{item.name}</td>
                        <td style={{ color: "red", cursor: "pointer" }} onClick={() => {
                            deleteItem.mutate(item.itemId);
                        }}>X</td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
};


export const AllFlowersPage = () => {
    return (
        <div className='global'>
            <div className="allflowers-page">
                <Header />
                <div className="allflowers-page-body">
                    <div className="allflowers-page-body-text">All Flowers</div>
                    <div className="allflowers-page-body-items">
                        <Suspense fallback={
                            <div className="allflowers-page-spinner">
                                <Spinner animation="border" role="status" />
                            </div>
                        }>
                            <Items />
                        </Suspense>
                    </div>
                </div>
                <ToastMessage />
            </div>
        </div>
    );
};;