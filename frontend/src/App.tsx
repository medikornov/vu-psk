import React from "react";
import "./App.css";
import { MainPage } from "./pages/MainPage";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { AboutPage } from "./pages/AboutPage";
import { Auth0Provider } from "@auth0/auth0-react";
import { LoginPage } from "./pages/LoginPage";
import { FlowersPage } from "./pages/FlowersPage";
import { FlowersApiProvider } from "./clients/FlowersApiProvider";
import { FlowerDetailsPage } from "./pages/FlowerDetailsPage";

const domain = process.env.AUTHZERO_DOMAIN ?? "";
const clientId = process.env.AUTHZERO_CLIENTID ?? "";

const Auth0ContextProvider = ({ children }: { children: React.ReactElement; }) => {
   return (
      <Auth0Provider
         domain={domain}
         clientId={clientId}
         authorizationParams={{
            redirect_uri: window.location.origin
         }}
      >
         {children}
      </Auth0Provider>
   );
};

export const App = () => {
   return (
      <Auth0ContextProvider>
         <FlowersApiProvider>
            <BrowserRouter>
               <Routes>
                  <Route path="/" element={<MainPage />} />
                  <Route path="/about" element={<AboutPage />} />
                  <Route path="/login" element={<LoginPage />} />
                  <Route path="/flowers" element={<FlowersPage />} />
                  <Route path="/flowers/:id" element={<FlowerDetailsPage />} />
               </Routes>
            </BrowserRouter>
         </FlowersApiProvider>
      </Auth0ContextProvider>
   );
};
