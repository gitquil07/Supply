export const generateColumns = (url) => {
    return [
        {
            name: "id",
            label: "ID",
            options: {
                display: "none"
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
            name: "phoneNumber",
            label: "Номер телефона",
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: "street",
            label: "Улица",
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: "house",
            label: "Дом",
            options: {
                filter: true,
                sort: false
            }
        },
        {
            name: "postcode",
            label: "Почтовый индекс",
            options: {
                filter: true,
                sort: false
            }
        },
    ];
}