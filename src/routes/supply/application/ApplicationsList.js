import { useContext } from "react";
import { Helmet } from 'react-helmet';
import { useTitle } from 'hooks';
import DatePickers from 'components/Inputs/DatePickers';
import { CustomMUIDataTable } from "components/CustomMUIDataTable";
import { APPLICATIONS } from './gql';
import { generateColumns } from './TableData';
import { useMemo } from 'react';
import { FlexForHeader } from "components/Flex";
import { ButtonWithIcon } from "components/Buttons";
import { Pagination } from 'components/Pagination';
import { usePagination } from "hooks";
import { CustomRowGenerator, getList } from "utils/functions";
import { statuses } from "utils/static"
import { UserContext } from "context/UserContext";
import { checkPrivilege } from "authorization/authCheck";



const ApplicationList = ({ match }) => {

    const { role } = useContext(UserContext);

    const title = useTitle("Заявки на Логистику");
    const {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        dataPaginationRes,


        // For pages which has date filter
        toDate,
        fromDate,
        fromDateChange,
        setFromDateChange,
        toDateChange,
        setToDateChange,
        handleDateApply
    } = usePagination({
        type: "dateFilter",
        qraphQlQuery: APPLICATIONS,
        singular: "application",
        plural: "applications"
    });


    const paginationParams = {
        toDate,
        fromDate,
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        type: "dateFilter"
    }

    const applications = getList(dataPaginationRes?.data) || [];
    let list = applications.map(({ node }) => {
        return {
            ...node,
            id: node.id,
            transportType: node?.transportType?.name,
            count: node?.count,
            deliveryCondition: node?.deliveryCondition,
            transportTypeCountDelivery: { transportType: node.transportType.name, transportCount: node.transportCount, deliveryCondition: node.deliveryCondition },
            typeOfPackaging: node.typeOfPackaging,
            trackingUser: node.trackingUser?.username,
            status: statuses.find(status => status.value == node.status)?.label,
            invoices: node.invoices.edges.map(({node}) => node.number).join(", ")
        }
    });

    const searchableFields = [
        "invoices",
        "transportType",
        "transportCount",
        "deliveryCondition",
        "trackingUser",
        "createdAt",
        "status"
    ]


    const { url } = match;
    const columns = useMemo(() => generateColumns(url), []);

    return (
        <>
            <Helmet title={title} />
            <FlexForHeader>
                <DatePickers mR="15px"
                    fromDate={fromDateChange}
                    toDate={toDateChange}
                    changeFrom={setFromDateChange}
                    changeTo={setToDateChange}
                    buttonClicked={handleDateApply}
                />
                {
                    checkPrivilege(role, "allowApplicationCreate") && <ButtonWithIcon name="создать заявку" url={`${match.url}/create`} />
                }
            </FlexForHeader>
            <CustomMUIDataTable
                title={"Список заявок"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGenerator(url)}
                loading={dataPaginationRes.loading}
                {
                    ...{ searchableFields }
                }
            />
            <Pagination {...paginationParams} />
        </>
    );
};

export default ApplicationList;