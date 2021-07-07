import { Row } from "components/Row"
export const generateColumns = (callback) => {

    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: "exluded"
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
            label: "Заводы",
            options: {
                sort: false,
                filter: false,
                customBodyRender: value => value.map(factory => <Row>{factory}</Row>)
            }
        }

    ];


}