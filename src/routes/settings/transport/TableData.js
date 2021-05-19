export const generateColumns = (callback) => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                sort:true,
                filter:true,
                customBodyRender: (value) => {
                    return <a href="#" onClick={() => {
                        callback(value);
                        return false;
                    }}>{value}</a>
                }
            }
        },
        {
            name: "name",
            label: "Название",
            options: {
                sort:true,
                filter:true,
            }            
        }
    ];

}