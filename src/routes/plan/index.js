import { Helmet } from "react-helmet";
import { BulkUpload } from "components/BulkUpload";
import { useTitle } from "hooks";
import { GET_PLAN_PRODUCT, CREATE_PLAN_PRODUCT_FILE } from "./gql";

const Plan = () => {

    const title = useTitle("План");

    return (
        <>
            <Helmet title={title}/>
            <BulkUpload  
                keyName="planProductTemplate"
                message="Данные"
                query={GET_PLAN_PRODUCT}  
                mutation={CREATE_PLAN_PRODUCT_FILE} />
        </>
    );

}

export default Plan;