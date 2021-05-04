import { Route } from "react-router-dom";

import UsersList from "./users/UsersList";

import FactoryList from "./factories/FactoryList";

import SuppliersList from "./suppliers/SuppliersList";
import SuppliersCreate from "./suppliers/SuppliersCreate";

import MaterialsList from "./materials/MaterialsList";
import MaterialCreate from "./materials/MaterialsCreate"

import ProductsList from "./products/ProductsList";
import ProductCreate from "./products/ProductCreate";

const Settings = ({ match }) => {

    const url = (path) => `${match.url}/${path}`;

    return (
        <>
            <Route path={url("users")} component={UsersList} exact />

            <Route path={url("factories")} component={FactoryList} exact />

            <Route path={url("suppliers")} component={SuppliersList} exact />
            <Route path={url("suppliers/create")} component={SuppliersCreate} />
            <Route path={url("suppliers/edit/:id")} component={SuppliersCreate} />

            <Route path={url("materials")} component={MaterialsList} exact />
            <Route path={url("materials/create")} component={MaterialCreate} />

            <Route path={url("products")} component={ProductsList} exact />
            <Route path={url("products/create")} render={props => <ProductCreate {...props} />} />
            <Route path={url("products/edit/:id")} render={props => <ProductCreate {...props}/>} />
        </>
    );
};

export default Settings;