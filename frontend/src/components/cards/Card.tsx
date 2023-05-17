import React from "react";
import { Card } from "react-bootstrap";
import { Button } from "../buttons/Button";
import "./Card.scss";

interface ItemCard {
    title: string;
    description: string;
}

export const ItemCard = ({ title, description }: ItemCard) => {
    return (
        <Card style={{ width: '18rem' }}>
            <Card.Img variant="top" src="./yesterday.png" />
            <Card.Body>
                <Card.Title>{title}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button text="Add To Cart" />
            </Card.Body>
        </Card>
    );
};