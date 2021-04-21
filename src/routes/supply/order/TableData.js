export const columns = [
    {
        name: "public_id",
        label: "Номер заказа",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "factory",
        label: "Название Завода",
        options: {
            filter: true,
            sort: false,
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
        name: "status",
        label: "Статус",
        options: {
            filter: true,
            sort: true,
        }
    },
    {
        name: "invoice_proforma",
        label: "Invoice Proforma",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "invoice_date",
        label: "Invoice Date",
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