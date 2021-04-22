import { Route } from "react-router-dom";

import NewCustomsList from "./new-customs/NewCustomsList";
import NewCustomsCreate from "./new-customs/NewCustomsCreate";

import ReadyCustomsList from "./ready-customs/ReadyCustomsList";
import ReadyCustomsCreate from "./ready-customs/ReadyCustomsCreate";

import NoMoneyCustomsList from "./no-money-customs/NoMoneyCustomsList";
import NoMoneyCustomsCreate from "./no-money-customs/NoMoneyCustomsCreate";

import NoDocumentCustomsList from "./no-document-customs/NoDocumentCustomsList";
import NoDocumentCustomsCreate from "./no-document-customs/NoDocumentCustomsCreate";

import CertificateCustomsList from "./certificate-customs/CertificateCustomsList";
import CertificateCustomsCreate from "./certificate-customs/CertificateCustomsCreate";

import NoTypedCustomsList from "./no-typed-customs/NoTypedCustomsList";
import NoTypedCustomsCreate from "./no-typed-customs/NoTypedCustomsCreate";

import ClosedCustomsList from "./closed-customs/ClosedCustomsList";
import ClosedCustomsDetail from "./closed-customs/ClosedCustomsDetail";

const Customs = ({match}) => {
    return (
        <>
            <Route path={`${match.url}/new-customs`} component={NewCustomsList} />
            <Route path={`${match.url}/new-customs/create/:id`} component={NewCustomsCreate} />

            <Route path={`${match.url}/ready-customs`} component={ReadyCustomsList} />
            <Route path={`${match.url}/ready-customs/create/:id`} component={ReadyCustomsCreate} />

            <Route path={`${match.url}/no-money-customs`} component={NoMoneyCustomsList} />
            <Route path={`${match.url}/no-money-customs/create/:id`} component={NoMoneyCustomsCreate} />

            <Route path={`${match.url}/no-document-customs`} component={NoDocumentCustomsList} />
            <Route path={`${match.url}/no-document-customs/create/:id`} component={NoDocumentCustomsCreate} />

            <Route path={`${match.url}/certificate-customs`} component={CertificateCustomsList} />
            <Route path={`${match.url}/certificate-customs/create/:id`} component={CertificateCustomsCreate} />

            <Route path={`${match.url}/no-typed-customs`} component={NoTypedCustomsList} />
            <Route path={`${match.url}/no-typed-customs/create/:id`} component={NoTypedCustomsCreate} />

            <Route path={`${match.url}/closed-customs`} component={ClosedCustomsList} />
            <Route path={`${match.url}/closed-customs/detail/:id`} component={ClosedCustomsDetail} />

        </>
    );
}

export default Customs;