import { Helmet } from "react-helmet";
import { BulkUpload } from "components/BulkUpload";
import { useTitle } from "hooks";
import { GET_PLAN_PRODUCT } from "./gql";

const Plan = () => {

    const title = useTitle("План");

    return (
        <>
            <Helmet title={title}/>
            <BulkUpload query={GET_PLAN_PRODUCT} key="planProductTemplate" />
        </>
    );

}

export default Plan;