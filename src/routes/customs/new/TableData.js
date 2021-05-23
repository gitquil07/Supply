import { Link } from "react-router-dom";

export const generateColumns = (url) => {
    const options = {
        filter: true,
        sort: false
    }

    return [
        {
            name: "publicId",
            label: "№",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return <Link to={`${url}/edit/${value.id}`}>{value.publicId}</Link>;
                },
            },
        },
        {
            name: "mode",
            label: "Режим",
            options
        },
        {
            name: "declarant",
            label: "Декларант",
            options: options
        },
        {
            name: "contractor",
            label: "Подрядчик",
            options
        },
        {
            name: "post",
            label: "Пост",
            options
        },
        {
            name: "sst",
            label: "сст",
            options: options
        },
        {
            name: "status",
            label: "Статус",
            options: options
        }
    ];

}