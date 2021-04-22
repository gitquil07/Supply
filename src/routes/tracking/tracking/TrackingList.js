import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { Button } from "../../../components/Button";
import { Title } from "../../../components/Title"
import { columns } from "./TableData";
import { useQuery } from "@apollo/client"; 
import { GET_TRACKINGS } from "./gql";

const TrackingList = () => {

    const { data } = useQuery(GET_TRACKINGS);

    const options = {
        // 
    };
    
    const list = data?.application?.applications?.edges?.map(({node}) => {
        return {
            public_id: node.publicId,
            order: `${node.trackingUser.firstName} + ${node.trackingUser.fullName}`,
            degree_of_danger: node.degreeOfDanger,
            delivery_condition: node.deliveryCondition,
            package_on_pallet: node.packageOnPallet,
            transport_count: node.transportCount,
            transport_type: node.transportType.name,
            created_at: node.created_at,
            updated_at: node.updated_at,
            type_of_packaging: node.typeOfPackaging,
            factory: node.order.vendorFactory.name
        }
    });

    return (
        <>
            <Header>
                <Title name="Date picker"></Title>
                <Button name="Применить"></Button>
            </Header>
            <StyledMUIDataTable
                title={"Заявки на поставку"}
                data={list}
                columns={columns}
                options={options}/>
        </>
    );
}

export default TrackingList;