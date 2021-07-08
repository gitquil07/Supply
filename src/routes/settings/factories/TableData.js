import moment from "moment";

export const generateColumns = (callback) => {
    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: "excluded"
            }
        },
        {
            name: "createdAt",
            label: "Дата создания",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "name",
            label: "Название завода",
            options: {
                filter: true,
                sort: true,
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
                sort: true,
            }
        }
    ];
}