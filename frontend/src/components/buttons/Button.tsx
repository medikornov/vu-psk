import React from "react";
import './Button.scss';
import BootstrapButton from "react-bootstrap/Button";

interface ButtonProps {
    text?: string;
}

export const Button = ({ text }: ButtonProps) => {
    return (
        <div className="button">
            <BootstrapButton active={false} variant="primary" >
                {text}
            </BootstrapButton>
        </div>
    );
};