export const generateColumns = (url) => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                display: "none"
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
            label: "Код тн вэд",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "typeOfPackaging",
            label: "Тип упаковки",
            options: {
                filter: false,
                sort: false,
            }
        }
    ];
}