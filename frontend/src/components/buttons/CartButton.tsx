import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import './CartButton.scss';
import { useNavigate } from "react-router-dom";

export const CartButton = () => {
    const navigate = useNavigate();
    return (
        <div className="cart-button">
            <AiOutlineShoppingCart onClick={() => navigate('/cart')} style={{
                color: "#000000",
                background: "white",
                borderRadius: "50%",
                padding: "5px",
                fontSize: "36px",
                paddingRight: "7px"
            }} />
        </div>
    );
};