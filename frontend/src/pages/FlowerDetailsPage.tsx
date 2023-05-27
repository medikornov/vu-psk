import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlowersApiClient } from "../clients/FlowersApiProvider";
import { Item } from "../clients/FlowersApiClient";
import { Header } from "../components/header/Header";
import "./FlowerDetailsPage.scss";
import { Button } from "../components/buttons/Button";
import { Footer } from "../components/footer/Footer";
import { IoIosRose } from 'react-icons/io';

const Details = ({ item }: { item: Item | undefined }) => {
    if (!item) return <></>;
    console.log(item);
    return (
        <>
            <div className="flowers-details-page-body-text">
                <div className="flowers-details-page-body-text-info">
                    <span className="flowers-details-page-body-text-title">
                        <IoIosRose/>
                        {item.name}
                    </span>
                    <span className="flowers-details-page-body-text-quantity"> Sale: {item.quantity}</span>
                </div>
                <div className="flowers-details-page-body-text-description">
                    {item.description}
                </div>
                <div className="flowers-details-page-body-text-price">
                    {item.price + "$"}
                </div>
                <div className="flowers-details-page-body-cart-button">
                    <Button text={"Add To Cart"} className="btn-add-to-cart" />
                </div>
            </div>
            <div className="flowers-details-page-body-img">
                <img
                    src={`data:${item.photoContentType};base64,${item.photoContent}`}
                    alt={item.photoName}
                />
            </div>
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
                    <Details item={item} />
                </div>
                <Footer/>
            </div>
        </div>
    );
};;