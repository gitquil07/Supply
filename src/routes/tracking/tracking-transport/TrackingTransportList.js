import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { HeaderForFilter } from "../../../components/HeaderForFilter";
import { Button }  from "../../../components/Button";
import { Title } from "../../../components/Title";
import { useQuery } from "@apollo/client";
import { GET_TRACKING_TRASNPORTS } from "./gql";
import { find, propEq } from "ramda";
import { Link } from "react-router-dom";

const TrackingTransportList = ({match}) => {
    const { data } = useQuery(GET_TRACKING_TRASNPORTS);

    const list = [];

    const options = {};

    const columns = [
        {
            name: "public_id",
            label: "Номер слежки",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list)
                    return (
                        <Link to={`${match.url}/create/${id?.id}`}>
                            {value}
                        </Link>
                    );

                }
            }
        },
        {
            name: "vendor",
            label: "Поставщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "locations",
            label: "Место нахождений",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "transport_number",
            label: "Номер транспорта",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "created_at",
            label: "Дата создания заявки",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "tr_date",
            label: "Дата поставки",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "amount",
            label: "Сумма транспортировки",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    return (
        <>
            <HeaderForFilter>
                <Title name="DatePicker" />
                <Button name="Применить" />
            </HeaderForFilter>
            <StyledMUIDataTable
                title="Заявки на слежение"
                columns={columns}
                data={list}
                options={options}
            />
        </>
    );
}   

export default TrackingTransportList;