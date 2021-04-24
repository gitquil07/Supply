import { propEq, find } from "ramda";
import { Link } from "react-router-dom";

export const generateColumns = (url, list) => {
    return [
        {
            name: "public_id",
            label: "Номер заявки",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list)
                    return (
                        <Link to={`${url}/${id?.id}`}>
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
}