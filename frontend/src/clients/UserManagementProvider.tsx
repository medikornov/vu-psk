import { useCustomerCreation } from "./hook";

export const UserManagementProvider = ({ children }: { children: React.ReactElement; }) => {
    useCustomerCreation();
    return children;
};