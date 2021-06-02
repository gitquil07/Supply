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