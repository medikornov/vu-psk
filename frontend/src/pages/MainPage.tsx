import React from "react";
import { Header } from "../components/header/Header";
import "./MainPage.scss";

const temporaryAboutText = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Curabitur gravida arcu ac tortor dignissim. At auctor urna nunc id cursus metus aliquam eleifend mi. Tortor pretium viverra suspendisse potenti nullam ac tortor. Lacus sed turpis tincidunt id.";
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
                    <div className="main-page-body-image"><img src={'./yesterday.png'} alt="yesterday" /></div>
                </div>
            </div>
        </div>
    );
};