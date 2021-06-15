import { setHeading } from "utils/functions";

export const generateColumns = () => {
    const options = {
        filter: true,
        sort: false
    }

    return [
        {
            name: "id",
            options: {
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
            options: options
        },
        {
            name: "vendorFactory",
            label: "Завод / Поставщик",
            options: {
                ...options,
                customBodyRender: value => {
                    return <>{value.factory} / {value.vendor}</>
                }
            }
        },
        {
            name: "invoice_proforma",
            label: "№ инвойс проформа",
            options: {
                ...options,
                customHeadRender: setHeading,
                customBodyRender: value => "№"+value
            }
        },
        {
            name: "invoice_date",
            label: "Дата инвойс проформа",
            options: {
                ...options,
                customHeadRender: setHeading
            }
        },
    ];

}