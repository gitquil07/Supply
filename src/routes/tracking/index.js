import {Route} from "react-router-dom";

import TrackingList from "./tracking/TrackingList";
import TrackingDetail from "./tracking/TrackingDetail";
import TrackingCreate from "./tracking/TrackingCreate";

import TrackingArrivedList from "./tracking-arrived/TrackingArrivedList";
import TrackingArrivedCreate from "./tracking-arrived/TrackingArrivedCreate";

import TrackingTransportList from "./tracking-transport/TrackingTransportList";
import TrackingTransportCreate from "./tracking-transport/TrackingTransportCreate";

import TrackingClientList from "./tracking-clients/TrackingClientList";
import TrackingClientCreate from "./tracking-clients/TrackingClientCreate";

import TrackingDeptList from "./tracking-dept/TrackingDebtList";
import TrackingDeptCreate from "./tracking-dept/TrackingDebtCreate";


const Tracking = ({match}) => {
    return (
        <>
            <Route exact path={`${match.url}`} component={TrackingList} />

            <Route path={`${match.url}/detail/:id`} component={TrackingDetail} />
            <Route path={`${match.url}/edit/:id`} component={TrackingCreate} />

            <Route path={`${match.url}/tracking-arrived`} component={TrackingArrivedList} />
            <Route path={`${match.url}/tracking-arrived/create/:id`} component={TrackingArrivedCreate} />

            <Route path={`${match.url}/tracking-transport`} component={TrackingTransportList} />
            <Route path={`${match.url}/tracking-transport/create/:id`} component={TrackingTransportCreate} />

            <Route path={`${match.url}/tracking-clients`} component={TrackingClientList} />
            <Route path={`${match.url}/tracking-clients/create/:id`} component={TrackingClientCreate} />

            <Route path={`${match.url}/tracking-dept`} component={TrackingDeptList} />
            <Route path={`${match.url}/tracking-dept/create/:id`} component={TrackingDeptCreate} />
        </>
    );
};

export default Tracking;