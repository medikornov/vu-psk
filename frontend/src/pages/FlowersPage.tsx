import React, { useEffect, useState } from "react";
import { Header } from "../components/header/Header";
import "./FlowersPage.scss";
import { ItemCard } from "../components/cards/Card";
import { useFlowersApiClient } from "../clients/FlowersApiProvider";
import { Item } from "../clients/FlowersApiClient";

export const FlowersPage = () => {
    const flowersApiClient = useFlowersApiClient();
    const [items, setItems] = useState<Item[]>([]);
    useEffect(() => {
        flowersApiClient?.getAllItems().then(response => setItems(response.data.data));
    }, [flowersApiClient]);

    return (
        <div className='global'>
            <div className="flowers-page">
                <Header />
                <div className="flowers-page-body">
                    <div className="flowers-page-body-text">
                        List of flowers
                    </div>
                    <div className="flowers-page-cards">
                        {items.map(item => {
                            return <ItemCard {...item} />;
                        })}
                    </div>
                    <div className="flowers-page-body-image"><img src={'./yesterday.png'} alt="yesterday" /></div>
                </div>
            </div>
        </div>
    );
};