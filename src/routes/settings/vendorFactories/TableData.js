import { Link } from "react-router-dom";

export const generateColumns = (url) => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                sort: false,
                customBodyRender: (value) => {
                    return <Link to={`${url}/edit/${value}`}>{value}</Link>
                }
            }
        },
        {
            name: "factory",
            label: "Завод",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "vendor",
            label: "Поставщик",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "paymentCondition",
            label: "Условия оплаты", 
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "partnerStartDate",
            label: "Дата",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "isActive",
            label: "Статус",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return  value? "Активнвый" : "Не активный"
                }
            }
        },
        {
            name: "id",
            label: "Id",
            options: {
                filter: false,
                sort: false,
                display: false,
            }
        },
        // {
    //     name: "Actions",
    //     options: {
    //         customBodyRender: (value, tableMeta, updateValue) => {
    //             return (
    //                 <MatButton variant="outlined" className="btn-danger text-white" onClick={() => resetUserPassword(tableMeta.rowData[6], tableMeta.rowData[2], tableMeta.rowData[7])}>
    //                     {`RESET`}
    //                 </MatButton>
    //             );
    //         }
    //     }
    // }
    ];
}