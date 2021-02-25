import { Route } from "react-router-dom";
import UserCreate from "./users/UserCreate";
import UsersList from "./users/UsersList";
const Settings = () => {
    return (
        <>
            <Route path="/settings/users" component={UsersList} />
            <Route path="/settings/users/create" component={UserCreate} />
        </>
    );
};

export default Settings;