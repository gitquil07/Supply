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
            name: "createdAt",
            label: "Дата создание",
            options: options
        },
        {
            name: "transportType",
            label: "Тип транспортировки",
            options
        },
        {
            name: "typeOfPackaging",
            label: "Вид упаковки / Кол-во",
            options
        },
        {
            name: "trackingUser",
            label: "Человек для слежения",
            options: options
        }
    ];

}