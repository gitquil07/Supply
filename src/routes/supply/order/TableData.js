import { TwoRows } from "components/Row"
import moment from "moment";
import { setHeading } from "utils/functions";

export const generateColumns = () => {
    const options = {
        filter: true,
        sort: true
    }

    return [
        {
            name: "id",
            options: {
                filter: false,
                display: "none"
            }
        },
        {
            name: "pk",
            label: "Номер заказа",
            options: options
        },
        {
            name: "status",
            label: "Статус заказа",
            options: options
        },
        {
            name: "created_at",
            label: "Дата создания заказа",
            options: {
                ...options,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "vendorFactory",
            label: "Завод / Поставщик",
            options: {
                filter: false,
                sort: false,
                customBodyRender: value => {
                    return <>{value.factory} / {value.vendor}</>
                }
            }
        },
        {
            name: "invoice_proforma",
            label: "№ инвойс проформа",
            options: {
                ...options
            }
        },
        {
            name: "invoice_date",
            label: "Дата инвойс проформа",
            options: {
                ...options,
                sort: true,
            }
        },
        {
            name: "factory",
            label: "Завод",
            options: {
                filter: true,
                sort: false,
                display: "none",
            }
        },
        {
            name: "vendor",
            label: "Поставщик",
            options: {
                fitler: true,
                sort: false,
                display: "none"
            }
        }
    ];

}