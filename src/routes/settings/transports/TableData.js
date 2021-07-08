export const generateColumns = (callback) => {

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
            name: "name",
            label: "Название",
            options: {
                sort:true,
                filter:true,
            }            
        },
        {
            name: "customsDayCount",
            label: "Кол-во дней",
            options: {
                sort: true,
                filter: true
            }            
        }
    ];

}