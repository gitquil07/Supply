import { Switch, Route } from "react-router-dom";
import Customs from "./customs";
import Settings from "./settings";
import Supply from "./supply";
import Tracking from "./tracking";
import { Home } from "Home";

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/tracking" component={Tracking} />
            <Route path="/supply" component={Supply} />
            <Route path="/customs" component={Customs} />
            <Route path="/settings" component={Settings} />
            <Route render={() => <h1>Page not found</h1>} />
        </Switch>
    );
};

export default Routes