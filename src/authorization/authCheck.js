import { RolesAuthority } from "./roles"; 
import { toCamelCase } from "utils/functions";

export const checkPrivilege = (role, privilege) => {
    
    const trRole = toCamelCase(role);

    return RolesAuthority[trRole][privilege];

}