export const generateColumns = () => {
    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: "none"
            }
        },
        {
            name: "partnerStartDate",
            label: "Начало сотрудничества",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "factory",
            label: "Завод",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "vendor",
            label: "Партнер",
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
                sort: true,
            }
        },
        {
            name: "isActive",
            label: "Статус",
            options: {
                filter: true,
                sort: true,
                customBodyRender: (value) => {
                    return value ? "Активный" : "Неактивный"
                }
            }
        },
        // {
        //     name: "id",
        //     label: "Id",
        //     options: {
        //         filter: false,
        //         sort: false,
        //         display: false,
        //     }
        // },
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