import React, { useMemo } from "react";
import { Button } from "../buttons/Button";
import "./Header.scss";
import { CartButton } from "../buttons/CartButton";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import { useAuth0Token } from "../../clients/hook";
import jwtDecode from "jwt-decode";
import axios from "axios";

const AuthButton = () => {
    const auth = useAuth0();

    if (auth.isLoading)
        return <>Loading...</>;

    if (auth.isAuthenticated)
        return (
            <>
                <Button text={"Logout"} className="btn-log" onClick={() => auth.logout()} />
                <div className="user-text">
                    {auth.user?.nickname}
                </div>
            </>
        );

    return <Button text={"Login"} onClick={() => auth.loginWithRedirect()} />;
};

export const Header = () => {
    const navigate = useNavigate();
    const auth = useAuth0();
    const auth0Token = useAuth0Token();
    const hasAdminAccess = useMemo(() => auth0Token ?
        (jwtDecode(auth0Token) as any).permissions.length > 0 : undefined, [auth0Token]);

    return (
        <div className="header">
            <div className="header-logo">
                <Button text={"Bucket flowers"} onClick={() => navigate("/")} className='btn-home' />
            </div>
            <div className="header-nav-bar">
                <Button text={"Flowers"} onClick={() => navigate({ pathname: "/flowers" })} />
                {auth.isAuthenticated && hasAdminAccess &&
                    <Button text={"Upload Flowers"} onClick={() => navigate({ pathname: "/upload-flowers" })} />}
                {auth.isAuthenticated && hasAdminAccess &&
                    <Button text={"All Flowers"} onClick={() => navigate({ pathname: "/all-flowers" })} />}
                {auth.isAuthenticated && !hasAdminAccess &&
                    <Button text={"My Orders"} onClick={() => navigate({ pathname: "/my-orders" })} />}
                {auth.isAuthenticated && hasAdminAccess &&
                    <Button text={"All Orders"} onClick={() => navigate({ pathname: "/all-orders" })} />}
                <Button text={"About Us"} onClick={() => navigate({ pathname: "/about" })} />
                <AuthButton />
            </div>
            <div className="header-cart">
                {auth.isAuthenticated && !hasAdminAccess && <CartButton />}
            </div>
        </div>
    );
};