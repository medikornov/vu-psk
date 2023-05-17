import React, { createContext, useContext } from "react";
import FlowersApiClient from "./FlowersApiClient";

const FlowersApiContext = createContext<FlowersApiClient | undefined>(undefined);

export const FlowersApiProvider = ({ children }: { children: React.ReactElement; }) => {
    const flowersApiClient = new FlowersApiClient();
    return (
        <FlowersApiContext.Provider value={flowersApiClient}>
            {children}
        </FlowersApiContext.Provider>
    );
};

export const useFlowersApiClient = () => {
    return useContext(FlowersApiContext);
};