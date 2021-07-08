import moment from "moment";
import { Row, RowGray } from "components/Row";
import { setHeading } from "utils/functions";

export const generateColumns = (switchActivation) => {
    return [
        {
            name: "id",
            label: "ID",
            options: {
                filter: false,
                display: "excluded"
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
                sort: true,
            }
        },
        {
            name: "role",
            label: "Роли",
            options: {
                filter: true,
                sort: true,
            }
        },
        {
            name: "factories",
            label: "Заводы",
            options: {
                filter: true,
                sort: false,
                customBodyRender: (value) => {
                    return value.map(factory => <Row>{factory}</Row>);
                }
            }
        },
        {
            name: "firstName",
            label: "Имя",
            options: {
                filter: true,
                display: "none"
            }
        },
        {
            name: "lastName",
            label: "Фамилия",
            options: {
                filter: true,
                display: "none" 
            }
        },
        {
            name: "phoneNumber",
            label: "Тел. номер",
            options: {
                filter: true,
                display: "none"
            }
        }
    ];
}