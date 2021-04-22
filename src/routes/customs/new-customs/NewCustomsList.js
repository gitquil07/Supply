import { useQuery } from "@apollo/client";
import { GET_NEW_CUSTOMS } from "./gql";
import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { Button } from "../../../components/Button";
import { Title } from "../../../components/Title";
import { HeaderForFilter } from "../../../components/HeaderForFilter";
import { propEq, find } from "ramda";
import { Link } from "react-router-dom";


const NewCustomsList = ({match}) => {

    const { data } = useQuery(GET_NEW_CUSTOMS)

    const columns = [
        {
            name: "public_id",
            label: "Номер заявки",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list)
                    return (
                        <Link to={`${match.url}/${id?.id}`}>
                            {value}
                        </Link>
                    );

                }
            }
        },
        {
            name: "order",
            label: "Поставщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "degree_of_danger",
            label: "Степень опасности",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "delivery_condition",
            label: "Способ доставки",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "package_on_pallet",
            label: "Кол-во Паддонов",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "transport_count",
            label: "Кол-во транспорта",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "status",
            label: "Статус",
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
            name: "updated_at",
            label: "Дата поставки",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "type_of_packaging",
            label: "Вид упаковки",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    const list = []; 

    const options = {
     
    };

    return (
       <>
            <HeaderForFilter>
                <Title name="Date picker"></Title>
                <Button name="Применить"></Button>
            </HeaderForFilter>
            <StyledMUIDataTable
                title={"Заявки на поставку"}
                data={list}
                columns={columns}
                options={options} />
       </>
    )
}

export default NewCustomsList;
