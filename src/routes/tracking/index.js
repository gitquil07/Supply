import { Route } from "react-router-dom";

import TrackingList from "./tracking/TrackingList";
import TrackingDetail from "./tracking/TrackingDetail";
import TrackingCreate from "./tracking/TrackingCreate";

import ArrivedList from "./arrived/ArrivedList";
import ArrivedCreate from "./arrived/ArrivedCreate";

import TransportList from "./transport/TransportList";
import TransportCreate from "./transport/TransportCreate";

import ClientList from "./clients/ClientList";
import ClientCreate from "./clients/ClientCreate";

import DeptList from "./dept/DebtList";
import DeptCreate from "./dept/DebtCreate";


const Tracking = ({ match }) => {
    return (
        <>
            <Route exact path={`${match.url}`} component={TrackingList} />

            <Route path={`${match.url}/detail/:id`} component={TrackingDetail} />
            <Route path={`${match.url}/edit/:id`} component={TrackingCreate} />

            <Route path={`${match.url}/arrived`} component={ArrivedList} />
            <Route path={`${match.url}/arrived/create/:id`} component={ArrivedCreate} />

            <Route path={`${match.url}/transport`} component={TransportList} />
            <Route path={`${match.url}/transport/create/:id`} component={TransportCreate} />

            <Route path={`${match.url}/clients`} component={ClientList} />
            <Route path={`${match.url}/clients/create/:id`} component={ClientCreate} />

            <Route path={`${match.url}/dept`} component={DeptList} />
            <Route path={`${match.url}/dept/create/:id`} component={DeptCreate} />
        </>
    );
};

export default Tracking;