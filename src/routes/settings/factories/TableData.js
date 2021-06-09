import moment from "moment";

export const generateColumns = (callback) => {
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
            label: "Дата создания",
            options: {
                filter: false,
                sortL: false,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "name",
            label: "Название завода",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "firmName",
            label: "Фирма",
            options: {
                filter: true,
                sort: true
            }
        },
        {
            name: "code",
            label: "Код",
            options: {
                filter: true,
                sort: false,
            }
        }
    ];
}