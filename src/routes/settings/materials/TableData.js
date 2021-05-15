import { Link } from "react-router-dom";

export const generateColumns = (url) => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return <Link to={`${url}/edit/${value}`}>{value}</Link>
                }
            }
        },
        {
            name: "updatedAt",
            label: "Дата изменения:",
            options: {
                filter: true,
                sort: true,
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