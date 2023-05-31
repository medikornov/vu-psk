import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useFlowersApiClient } from "../clients/FlowersApiProvider";
import { Item } from "../clients/FlowersApiClient";
import { Header } from "../components/header/Header";
import "./FlowerDetailsPage.scss";
import { Button } from "../components/buttons/Button";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0Token, useCurrentOrder, useItem, useOrderItemsQuery } from "../clients/hook";
import { Footer } from "../components/footer/Footer";
import { IoIosRose } from 'react-icons/io';

const AddToCart = ({ item }: { item: Item; }) => {
    const auth0 = useAuth0();
    const currentOrder = useCurrentOrder();
    const flowersApiClient = useFlowersApiClient();
    const auth0Token = useAuth0Token();
    const orderItemsQuery = useOrderItemsQuery();
    const [canAdd, setCanAdd] = useState(true);

    return (
        <div className="flowers-details-page-body-cart-button">
            <Button disabled={!(canAdd && !!currentOrder)} text={"Add To Cart"} className="btn-add-to-cart" onClick={() => {
                if (auth0Token) {
                    if (currentOrder) {
                        setCanAdd(false);
                        flowersApiClient?.addItemToOrder(auth0Token, currentOrder.orderId, item.itemId, 1, 1)
                            .then(() => setCanAdd(true))
                            .then(() => orderItemsQuery.refetch());
                    }
                }
                else
                    auth0.loginWithRedirect();
            }} />
        </div>
    );
};

const Details = ({ item }: { item: Item | undefined; }) => {
    if (!item) return <></>;
    return (
        <>
            <div className="flowers-details-page-body-text">
                <div className="flowers-details-page-body-text-info">
                    <span className="flowers-details-page-body-text-title">
                        <IoIosRose />
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
                    <AddToCart item={item} />
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
    const item = useItem(itemId);

    return (
        <div className='global'>
            <div className="flowers-details-page">
                <Header />
                <div className="flowers-details-page-body">
                    <Details item={item} />
                </div>
                <Footer />
            </div>
        </div>
    );
};;