import React from "react";
import { Button, Card } from "react-bootstrap";
import "./Card.scss";
import { Item } from "../../clients/FlowersApiClient";
import { useNavigate } from "react-router-dom";

export const ItemCard = ({ name, description, itemId }: Item) => {
    const navigate = useNavigate();

    return (
        <Card style={{ width: '18rem' }} onClick={() => console.log("clicked card")}>
            <Card.Img variant="top" src="./yesterday.png" />
            <Card.Body>
                <Card.Title>{name}</Card.Title>
                <Card.Text>
                    {description}
                </Card.Text>
                <Button variant="primary">Add To Cart</Button>
                <Button variant="secondary" onClick={() => navigate("/flowers/" + itemId)}>Details</Button>
            </Card.Body>
        </Card>
    );
};