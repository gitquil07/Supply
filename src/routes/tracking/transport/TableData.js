import { propEq, find } from "ramda";
import { Link } from "react-router-dom";

export const generateColumns = (url, list) => {
    return [
        {
            name: "public_id",
            label: "№",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list)
                    return (
                        <Link to={`${url}/create/${id?.id}`}>
                            {value}
                        </Link>
                    );

                }
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
            name: "vendor",
            label: "Транспортировщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "amount",
            label: "Сумма",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "amount",
            label: "Примечание",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

}