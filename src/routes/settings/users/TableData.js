export const generateColumns = () => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                display: "none"
            }
        },
        {
            name: "firstName",
            label: "Имя",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "lastName",
            label: "Фамилия",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "username",
            label: "Username",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "phoneNumber",
            label: "Номер телефона",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "role",
            label: "Роли",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "factories",
            label: "Заводы",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return value.join(", ");
                }
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