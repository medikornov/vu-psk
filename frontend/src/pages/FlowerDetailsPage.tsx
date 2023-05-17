import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlowersApiClient } from "../clients/FlowersApiProvider";
import { Item } from "../clients/FlowersApiClient";
import { Header } from "../components/header/Header";
import "./FlowerDetailsPage.scss";

const Details = ({ item }: { item: Item | undefined; }) => {
    if (!item) return <></>;

    return (
        <>
            id:          {item.itemId}<br />
            name:        {item.name}<br />
            description: {item.description}<br />
            price:       {item.price}<br />
            quantity:    {item.quantity}<br />
        </>
    );
};

export const FlowerDetailsPage = () => {
    const { id: itemId } = useParams();

    const flowersApiClient = useFlowersApiClient();
    const [item, setItem] = useState<Item | undefined>(undefined);
    useEffect(() => {
        itemId && flowersApiClient?.getItem(itemId).then(response => setItem(response.data.data));
    }, [flowersApiClient]);

    return (
        <div className='global'>
            <div className="flowers-details-page">
                <Header />
                <div className="flowers-details-page-body">
                    <div className="flowers-details-page-body-text">
                        <Details item={item} />
                    </div>
                </div>
            </div>
        </div>
    );
};