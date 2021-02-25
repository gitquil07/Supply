import styled from "styled-components";
import { Title } from "../../../components/Title";
import { Button } from "../../../components/Button";
import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";

const UsersList = () => {

    const columns = [
        {
            name: "first_name",
            label: "Имя",
            options: {
                filter: true,
                sort: false,
            }
        },
        {
            name: "last_name",
            label: "Фамилия",
            options: {
                filter: true,
                sort: true,
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
            name: "phone_number",
            label: "Номер телефона",
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
            }
        },
        {
            name: "id",
            label: "Id",
            options: {
                filter: false,
                sort: false,
                display: false,
            }
        },
        // {
        //     name: "Actions",
        //     options: {
        //         customBodyRender: (value, tableMeta, updateValue) => {
        //             return (
        //                 <MatButton variant="outlined" className="btn-danger text-white" onClick={() => resetUserPassword(tableMeta.rowData[6], tableMeta.rowData[2], tableMeta.rowData[7])}>
        //                     {`RESET`}
        //                 </MatButton>
        //             );
        //         }
        //     }
        // }
    ];

    const data = [
        ["Joe James", "Test Corp", "Yonkers", "NY", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Yonkers", "NY"],
        ["Joe James", "Test Corp", "Yonkers", "NY", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Yonkers", "NY"],
        ["Joe James", "Test Corp", "Yonkers", "NY", "Yonkers", "NY"],
        ["John Walsh", "Test Corp", "Hartford", "CT", "Yonkers", "NY"],
        ["Bob Herm", "Test Corp", "Tampa", "FL", "Yonkers", "NY"],
        ["James Houston", "Test Corp", "Dallas", "TX", "Yonkers", "NY"],
    ];

    const options = {
        filterType: 'checkbox',
    };

    return (
        <>
            <Header>
                <Title name="Пользователи" />
                <Button name="Создать пользователя" />
            </Header>
            <StyledMUIDataTable
                title={"Список всех сотрудников"}
                data={data}
                columns={columns}
                options={options}
            />
        </>
    );
};

export default UsersList;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;