import { propEq, find } from "ramda";
import { Link } from "react-router-dom";

export const generateColumns = (url, list) => {
    const options = {
        filter: true,
        sort: false
    }

    return [
        {
            name: "public_id",
            label: "№",
            options: {
                filter: true,
                customBodyRender: (value, tableMeta, updateValue) => {
                    const id = find(propEq("public_id", value))(list);
                    return <Link to={`${url}/create/${id?.id}`}>{value}</Link>;
                },
            },
        },
        {
            name: "",
            label: "Дата создание",
            options: options
        },
        {
            name: "",
            label: "Тип транспорта / Кол-во",
            options: options
        },
        {
            name: "",
            label: "Вид упаковки / Кол-во",
            options: options,
        },
        {
            name: "",
            label: "Человек для слежения",
            options: options
        }
    ];

}