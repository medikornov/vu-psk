import { Card } from "react-bootstrap";
import "./Card.scss";
import { Item } from "../../clients/FlowersApiClient";
import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/Button";
import React, { useState } from "react";
import { useFlowersApiClient } from "../../clients/FlowersApiProvider";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0Token, useCurrentOrder, useItem, useOrderItemsQuery } from "../../clients/hook";
import { useQueryClient } from "react-query";

interface ItemCard {
    title: string;
    description: string;
    quantity: number;
}

export const AddToCart = ({ item }: { item: Item; }) => {
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

export const ItemCard = ({ item }: { item: Item; }) => {
    const navigate = useNavigate();

    return (
        <div className="flower-card-container">
            <Card className="flower-card">
                <Card.Text className="quantity-text">
                    <span>{"Sale: "}</span>
                    <span className="quantity-number">{item.quantity}</span>
                </Card.Text>
                <Card.Img variant="top" src={`data:${item.photoContentType};base64,${item.photoContent}`} onClick={() => navigate(`/flowers/${item.itemId}`)} />
                <Card.Body>
                    <Card.Title className="card-title">{item.name}</Card.Title>
                    <Card.Text className="card-description">
                        {item.description}
                    </Card.Text>
                    <AddToCart item={item} />
                </Card.Body>
            </Card>
        </div>
    );
};