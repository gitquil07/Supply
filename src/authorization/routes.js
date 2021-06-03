import { useContext } from "react";
import { Route } from "react-router-dom";
import { UserContext } from "context/UserContext";
import { RolesAuthority } from "./roles";
import { toCamelCase } from "utils/functions";

const AuthorityRoute = ({component: Component, roles, ...props}) => {

    // const {role} = useContext(UserContext);
    let role = "ADMIN",
        trRole = toCamelCase(role);

    return <Route {...props} render={props => roles[trRole].allowRoute? <Component {...props} /> : "Page not found"}></Route>
}


export const ProtectedRoute = (props) => {
    const { path } = props;
    console.log("props", props);

    const roles = {};
    Object.keys(RolesAuthority).forEach(key => {
        roles[key] = {...RolesAuthority[key]}
    });

    roles.admin.allowRoute = true;

    if(path.indexOf("supply") > -1){

        roles.supplyAdmin.allowRoute = true;

    }else if(path.indexOf("customs") > -1){

        roles.customAdmin.allowRoute = true;

    }else if(path.indexOf("tracking") > -1){

        roles.trackingAdmin.allowRoute = true;

    }else if(path.indexOf("users") > -1){
        
        roles.trackingAdmin.allowRoute = true;
        roles.supplyAdmin.allowRoute = true;
        roles.customAdmin.allowRoute = true;

    }

    console.log("roles protected", roles);

    return  <AuthorityRoute {...{roles, ...props}} />
}
