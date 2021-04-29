import { propEq, find } from "ramda";
import { Link } from "react-router-dom";

export const generateColumns = (url, list) => {
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
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list);
                    return <Link to={`${url}/detail/${id?.id}`}>{value}</Link>;
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
            label: "Invoice Proforma",
            options: options
        },
        {
            name: "invoice_date",
            label: "Invoice Date",
            options: options
        },
        {
            name: "created_at",
            label: "Дата создания заказа",
            options: options
        },
    ];

}