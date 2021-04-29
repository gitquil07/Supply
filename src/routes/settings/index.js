import { Route } from "react-router-dom";

import UsersList from "./users/UsersList";

import FactoryList from "./factories/FactoryList";

import SuppliersList from "./suppliers/SuppliersList";
import SuppliersCreate from "./suppliers/SuppliersCreate";

import MaterialsList from "./materials/MaterialsList";
import MaterialCreate from "./materials/MaterialsCreate"

const Settings = ({ match }) => {

    const url = (path) => `${match.url}/${path}`;

    return (
        <>
            <Route path={url("users")} component={UsersList} exact />

            <Route path={url("factories")} component={FactoryList} exact />

            <Route path={url("suppliers")} component={SuppliersList} exact />
            <Route path={url("suppliers/create")} component={SuppliersCreate} />

            <Route path={url("materials")} component={MaterialsList} exact />
            <Route path={url("materials/create")} component={MaterialCreate} />

        </>
    );
};

export default Settings;