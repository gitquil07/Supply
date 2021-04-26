import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { CustomHeader } from "../../../components/CustomHeader";
import { Button }  from "../../../components/Buttons";
import { Title } from "../../../components/Title";
import { useQuery } from "@apollo/client";
import { GET_TRACKING_DEPTS } from "./gql";

const DeptList = () => {
    const { data } = useQuery(GET_TRACKING_DEPTS);
 

    const columns = [];

    return (
        <>
            DeptList
        </>
    );
}   

export default DeptList;