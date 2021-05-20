import { Route, Redirect } from "react-router-dom";
import Login from "./login";

const Auth = () => {
    return (
        <>
            <Route path="/login" component={Login} />
            <Route render={() => <Redirect to="/login"/> }/>
        </>
    );
}

export default Auth;