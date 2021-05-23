export const generateColumns = (callback) => {
    const options = {
        filter: true,
        sort: false
    }

    return [
        {
            name: "publicId",
            label: "№",
            options: {
                filter: true,
                customBodyRender: (value) => {
                    return <a href="#" onClick={() => {
                        callback(value.id);
                        return false;
                    }}>{value.publicId}</a>;
                },
            },
        },
        {
            name: "createdAt",
            label: "Дата создание",
            options: options
        },
        {
            name: "transportType",
            label: "Тип транспортировки",
            options
        },
        {
            name: "typeOfPackaging",
            label: "Вид упаковки / Кол-во",
            options
        },
        {
            name: "trackingUser",
            label: "Человек для слежения",
            options: options
        }
    ];

}