import moment from "moment";

export const generateColumns = (callback) => {
    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return <a href="#" onClick={() => {
                        callback(value);
                        return false;
                    }}>{value}</a>
                }
            }
        },
        {
            name: "code",
            label: "Код",
            options: {
                filter: true,
                sort: false,
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
            name: "officialName",
            label: "Официальное название завода",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "position",
            label: "Позиция",
            options: {
                filter: true,
                sort: false
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
        }
    ];
} 