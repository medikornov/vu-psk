import { useAuth0 } from "@auth0/auth0-react";
import React from "react";
import { Button } from "../components/buttons/Button";

export const LoginPage = () => {
    const auth0 = useAuth0();
    return (
        <div>
            <div>Login page</div>
            <Button text="Login button" onClick={() => auth0.loginWithRedirect()}></Button>
        </div>
    );
};