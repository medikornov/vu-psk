import React from "react";
import { Header } from "../components/header/Header";
import "./FlowersPage.scss";

export const FlowersPage = () => {
    return (
        <div className='global'>
            <div className="flowers-page">
                <Header />
                <div className="flowers-page-body">
                    <div className="flowers-page-body-text">
                        List of flowers
                    </div>
                    <div className="flowers-page-body-image"><img src={'./yesterday.png'} alt="yesterday" /></div>
                </div>
            </div>
        </div>
    );
};