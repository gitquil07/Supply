import { Route } from "react-router-dom";

import UsersList from "./users/UsersList";

import FactoryList from "./factories/FactoryList";

import SuppliersList from "./suppliers/SuppliersList";
import SuppliersCreate from "./suppliers/SuppliersCreate";

import MaterialsList from "./materials/MaterialsList";
import MaterialCreate from "./materials/MaterialsCreate"

import ProductsList from "./products/ProductsList";
import ProductCreate from "./products/ProductCreate";

import VendorFactoriesList from "./vendorFactories/VendorFactoriesList";
import VendorFactoryCreate from "./vendorFactories/VendorFactoryCreate";

import TransportsList from "./transports/TransportsList";
import FirmsList from "./firms/FirmsList"; 

import { ProtectedRoute } from "authorization/routes";

const Settings = ({ match }) => {

    const url = (path) => `${match.url}/${path}`;

    return (
        <>
            <ProtectedRoute path={url("users")} component={UsersList} exact />
            <ProtectedRoute path={url("factories")} component={FactoryList} exact />
            <ProtectedRoute path={url("transports")} component={TransportsList} exact />
            <ProtectedRoute path={url("firms")} component={FirmsList} exact />
            <ProtectedRoute path={url("suppliers")} component={SuppliersList}  exact />
            <ProtectedRoute path={url("suppliers/create")} component={SuppliersCreate} />
            <ProtectedRoute path={url("suppliers/edit/:id")} component={SuppliersCreate} />
            <ProtectedRoute path={url("materials")} component={MaterialsList} exact />
            <ProtectedRoute path={url("materials/create")} component={MaterialCreate} />
            <ProtectedRoute path={url("materials/edit/:id")} component={MaterialCreate} />
            <ProtectedRoute path={url("products")} component={ProductsList} exact />
            <ProtectedRoute path={url("products/create")} component={ProductCreate} />
            <ProtectedRoute path={url("products/edit/:id")} component={ProductCreate} />
            <ProtectedRoute path={url("vendor-factories")} component={VendorFactoriesList} exact />
            <ProtectedRoute path={url("vendor-factories/create")} component={VendorFactoryCreate} />
            <ProtectedRoute path={url("vendor-factories/edit/:id")} component={VendorFactoryCreate} />
        </>
    );
};

export default Settings;