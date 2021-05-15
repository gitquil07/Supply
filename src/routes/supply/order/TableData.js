import { propEq, find } from "ramda";
import { Link } from "react-router-dom";

export const generateColumns = (url) => {
    const options = {
        filter: true,
        sort: false
    }

    return [
        {
            name: "public_id",
            label: "Номер заказа",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return <Link to={`${url}/edit/${value.id}`}>{value.publicId}</Link>
                },
            },
        },
        {
            name: "factory",
            label: "Название Завода",
            options: options
        },
        {
            name: "vendor",
            label: "Поставщик",
            options: options
        },
        {
            name: "status",
            label: "Статус",
            options: options
        },
        {
            name: "invoice_proforma",
            label: "Инвойс",
            options: options
        },
        {
            name: "invoice_date",
            label: "Дата инвойса",
            options: options
        },
        {
            name: "created_at",
            label: "Дата создания заказа",
            options: options
        },
    ];

}