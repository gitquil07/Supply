import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { HeaderForFilter } from "../../../components/HeaderForFilter";
import { Button }  from "../../../components/Button";
import { Title } from "../../../components/Title";
import { useQuery } from "@apollo/client";
import { GET_TRACKING_DEPTS } from "./gql";

const TrackingDeptList = () => {
    const { data } = useQuery(GET_TRACKING_DEPTS);

    const options = {};

    const columns = [];

    return (
        <>
            TrackingDeptList
        </>
    );
}   

export default TrackingDeptList;