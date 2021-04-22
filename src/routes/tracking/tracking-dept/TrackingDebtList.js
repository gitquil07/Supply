import { CustomMUIDataTable } from "../../../components/StyledMUIDataTable";
import { CustomHeader } from "../../../components/CustomHeader";
import { Button }  from "../../../components/Buttons";
import { Title } from "../../../components/Title";
import { useQuery } from "@apollo/client";
import { GET_TRACKING_DEPTS } from "./gql";

const TrackingDeptList = () => {
    const { data } = useQuery(GET_TRACKING_DEPTS);
 

    const columns = [];

    return (
        <>
            TrackingDeptList
        </>
    );
}   

export default TrackingDeptList;