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