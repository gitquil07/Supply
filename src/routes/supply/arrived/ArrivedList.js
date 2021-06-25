import { useEffect, useState } from "react";
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
import { usePagination, useToggleDialog, useGetOne } from "hooks";
import { CustomRowGeneratorForModal, getList } from "utils/functions";
import SmallDialog from "components/SmallDialog";
import { DetailedInfo } from "components/DetailedInfo";
import { statuses } from "utils/static"



const ArrivedList = () => {
    const title = useTitle("Прибывшие");

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
    const [
        open,
        handleClose,
        handleOpen
    ] = useToggleDialog();

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



    const applications = useMemo(() => getList(dataPaginationRes?.data), [dataPaginationRes?.data]) || [];
    const { one, setUniqueVal } = useGetOne(applications, "id");
    const list = useMemo(() => applications.map(({ node }) => {
        return {
            ...node,
            id: node.id,
            transportType: node?.transportType?.name,
            count: node?.count,
            deliveryCondition: node?.deliveryCondition,
            transportTypeCountDelivery: { transportType: node.transportType.name, transportCount: node.transportCount, deliveryCondition: node.deliveryCondition },
            typeOfPackaging: node.typeOfPackaging,
            trackingUser: node.trackingUser.username,
            status: statuses.find(status => status.value == node.status)?.label,
            invoices: node.invoices.edges.map(({node}) => node.number).join(", ")
        }
    }), [applications]);


    const openDialog = (id) => {
        setUniqueVal(id);
        handleOpen();
    }

    const columns = useMemo(() => generateColumns(openDialog), []);

    const searchableFields = [
        "invoices",
        "transportType",
        "transportCount",
        "deliveryCondition",
        "trackingUser",
        "createdAt",
        "status",
        "invoice_proforma"
    ];

    return (
        <>
            <Helmet title={title} />
            <DatePickers mR="15px"
                fromDate={fromDateChange}
                toDate={toDateChange}
                changeFrom={setFromDateChange}
                changeTo={setToDateChange}
                buttonClicked={handleDateApply}
            />
            <CustomMUIDataTable
                title={"Список заявок"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGeneratorForModal(openDialog)}
                {
                    ...{ searchableFields }
                }
            />
            <SmallDialog title={`Заявка ${one?.node?.publicId}`} close={handleClose} isOpen={open}>
                {
                    one && <DetailedInfo>
                        <fieldset>
                            <legend>человек для слежения: </legend>
                            <span>{one.node.trackingUser.firstName} {one.node.trackingUser.lastName}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Тип транспортировки: </legend>
                            <span>{one.node.transportType?.name}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Перевозчик: </legend>
                            <span>{one.node.trackingUser?.name}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Тип упаковки: </legend>
                            <span>{one.node.typeOfPackaging}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Дата доставки: </legend>
                            <span>{one.node.shippingDate}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Активность: </legend>
                            <span>{one.node.isActive ? "Активный" : "Неактивый"}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Комбинированная транспортировка: </legend>
                            <span>{one.node.transportMix ? "Да" : "Нет"}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Условия доставки: </legend>
                            <span>{one.node.deliveryCondition}</span>
                        </fieldset>
                    </DetailedInfo>
                }
            </SmallDialog>
            <Pagination {...paginationParams} />
        </>
    );
};


export default ArrivedList;
