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
            name: "name",
            label: "Название",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "companyName",
            label: "Название компании",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "sapCountry",
            label: "Страна",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "sapCity",
            label: "Город",
            options: {
                filter: true,
                sort:false
            }
        },
        {
            name: "sapAccountGroup",
            label: "Группа",
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: "phoneNumber",
            label: "Номер телефона",
            options: {
                filter: true,
                sort:false
            }
        },
        {
            name: "street",
            label: "Улица",
            options: {
                filter: true,
                sort:false
            }
        },
        {
            name: "house",
            label: "Дом",
            options: {
                filter: true,
                sort:false
            }
        },
        {
            name: "postcode",
            label: "Почтовый индекс",
            options: {
                filter: true,
                sort:false
            }
        },
        {
            name: "sapOkonkh",
            label: "ОКОНКХ",
            options: {
                filter: true,
                sort:false
            }
        }
    ];
} 