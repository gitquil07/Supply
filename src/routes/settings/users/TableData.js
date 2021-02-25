export const columns = [
    {
        name: "first_name",
        label: "Имя",
        options: {
            filter: true,
            sort: false,
        }
    },
    {
        name: "last_name",
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
        name: "phone_number",
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