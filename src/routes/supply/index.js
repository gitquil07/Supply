import { Route, Switch } from "react-router-dom"
import OrderList from "./order/OrderList"

const Supply = () => {
    return (
        <Switch>
            <Route path="/supply/order" component={OrderList} exact />
            <Route path="/supply/order/detail" render={() => <h3>Order Detail</h3>} />
            <Route path="/supply/order/create" render={() => <h3>Order Create</h3>} />
        </Switch>
    );
};

export default Supply;