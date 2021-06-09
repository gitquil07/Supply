import { Helmet } from "react-helmet";

import { PAGINATE_USERS, UPDATE_USER } from "./gql";
import { generateColumns } from "./TableData";
import { useTitle } from "hooks";
import { FlexForHeader } from "components/Flex";
import { ButtonWithIcon } from "components/Buttons";
import { CustomMUIDataTable } from "components/CustomMUIDataTable";
import { Pagination } from "components/Pagination";
import UserCreate from "./UserCreate";
import { useState, useMemo } from "react";
import { usePagination, useSwitchState } from "hooks";
import { CustomRowGeneratorForModal, getList } from "utils/functions";

const UsersList = () => {
    const title = useTitle("Пользователи");
    const [createOpen, setCreateOpen] = useState(false);
    const [id, setId] = useState(undefined);

    const { update } = useSwitchState(UPDATE_USER);

    const {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        dataPaginationRes,
        setMutateState,
        setIsFirstPage
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
                pk: node.pk,
                firstName: node.firstName,
                lastName: node.lastName,
                phoneNumber: node.phoneNumber,
                fioNumber: { firstName: node.firstName, lastName: node.lastName, phoneNumber: node.phoneNumber },
                username: node.username,
                role: node.role?.displayName,
                email: node?.email,
                password: node?.password,
                factories: node.factories?.edges.map(({node}) => node.name),
                createdAt: node.createdAt,
                isActive: node.isActive
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

    const switchActivation = (pk, state) => {

        update({
            variables: {
                input: {
                    pk,
                    data: {
                        isActive: state
                    }
                }
            }
        })

    }

    const columns = useMemo(() => generateColumns(switchActivation), []);

    return (
        <>
            <UserCreate isOpen={createOpen} close={close} entry={user}
                setMutateState={setMutateState} getEntries={getDataPagination} setIsFirstPage={setIsFirstPage} amountOfElemsPerPage={amountOfElemsPerPage} paginatingState={paginatingState} />
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