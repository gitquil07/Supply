import { useMemo } from "react";
import { GET_TRACKING_ARRIVINGS } from "./gql";
import { Helmet } from "react-helmet";

import { usePagination, useTitle, useToggleDialog, useGetOne } from "../../../hooks";
import { Pagination } from "../../../components/Pagination";

import { generateColumns } from "./TableData";
import { FlexForHeader } from "../../../components/Flex";
import DatePickers from "../../../components/Inputs/DatePickers";
import { CustomMUIDataTable } from "../../../components/CustomMUIDataTable";
import { CustomRowGenerator, CustomRowGeneratorForModal, getList } from "../../../utils/functions";
import { ButtonWithIcon } from "../../../components/Buttons";
import SmallDialog from "components/SmallDialog";
import { DetailedInfo } from "components/DetailedInfo";
import { formatPrice } from "utils/functions";
import { noteOptions } from "utils/static";

const ArrivedList = ({ match }) => {
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
        qraphQlQuery: GET_TRACKING_ARRIVINGS,
        singular: "tracking",
        plural: "trackings"
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

    const applications = getList(dataPaginationRes?.data) || [];
    const { one, setUniqueVal } = useGetOne(applications, "id");
    const list = applications.map(({ node }) => {
        return {
            ...node,
            publicId: { publicId: node.publicId, id: node.id },
            pk: node.pk,
            vendor: { vendor: node.vendor?.name, trNumber: node.transportNumber, trType: node.application?.transportType?.name },
            amount: { brutto: node.brutto, netto: node.netto },
            ordersNumbers: node.application?.orders?.edges?.map(({node}) => node.pk),
            locations: node.locations?.edges?.map(({node}) => node?.name).join(", "),
            factories: node.application?.orders?.edges?.filter(({node}) => node?.vendorFactory?.factory?.name !== null)?.map(({node}) => node?.vendorFactory?.factory?.name),
            shippingDate: node.shippingDate,
            note: noteOptions.find(note => note.value == node.note)?.label,

            country: node?.vendor?.sapCountry?.name,
            inWayDayCount: node?.application?.inWayDayCount,
            trackingUser: node?.application?.trackingUser?.username,
            deliveryCondition: node?.application?.deliveryCondition,
            invoiceProforma: node?.application?.orders?.edges?.filter(({node}) => node.invoiceProforma !== null)?.map(({node}) => "№"+node?.invoiceProforma)?.join(", "),
            
            // Additonal entries to display
            firmName: node?.application?.orders?.edges?.map(({node}) => node?.vendorFactory?.factory?.firm?.name),
            products: node?.application?.orders?.edges?.map(({node}) => node?.vendorFactory?.vendorProducts?.edges?.map(({node}) => node?.product?.name)),
            cargoInvoices: node?.application?.invoices?.edges?.map(({node}) => "№" + node.number),
            stationBorder: { station: node?.station, border: node?.border },
            trDate: node?.trDate,
            transportExpencese: { amount: formatPrice(node.amount), currency: node.currency },
            transferredDate: node.transferredDate,
            relativeWeight: node?.application?.invoices?.edges?.map(({node}) => node.relativeWeight)?.join(", ")
        }
    });

    const openDialog = (id) => {
        setUniqueVal(id);
        handleOpen();
    }

    const columns = useMemo(() => generateColumns(openDialog), []);

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
            {/* <ButtonWithIcon name="создать слежение" url={`${match.url}/create`}/> */}
            <CustomMUIDataTable
                title={"Список слежений"}
                data={list}
                columns={columns}
                count={amountOfElemsPerPage}
                customRowOptions={CustomRowGeneratorForModal(openDialog)}
            />
            <SmallDialog title={`Заявка ${one?.node?.publicId}`} close={handleClose} isOpen={open}>
                {
                    one && <DetailedInfo>
                        <fieldset>
                            <legend>Поставщик: </legend>
                            <span>{one.node.vendor.name}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Номер транспорта: </legend>
                            <span>{one.node.transportNumber}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Валюта: </legend>
                            <span>{one.node.currency}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Создан : </legend>
                            <span>{one.node.createdAt}</span>
                        </fieldset>
                        <fieldset>
                            <legend>Создан : </legend>
                            <span>{one.node.currency}</span>
                        </fieldset>
                    </DetailedInfo>
                }
            </SmallDialog>
            <Pagination {...paginationParams} />
        </>
    );
};

export default ArrivedList;