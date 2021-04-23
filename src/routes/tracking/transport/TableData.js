import { propEq, find } from "ramda";
import { Link } from "react-router-dom";

export const generateColumns = (url, list) => {
    return [
            {
                name: "public_id",
                label: "Номер слежки",
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

}