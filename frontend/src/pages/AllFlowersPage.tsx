import React, { Suspense } from "react";
import { Header } from "../components/header/Header";
import { ToastMessage } from "../components/toasts/Toast";
import { useItems } from "../clients/hook";
import { Item } from "../clients/FlowersApiClient";
import "./AllFlowersPage.scss";
import { Spinner } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

const Items = () => {
    const items = useItems();
    const navigate = useNavigate();

    return (
        <table className="allflowers-page-body">
            <thead>
                <tr>
                    <th>Item ID</th>
                    <th>Name</th>
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