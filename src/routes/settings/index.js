import { Route } from "react-router-dom";
import FactoryList from "./factories/FactoryList";
import MaterialsList from "./materials/MaterialsList";
import SuppliersList from "./suppliers/SuppliersList";
import UsersList from "./users/UsersList";
const Settings = () => {
    return (
        <>
            <Route path="/settings/users" component={UsersList} exact />

            <Route path="/settings/factories" component={FactoryList} exact />

            <Route path="/settings/suppliers" component={SuppliersList} exact />

            <Route path="/settings/materials" component={MaterialsList} exact />

        </>
    );
};

export default Settings; 