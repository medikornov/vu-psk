import React from "react";
import { Header } from "../components/header/Header";
import "./AboutPage.scss";

export const AboutPage = () => {
    return (
        <div className='global'>
            <div className="about-page">
                <Header />
                <div className="about-page-body">
                    <div className="about-page-body-text">
                        About something
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Corporis, maxime? Corrupti vero, ipsa repellendus consequatur sit error assumenda adipisci voluptate at quis odit facere molestias perspiciatis porro deleniti enim quos.
                    </div>
                    <div className="about-page-body-image"><img src={'./yesterday.png'} alt="yesterday" /></div>
                </div>
            </div>
        </div>
    );
};