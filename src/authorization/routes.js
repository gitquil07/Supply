import { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { RolesAuthority } from "./roles";
import { toCamelCase } from "utils/functions";
import ErrorBoundary from "components/ErrorBoundary";

const AuthorityRoute = ({component: Component, roles, ...props}) => {

    const {role}= useContext(UserContext),
          trRole = toCamelCase(role);


    return <Route {...props} render={props => roles[trRole].allowRoute? <ErrorBoundary><Component {...props} /></ErrorBoundary> : "Page not found"}></Route>
}


export const ProtectedRoute = (props) => {
    const { path } = props;
    console.log("props", props);

    const roles = {};
    Object.keys(RolesAuthority).forEach(key => {
        roles[key] = {...RolesAuthority[key]}
    });

    roles.admin.allowRoute = true;

    if(path.indexOf("/supply/order") > -1){
        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    if(path.indexOf("/supply/application") > -1){
        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    if(path.indexOf("/supply/arrived") > -1){
        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    if(path.indexOf("/supply/customs") > -1){
        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    if(path.indexOf("/supply/report") > -1){
        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    if(path.indexOf("/supply/stock-balance") > -1){
        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    if(path.indexOf("/supply/plan-product") > -1){
        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    // Tracking routes privileges for (adminTracking tracking) and( adminSupply order)
    if(path.indexOf("/tracking/transport") > -1){
        roles.trackingAdmin.allowRoute = true;
        roles.tracking.allowRoute = true;

        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    if(path.indexOf("/tracking/arrived") > -1){
        roles.trackingAdmin.allowRoute = true;
        roles.tracking.allowRoute = true;

        roles.supplyAdmin.allowRoute = true;
        roles.order.allowRoute = true;
    }

    if(path.indexOf("/tracking/clients") > -1){
        roles.trackingAdmin.allowRoute = true;
        roles.tracking.allowRoute = true;
    }

    if(path.indexOf("/tracking/dept") > -1){
        roles.trackingAdmin.allowRoute = true;
        roles.tracking.allowRoute = true;
    }

    // Custom routes privileges for (adminTracking tracking) and( adminSupply order)
    if(path.indexOf("/customs/new") > -1){

        roles.customAdmin.allowRoute = true;
        roles.contractor.allowRoute = true;
        roles.declarant.allowRoute = true;
    }

    if(path.indexOf("/customs/ready") > -1){
        
        roles.customAdmin.allowRoute = true;
        roles.contractor.allowRoute = true;
        roles.declarant.allowRoute = true;
        
    }

    if(path.indexOf("/customs/no-document") > -1){

        roles.customAdmin.allowRoute = true;
        roles.contractor.allowRoute = true;
        roles.declarant.allowRoute = true;
    }

    if(path.indexOf("/customs/certificate") > -1){
        roles.customAdmin.allowRoute = true;
        roles.contractor.allowRoute = true;
        roles.declarant.allowRoute = true;
    }

    if(path.indexOf("/customs/no-typed") > -1){
        roles.customAdmin.allowRoute = true;
        roles.contractor.allowRoute = true;
        roles.declarant.allowRoute = true;
    }

    if(path.indexOf("/customs/no-money") > -1){
        roles.customAdmin.allowRoute = true;
        roles.contractor.allowRoute = true;
        roles.declarant.allowRoute = true;
    }

    if(path.indexOf("/customs/closed") > -1){
        roles.customAdmin.allowRoute = true;
        roles.contractor.allowRoute = true;
        roles.declarant.allowRoute = true;
    }

    // Settings routes privilleges for all admin roles
    if(path.indexOf("/settings/firms") > -1){

        roles.customAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.trackingAdmin.allowRoute = true;
    }

    if(path.indexOf("/settings/factories") > -1){
        
        roles.customAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.trackingAdmin.allowRoute = true;
    }

    if(path.indexOf("/settings/users") > -1){

        roles.customAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.trackingAdmin.allowRoute = true;
    }

    if(path.indexOf("/settings/products") > -1){
        roles.customAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.trackingAdmin.allowRoute = true;
    }

    if(path.indexOf("/settings/materials") > -1){
        roles.customAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.trackingAdmin.allowRoute = true;
    }

    if(path.indexOf("/settings/suppliers") > -1){
        roles.customAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.trackingAdmin.allowRoute = true;
    }

    if(path.indexOf("/settings/vendor-factories") > -1){
        roles.customAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.trackingAdmin.allowRoute = true;
    }

    if(path.indexOf("/settings/transports") > -1){
        roles.customAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.trackingAdmin.allowRoute = true;
    }

    console.log("roles protected", roles);

    return  <AuthorityRoute {...{roles, ...props}} />
}
