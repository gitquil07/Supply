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
import ErrorBoundary from "components/ErrorBoundary";

const Settings = ({ match }) => {

    const url = (path) => `${match.url}/${path}`;

    return (
        <>
            <ProtectedRoute path={url("users")} component={UsersList} exact />

            <Route path={url("factories")} exact render={props =>
                <ErrorBoundary>
                    <FactoryList { ...props }/>
                </ErrorBoundary>
            }/>
            <Route path={url("transports")} component={TransportsList} exact render={props =>
                    <ErrorBoundary>
                        <FactoryList { ...props }/>
                    </ErrorBoundary>
            }/>
            <Route path={url("firms")} exact render={props =>
                <ErrorBoundary>
                    <FirmsList { ...props } />
                </ErrorBoundary>
            }/>
            <Route path={url("suppliers")} exact render={props => 
                <ErrorBoundary>
                    <SuppliersList { ...props } />
                </ErrorBoundary>
            }/>
            <Route path={url("suppliers/create")} render={props => 
                <ErrorBoundary>
                    <SuppliersCreate { ...props } />
                </ErrorBoundary>
            }/>
            <Route path={url("suppliers/edit/:id")} render={props =>
                <ErrorBoundary>
                    <SuppliersCreate { ...props } />
                </ErrorBoundary>
            }/>
            <Route path={url("materials")} exact render={props => 
                    <ErrorBoundary>
                        <MaterialsList { ...props } />
                    </ErrorBoundary>
            }/>
            <Route path={url("materials/create")} render={props => 
                <ErrorBoundary>
                    <MaterialCreate { ...props } />
                </ErrorBoundary>
            } />
            <Route path={url("materials/edit/:id")} render={props =>
                <ErrorBoundary>
                    <MaterialCreate { ...props } />
                </ErrorBoundary>
            }/>
            <Route path={url("products")} component={ProductsList} exact render={props => 
                <ErrorBoundary>
                    <ProductsList { ...props } />
                </ErrorBoundary>
            } />
            <Route path={url("products/create")} render={props => 
                <ErrorBoundary>
                    <ProductCreate {...props} />
                </ErrorBoundary>
            } />
            <Route path={url("products/edit/:id")} render={props =>
                <ErrorBoundary>
                    <ProductCreate {...props}/>
                </ErrorBoundary> 
            }/>
            <Route path={url("vendor-factories")} exact render={props =>
                <ErrorBoundary>
                    <VendorFactoriesList {...props}/>
                </ErrorBoundary>} />
            <Route path={url("vendor-factories/create")} render={props => 
                <ErrorBoundary>
                    <VendorFactoryCreate {...props}/>
                </ErrorBoundary>
            }/>
            <Route path={url("vendor-factories/edit/:id")} render={props => 
                <ErrorBoundary>
                    <VendorFactoryCreate {...props}/>
                </ErrorBoundary>
            }/>
        </>
    );
};

export default Settings;