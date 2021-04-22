import { useQuery } from "@apollo/client";
import { GET_NO_TYPED_CUSTOMS } from "./gql";
import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { Button } from "../../../components/Button";
import { Title } from "../../../components/Title";
import { HeaderForFilter } from "../../../components/HeaderForFilter";
import { propEq, find } from "ramda";
import { Link } from "react-router-dom";



const NoTypedCustomsList = ({match}) => {
    const { data } = useQuery(GET_NO_TYPED_CUSTOMS);

    const list = [];

    const columns = [
        {
            name: "public_id",
            label: "Заказ номера",
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
            name: "application",
            label: "Название Завода / Поставщик",
            options: {
                filter: true,
                sort: false,
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
            name: "transport_type",
            label: "Тип транспорта",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "invoices",
            label: "Инвойсы",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "created_at",
            label: "Дата создания заказа",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

    const options = {
        filterType: 'dropdown',
        responsive: 'stacked'
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
export default NoTypedCustomsList;
