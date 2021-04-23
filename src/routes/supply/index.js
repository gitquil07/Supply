import { Route, Switch } from "react-router-dom"
import OrderCreate from "./order/OrderCreate";
import OrderDetail from "./order/OrderDetail";
import OrderList from "./order/OrderList"

const Supply = ({ match }) => {
    return (
        <Switch>
            <Route path={`${match.url}/order`} component={OrderList} exact />
            <Route path={`${match.url}/order/detail`} component={OrderDetail} />
            <Route path={`${match.url}/order/create`} component={OrderCreate} />
        </Switch>
    );
};

export default Supply;