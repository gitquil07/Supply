import { Switch, Route } from "react-router-dom";
import Customs from "./customs";
import Settings from "./settings";
import Supply from "./supply";
import Tracking from "./tracking";
import StockBalance from "./stockBalance";
import Plan from "./plan";
import { Home } from "Home";

console.log("Plan", Plan);

const Routes = () => {
    return (
        <Switch>
            <Route path="/" component={Home} exact />
            <Route path="/tracking" component={Tracking} />
            <Route path="/supply" component={Supply} />
            <Route path="/customs" component={Customs} />
            <Route path="/settings" component={Settings} />
            <Route path="/stock-balance" component={StockBalance} />
            <Route path="/plan-product" component={Plan} />
            <Route render={() => <h1>Page not found</h1>} />
        </Switch>
    );
};

export default Routes