import React from "react";
import { Header } from "../components/header/Header";

export const MyFlowersPage = () => {
    return (
        <div className='global'>
            <div className="myflowers-page">
                <Header />
                <div className="myflowers-body">
                    <div className="myflowers-body-text">
                        <div className="myflowers-body-text-title">My Flowers</div>
                    </div>
                </div>
            </div>
        </div>
    );
};;