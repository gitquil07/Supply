export const generateColumns = () => {
    return  [
        {
            name: "id",
            label: "№",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "name",
            label: "Имя",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "created_at",
            label: "Создано",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "role",
            label: "Тип",
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
            name: "city",
            label: "Откуда",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "load_city",
            label: "Куда",
            options: {
                filter: true,
                sort: false,
            }
        },
    ];
}