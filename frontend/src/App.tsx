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
import { QueryClient, QueryClientProvider } from "react-query";
import { UserManagementProvider } from "./clients/UserManagementProvider";
import { CartPage } from "./pages/CartPage";
import { UploadFlowersPage } from "./pages/UploadFlowersPage";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { AllFlowersPage } from "./pages/AllFlowersPage";
import { MyOrdersPage } from "./pages/MyOrdersPage";
import { OrderSuccess } from "./pages/OrderSuccess";
import { UpdateFlowerPage } from "./pages/UpdateFlowerPage";
import { AllOrdersPage } from "./pages/AllOrdersPage";
import { OrderDetailsPage } from "./pages/OrderDetails";

const domain = process.env.AUTHZERO_DOMAIN ?? "";
const clientId = process.env.AUTHZERO_CLIENTID ?? "";

const Auth0ContextProvider = ({ children }: { children: React.ReactElement; }) => {
   return (
      <Auth0Provider
         domain={domain}
         clientId={clientId}
         authorizationParams={{
            redirect_uri: window.location.origin,
            responseType: 'token id_token',
            scope: 'openid profile email',
            audience: "https://dev-flowersapi.com"
         }}
         cacheLocation="localstorage"
      >
         {children}
      </Auth0Provider>
   );
};

const queryClient = new QueryClient();

export const App = () => {
   return (
      <QueryClientProvider client={queryClient} >
         <Auth0ContextProvider>
            <FlowersApiProvider>
               <UserManagementProvider>
                  <BrowserRouter>
                     <Routes>
                        <Route path="/" element={<MainPage />} />
                        <Route path="/about" element={<AboutPage />} />
                        <Route path="/login" element={<LoginPage />} />
                        <Route path="/flowers" element={<FlowersPage />} />
                        <Route path="/flowers/:id" element={<FlowerDetailsPage />} />
                        <Route path="/cart" element={<CartPage />} />
                        <Route path="/upload-flowers" element={<UploadFlowersPage />} />
                        <Route path="/all-flowers" element={<AllFlowersPage />} />
                        <Route path="/all-flowers/:id" element={<UpdateFlowerPage />} />
                        <Route path="/my-orders" element={<MyOrdersPage />} />
                        <Route path="/order-success" element={<OrderSuccess />} />
                        <Route path="/all-orders" element={<AllOrdersPage />} />
                        <Route path="/order/:id" element={<OrderDetailsPage />} />
                     </Routes>
                  </BrowserRouter>
               </UserManagementProvider>
            </FlowersApiProvider>
         </Auth0ContextProvider>
      </QueryClientProvider>
   );
};
