import React from "react";
import { Button } from "../buttons/Button";
import "./Header.scss";
import { CartButton } from "../buttons/CartButton";

export const Header = () => {
    return (
        <div className="header">
            <div className="header-logo">
                <Button text={"Bucket Flowers"} />
            </div>
            <div className="header-nav-bar">
                <Button text={"Flowers"} />
                <Button text={"Upload Flowers"} />
                <Button text={"About Us"} />
            </div>
            <div className="header-cart">
                <CartButton />
            </div>
        </div>
    );
};