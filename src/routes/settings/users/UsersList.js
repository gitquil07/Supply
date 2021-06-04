import { Helmet } from "react-helmet";

import { PAGINATE_USERS } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "../../../hooks";
import { FlexForHeader } from "../../../components/Flex";
import { ButtonWithIcon } from "../../../components/Buttons";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { Pagination } from "../../../components/Pagination";
import UserCreate from "./UserCreate";
import { useState, useMemo } from "react";
import { usePagination } from "../../../hooks";
import { CustomRowGenerator, CustomRowGeneratorForModal, getList } from "../../../utils/functions";

const UsersList = () => {
    const title = useTitle("Пользователи");
    const [createOpen, setCreateOpen] = useState(false);
    const [id, setId] = useState(undefined);

    const {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        dataPaginationRes,
        setMutateState
    } = usePagination({
        qraphQlQuery: PAGINATE_USERS,
        singular: "account",
        plural: "users"
    });

    const paginationParams = {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage
    }

    const users = getList(dataPaginationRes?.data) || [];
    const list = useMemo(() => {
        return users.map(({ node }) => {
            return {
                id: node.id,
                firstName: node.firstName,
                lastName: node.lastName,
                phoneNumber: node.phoneNumber,
                fioNumber: { firstName: node.firstName, lastName: node.lastName, phoneNumber: node.phoneNumber },
                username: node.username,
                role: node.role?.displayName,
                email: node?.email,
                password: node?.password,
                factories: node.factories?.edges.map(({node}) => node.name),
                createdAt: node.createdAt
            }
        });
    }, [users]);

    const user = list?.find(user => user.id === id);
    console.log("user", user);

    const editEntry = (id) => {
        setId(id);
        setCreateOpen(true);
    }

    const close = () => {
        setId(undefined);
        setCreateOpen(false);
    }

    const columns = useMemo(() => generateColumns(editEntry), []);

    return (
        <>
            <UserCreate isOpen={createOpen} close={close} entry={user}
                setMutateState={setMutateState} getEntries={getDataPagination} amountOfElemsPerPage={amountOfElemsPerPage} paginatingState={paginatingState} />
            <Helmet title={title} />
            <FlexForHeader>
                <ButtonWithIcon name="Создать пользователя" clicked={() => setCreateOpen(true)} url="#" />
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список всех сотрудников"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGeneratorForModal(editEntry)}
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default UsersList;