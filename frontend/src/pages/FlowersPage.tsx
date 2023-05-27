import React from "react";
import "./FlowersPage.scss";
import { ItemCard } from "../components/cards/Card";
import { useItems } from "../clients/hook";
import { Header } from "../components/header/Header";
import "./FlowerDetailsPage.scss";

export const FlowersPage = () => {
    const items = useItems();
    return (
        <div className="flowers-page">
            <Header />
            <div className="flowers-page-body">
                <div className="flowers-page-body-text">
                    Flowers
                </div>
                <div className="flowers-page-cards">
                    {items.map(item => {
                        return <ItemCard item={item} {...item} />;
                    })}
                </div>
            </div>
        </div>

    );
};