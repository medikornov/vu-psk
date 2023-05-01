import React from "react";
import { AiOutlineShoppingCart } from "react-icons/ai";
import './CartButton.scss';

export const CartButton = () => {
    return (
        <div className="cart-button">
            <AiOutlineShoppingCart style={{
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