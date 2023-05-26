import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Card.scss";
import { Item } from "../../clients/FlowersApiClient";
import { useNavigate } from "react-router-dom";

interface ItemCard {
    title: string;
    description: string;
    quantity: number;
}

export const ItemCard = ({ title, description, quantity }: ItemCard) => {
    return (
        <div className="flower-card-container">
            <Card className="flower-card">
                <Card.Text className="quantity-text">
                    <span>{"Sale: "}</span>
                    <span className="quantity-number">{quantity}</span>
                </Card.Text>
                <Card.Img variant="top" src="./yesterday.png" />
                <Card.Body>
                    <Card.Title className="card-title">{title}</Card.Title>
                    <Card.Text className="card-description">
                        {description}
                    </Card.Text>
                    <Button text={"Add To Cart"} className="btn-add-to-cart" />
                </Card.Body>
            </Card>
        </div>
    );
};