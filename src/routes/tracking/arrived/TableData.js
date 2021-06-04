import { Row, RowGray } from "components/Row";
import moment from "moment";
import { setHeading } from "utils/functions";

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
            label: "Транспортировщик\nНомер транспорта",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: (value) => {
                    return (
                        <>
                            <Row>
                                <b>{value.vendor}</b>
                            </Row>
                            <RowGray>
                                {value.trNumber}
                            </RowGray>
                        </>
                    )
                }
            }
        },
        {
            name: "amount",
            label: "Сумма\nНетто / Брутто",
            options: {
                filter: true,
                sort: false,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return (
                        <>
                            <Row>{value.amount} {value.currency}</Row>
                            <RowGray>{value.netto} кг / {value.brutto} кг</RowGray>
                        </>
                    );
                }
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