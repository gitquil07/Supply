export const generateColumns = () => {
    const options = {
        filter: true,
        sort: false
    }

    return [
        {
            name: "id",
            label: "Номер заказа",
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
            label: "Инвойс",
            options: {
                ...options,
                customBodyRender: value => "№"+value
            }
        },
        {
            name: "invoice_date",
            label: "Дата инвойса",
            options: options
        },
    ];

}