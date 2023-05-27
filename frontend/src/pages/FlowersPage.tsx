import React, { Suspense, useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import "./FlowersPage.scss";
import { ItemCard } from "../components/cards/Card";
import { Footer } from "../components/footer/Footer";
import { useItems } from "../clients/hook";
import { Spinner } from "react-bootstrap";

const Items = () => {
    const items = useItems();
    return (<div className="flowers-page-cards">
        {items.map(item => {
            return <ItemCard {...item} />;
        })}
    </div>);
};


export const FlowersPage = () => {
    return (
        <div className="flowers-page">
            <Header />
            <div className="flowers-page-body">
                <div className="flowers-page-body-text">
                    Flowers
                </div>
                <Suspense fallback={
                    <>
                        <div className="flowers-page-spinner">
                            <Spinner animation="border" role="status" />
                        </div>
                    </>
                }>
                    <Items />
                </Suspense>
            </div>
        </div>

    );
};