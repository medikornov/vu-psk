import React from "react";
import { Card } from "react-bootstrap";
import "./Card.scss";
import { Item } from "../../clients/FlowersApiClient";
import { useNavigate } from "react-router-dom";
import { Button } from "../buttons/Button";

interface ItemCard {
    title: string;
    description: string;
    quantity: number;
}

export const ItemCard = ({ name, itemId, description, quantity, photoContent, photoContentType}: Item) => {
    const navigate = useNavigate();

    return (
        <div className="flower-card-container">
            <Card className="flower-card">
                <Card.Text className="quantity-text">
                    <span>{"Sale: "}</span>
                    <span className="quantity-number">{quantity}</span>
                </Card.Text>
                <Card.Img variant="top" src={`data:${photoContentType};base64,${photoContent}`} />
                <Card.Body>
                    <Card.Title className="card-title">{name}</Card.Title>
                    <Card.Text className="card-description">
                        {description}
                    </Card.Text>
                    <Button text={"Add To Cart"} className="btn-add-to-cart" onClick={() => navigate(`/flowers/${itemId}`)} />
                </Card.Body>
            </Card>
        </div>
    );
};