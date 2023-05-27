import React from "react";
import './Button.scss';
import BootstrapButton from "react-bootstrap/Button";

interface ButtonProps {
    onClick?: React.MouseEventHandler;
    text?: string;
    className?: string;
    disabled?: boolean;
}

export const Button = ({ text, onClick, className, disabled }: ButtonProps) => {
    return (
        <div className="button">
            <BootstrapButton disabled={disabled} active={false} onClick={onClick} className={className}>
                {text}
            </BootstrapButton>
        </div>
    );
};