export const generateColumns = (url) => {
    return [
        {
            name: "publicId",
            label: "№",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return <a href={`${url}/edit/${value.id}`} onClick={() => false}>{value.publicId}</a> 
                }
            }
        },
        {
            name: "createdAt",
            label: "Дата создания заявки",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "vendor",
            label: "Транспортировщик",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "amount",
            label: "Сумма",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "note",
            label: "Примечание",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];

}