import { Row } from "components/Row";
import moment from "moment";

export const generateColumns = () => {
    return [
        {
            name: "id",
            label: "№",
            options: {
                display: "none"
            }
        },
        {
            name: "createdAt",
            label: "Дата создания заявки",
            options: {
                filter: true,
                sort: false,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "vendor",
            label: "Транспортировщик",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return (
                        <>
                            <Row>
                                <b>{value.vendor}</b>
                            </Row>
                            {value.trNumber}
                        </>
                    )
                }
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