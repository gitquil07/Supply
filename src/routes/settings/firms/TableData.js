export const generateColumns = (callback) => {

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
                sort: true,
                filter: true,
            }
        },
        {
            name: "inn",
            label: "ИНН",
            options: {
                sort: true,
                filter: true
            }
        },
        {
            name: "factories",
            label: "Заводов",
            options: {
                sort: true,
                filter: true,
                customBodyRender: value => <div style={{ fontSize: "14px" }}>{value}</div>
            }
        }

    ];


}