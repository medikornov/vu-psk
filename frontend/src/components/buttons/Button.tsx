import React from "react";
import './Button.scss';
import BootstrapButton from "react-bootstrap/Button";

interface ButtonProps {
    onClick?: React.MouseEventHandler;
    text?: string;
}

export const Button = ({ text, onClick }: ButtonProps) => {
    return (
        <div className="button">
            <BootstrapButton active={false} variant="primary" onClick={onClick}>
                {text}
            </BootstrapButton>
        </div>
    );
};