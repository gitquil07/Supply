import { Route } from "react-router-dom";

// import NewList from "./new/NewList";
// import NewCreate from "./new/NewCreate";

import ReadyList from "./ready/ReadyList";
// import ReadyCreate from "./ready/ReadyCreate";

import NoMoneyList from "./no-money/NoMoneyList";
// import NoMoneyCreate from "./no-money/NoMoneyCreate";

import NoDocumentList from "./no-document/NoDocumentList";
// import NoDocumentCustomsCreate from "./no-document/NoDocumentCreate";

import CertificateList from "./certificate/CertificateList";
// import CertificateCreate from "./certificate/CertificateCreate";

import NoTypedList from "./no-typed/NoTypedList";
// import NoTypedCreate from "./no-typed/NoTypedCreate";

import ClosedList from "./closed/ClosedList";
// import ClosedDetail from "./closed/ClosedDetail";

import NewList from "./new/NewList";
import CustomCreate from "./new/NewCreate";

import { ProtectedRoute } from "authorization/routes";

const Customs = ({ match }) => {
    return (
        <>
            {/* <Route path={`${match.url}/new`} component={NewList} />
            <Route path={`${match.url}/new/edit/:id`} component={NewCreate} /> */}

            <ProtectedRoute path={`${match.url}/ready`} component={ReadyList} exact />
            <ProtectedRoute path={`${match.url}/ready/edit/:id`} component={CustomCreate} />

            <ProtectedRoute path={`${match.url}/no-money`} component={NoMoneyList} exact />
            <ProtectedRoute path={`${match.url}/no-money/edit/:id`} component={CustomCreate} />

            <ProtectedRoute path={`${match.url}/no-document`} component={NoDocumentList} exact />
            <ProtectedRoute path={`${match.url}/no-document/edit/:id`} component={CustomCreate} />

            <ProtectedRoute path={`${match.url}/certificate`} component={CertificateList} exact />
            <ProtectedRoute path={`${match.url}/certificate/edit/:id`} component={CustomCreate} />

            <ProtectedRoute path={`${match.url}/no-typed`} component={NoTypedList} exact />
            <ProtectedRoute path={`${match.url}/no-typed/edit/:id`} component={CustomCreate} />

            <ProtectedRoute path={`${match.url}/closed`} component={ClosedList} exact />
            <ProtectedRoute path={`${match.url}/closed/edit/:id`} component={CustomCreate} />

            <ProtectedRoute path={`${match.url}/new`} component={NewList} exact />
            <ProtectedRoute path={`${match.url}/new/create`} component={CustomCreate} />
            <ProtectedRoute path={`${match.url}/new/edit/:id`} component={CustomCreate} />
        </>
    );
}

export default Customs;