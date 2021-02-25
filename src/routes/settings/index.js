import { Route, Switch } from "react-router-dom";
import UsersList from "./users/UsersList";

const Settings = () => {
    return (
        <Switch>
            <Route path="/settings/users" component={UsersList} />
        </Switch>
    );
};

export default Settings;