import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { HeaderForFilter } from "../../../components/HeaderForFilter";
import { Button }  from "../../../components/Button";
import { Title } from "../../../components/Title";
import { useQuery } from "@apollo/client";
import { GET_TRACKING_CLIENTS } from "./gql";

const TrackingClientList = () => {
    const { data } = useQuery(GET_TRACKING_CLIENTS);

    const list = [];

    const options = {};

    const columns = [
        {
            name: "id",
            label: "№",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name",
            label: "Имя",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "created_at",
            label: "Создано",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "role",
            label: "Тип",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phone_number",
            label: "Номер телефона",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "city",
            label: "Откуда",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "load_city",
            label: "Куда",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    return (
        <>
            <HeaderForFilter>
                <Button name="Создать" />
            </HeaderForFilter>
            <StyledMUIDataTable 
                title="Список трансрортных команий"
                data={list}
                columns={columns}
                options={options}/>
        </>
    );
}   

export default TrackingClientList;