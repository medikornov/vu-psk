import React from "react";
import { Header } from "../components/header/Header";
import "./AboutPage.scss";
import { Footer } from "../components/footer/Footer";
import { ToastMessage } from "../components/toasts/Toast";

const temporaryTitleText = "About us";
const temporaryAboutText = "Our online flower shop aims to revolutionize the concept of flower purchasing by providing a seamless and personalized experience for our customers. We have created a platform that offers a wide range of high-quality flowers, tailored to each customer's preferences and occasions. Customers will be able to easily browse our website and choose from various options that suit their unique tastes, budget, and events.";

export const AboutPage = () => {
    return (
        <div className='global'>
            <div className="about-page">
                <Header />
                <div className="about-page-body">
                    <div className="about-page-body-text">
                        <div className="about-page-body-text-title">{temporaryTitleText}</div>
                        <div className="about-page-body-text-about">{temporaryAboutText}</div>
                    </div>
                    <div className="about-page-body-image">
                        <div className="circle-container">
                            <img src={'./profile.jpg'} alt="yesterday" className="circle-image" />
                        </div>
                    </div>
                    <div className="about-page-body-image">
                        <div className="circle-container">
                            <img src={'./profile.jpg'} alt="yesterday" className="circle-image" />
                        </div>
                    </div>
                    <div className="about-page-body-image">
                        <div className="circle-container">
                            <img src={'./profile.jpg'} alt="yesterday" className="circle-image" />
                        </div>
                    </div>
                    <div className="about-page-body-image">
                        <div className="circle-container">
                            <img src={'./profile.jpg'} alt="yesterday" className="circle-image" />
                        </div>
                    </div>
                    <div className="about-page-body-image">
                        <div className="circle-container">
                            <img src={'./profile.jpg'} alt="yesterday" className="circle-image" />
                        </div>
                    </div>
                </div>
                <ToastMessage />
                <Footer />
            </div>
        </div>
    );
};