import moment from "moment";

export const generateColumns = (url) => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                display: "none"
            }
        },
        {
            name: "createdAt",
            label: "Дата создания:",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "vendorFactoryProduct",
            label: "Завод / Поставщик ",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "deliveryAndProductionDayCount",
            label: "Дни изгот. / Дни дост.",
            options: {
                filter: true,
                sort: false,
            }
        }
    ];
}