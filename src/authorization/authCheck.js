import { RolesAuthority } from "./roles"; 
import { toCamelCase } from "utils/functions";

export const checkPrivilege = (role, privilege) => {

    const keys = privilege.split("."),
         trRole = toCamelCase(role);
   
    let val = RolesAuthority[trRole]?.permissions;

    for(let key of keys){
        val = val[key];
    } 

    return val;

}