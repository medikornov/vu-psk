import React, { useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import "./FlowersPage.scss";
import { ItemCard } from "../components/cards/Card";
import { Footer } from "../components/footer/Footer";
import { useItems } from "../clients/hook";

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
                        return <ItemCard {...item} />;
                    })}
                </div>
            </div>
            <Footer />
        </div>

    );
};