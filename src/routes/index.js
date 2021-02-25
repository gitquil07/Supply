import { Switch, Route } from "react-router-dom";
import Customs from "./customs";
import Settings from "./settings";
import Supply from "./supply";
import Tracking from "./tracking";

const Routes = () => {
    return (
        <Switch>
            <Route path="/supply" component={Supply} />
            <Route path="/tracking" component={Tracking} />
            <Route path="/customs" component={Customs} />
            <Route path="/settings" component={Settings} />
        </Switch>
    );
};

export default Routes