import React from "react";
import './Button.scss';
import BootstrapButton from "react-bootstrap/Button";

interface ButtonProps {
    onClick?: React.MouseEventHandler;
    text?: string;
    className?: string;
}

export const Button = ({ text, onClick, className }: ButtonProps) => {
    return (
        <div className="button">
            <BootstrapButton active={false} onClick={onClick} className={className}>
                {text}
            </BootstrapButton>
        </div>
    );
};