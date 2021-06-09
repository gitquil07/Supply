import moment from "moment";
import { Row, RowGray } from "components/Row";
import { setHeading } from "utils/functions";
import Switch from "@material-ui/core/Switch";

export const generateColumns = (switchActivation) => {
    return [
        {
            name: "id",
            label: "ID",
            options: {
                display: "none"
            }
        },
        {
            name: "createdAt",
            label: "Дата создания",
            options: {
                filter: true,
                sort: true,
                customBodyRender: value => moment(value).format("YYYY-MM-DD")
            }
        },
        {
            name: "fioNumber",
            label: "Имя Фамилия\nНомер телефона",
            options: {
                filter: true,
                sort: true,
                customHeadRender: setHeading,
                customBodyRender: value => {
                    return (
                        <>
                            <Row>
                                {value.firstName} {value.lastName}
                            </Row>
                            <RowGray>
                                {value.phoneNumber}
                            </RowGray>
                        </>
                    );
                }
            }
        },
        {
            name: "username",
            label: "Username",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "role",
            label: "Роли",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "factories",
            label: "Заводы",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return value.join(", ");
                }
            }
        },
    ];
}