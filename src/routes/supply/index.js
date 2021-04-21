import { Route, Switch } from "react-router-dom"
import OrderDetail from "./order/OrderDetail";
import OrderList from "./order/OrderList"

const Supply = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}/order`} component={OrderList} exact />
            <Route path={`${match.url}/order/detail`} component={OrderDetail} />
            <Route path={`${match.url}/order/create`} render={() => <h3>Order Create</h3>} />
        </Switch>
    );
};

export default Supply;