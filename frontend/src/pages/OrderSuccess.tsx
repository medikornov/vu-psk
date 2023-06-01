import React from "react";
import { Header } from "../components/header/Header";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/buttons/Button";

export const OrderSuccess = () => {
    const navigate = useNavigate();
    return (
        <div className="order-success">
            <Header />
            <div className="order-success-text">
                <div className="order-success-text-title">Thank you for your order!</div>
                <div className="order-success-text-subtitle">Come and get it at our Bucket Flowers shop!</div>
                <Button text="Get back to Flowers page" onClick={() => navigate("/flowers")} />
            </div>
        </div>
    );
};