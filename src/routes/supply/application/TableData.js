import { Link } from "react-router-dom";
import moment from "moment";

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
            options: {
                ...options,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
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