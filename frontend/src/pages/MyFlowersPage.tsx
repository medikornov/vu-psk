import React from "react";
import { Header } from "../components/header/Header";
import { ToastMessage } from "../components/toasts/Toast";

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
                <ToastMessage />
            </div>
        </div>
    );
};;