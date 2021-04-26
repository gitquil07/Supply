import { propEq, find } from "ramda";
import { Link } from "react-router-dom";

export const generateColumns = (url, list) => {
    return  [
        {
            name: "public_id",
            label: "Заказ номера",
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
}