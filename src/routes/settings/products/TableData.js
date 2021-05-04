import { Link } from "react-router-dom";

export const generateColumns = (url) => { 

    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: true,
                sort: false,
                customBodyRender(value){
                    return <Link to={`${url}/edit/${value}`}>{value}</Link>
                }
            },
        },
        {
            name: "name",
            label: "Продукт",
            options: {
                filter: false,
                sort: true
            }
        },
        {
            name: "group",
            label: "Группа",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "measure",
            label: "Ед. измерения",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "codeTnved",
            label: "Код Тн ВЭД",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "typeOfPackaging",
            label: "Тип упаковки",
            options:{
                filter:false,
                sort:false,
            }
        }
    ];
}