import React from "react";
import { Header } from "../components/header/Header";
import "./MainPage.scss";

const temporaryAboutText = "Discover the enchanting world of flowers at Blossom Haven, where beauty and nature intertwine to create captivating floral masterpieces. Our flower shop is a haven for floral enthusiasts, offering an extensive selection of exquisite blooms, personalized arrangements, and exceptional service. Whether you're looking to celebrate a special occasion, express your heartfelt emotions, or simply add a touch of elegance to your surroundings, Blossom Haven is here to fulfill all your floral desires.";
const temporaryTitleText = "Flowers for individual wishes";

export const MainPage = () => {
    return (
        <div className='global'>
            <div className="main-page">
                <Header />
                <div className="main-page-body">
                    <div className="main-page-body-text">
                        <div className="main-page-body-text-title">{temporaryTitleText}</div>
                        <div className="main-page-body-text-about">{temporaryAboutText}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};