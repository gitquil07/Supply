import React, { lazy, Suspense } from "react";
import CustomCircularProgress from "components/CustomCircularProgress";

// import UsersList from "./users/UsersList";

// import FactoryList from "./factories/FactoryList";

// import SuppliersList from "./suppliers/SuppliersList";
// import SuppliersCreate from "./suppliers/SuppliersCreate";

// import MaterialsList from "./materials/MaterialsList";
// import MaterialCreate from "./materials/MaterialsCreate"

// import ProductsList from "./products/ProductsList";
// import ProductCreate from "./products/ProductCreate";

// import VendorFactoriesList from "./vendorFactories/VendorFactoriesList";
// import VendorFactoryCreate from "./vendorFactories/VendorFactoryCreate";

// import TransportsList from "./transports/TransportsList";
// import FirmsList from "./firms/FirmsList"; 

import { ProtectedRoute } from "authorization/routes";

const UsersList = lazy(() => import("./users/UsersList"));
const FactoryList = lazy(() => import("./factories/FactoryList"));
const SuppliersList = lazy(() => import("./suppliers/SuppliersList"));
const SuppliersCreate = lazy(() => import("./suppliers/SuppliersCreate"));
const MaterialsList = lazy(() => import("./materials/MaterialsList"));
const MaterialCreate = lazy(() => import("./materials/MaterialsCreate"));
const ProductsList = lazy(() => import("./products/ProductsList"));
const ProductCreate = lazy(() => import("./products/ProductCreate"));
const VendorFactoriesList = lazy(() => import("./vendorFactories/VendorFactoriesList"));
const VendorFactoryCreate = lazy(() => import("./vendorFactories/VendorFactoryCreate"));
const TransportsList = lazy(() => import("./transports/TransportsList"));
const FirmsList = lazy(() => import("./firms/FirmsList"));

const Settings = ({ match }) => {

    const url = (path) => `${match.url}/${path}`;

    return (
        <>
            <Suspense fallback={<CustomCircularProgress/>}>
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
            </Suspense>
        </>
    );
};

export default Settings;