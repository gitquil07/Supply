import { useState, useEffect, useContext } from "react";
import { Helmet } from "react-helmet";
import { useToggleDialog } from "../../../hooks";

import styled from "styled-components";

import { useTitle } from "hooks";
import { Form } from "components/Form";
import { Button } from "components/Buttons";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomNumber } from "components/Inputs/CustomNumber";
import { CustomSelector } from "components/Inputs/CustomSelector";
import SmallDialog from "components/SmallDialog";

import { Footer } from "components/Footer";
import CustomPicker from "components/Inputs/DatePicker";
import { MiniForm } from "components/ComponentsForForm/MiniForm";
import { Title } from "components/Title";
import { CustomizableInputs } from "components/ComponentsForForm/CustomizableInputs";
import { GET_TRACKING, GET_APPLICATION_ITEMS_GROUPED_BY_ORDERS, GET_VENDORS, GET_INVOICES, INVOICE_UPDATE, UPDATE_APPLICATION } from "./gql";
import { useLazyQuery } from "@apollo/client";
import { recursiveFetch, exceptKey } from "utils/functions";
import { currencyOptions, invoiceStatuses, trackingStatuses, deliveryCondition } from "utils/static";
import { useFormData, useCustomMutation } from "hooks";
import { useHistory } from "react-router-dom";
import { UPDATE_TRACKING } from "./gql"
import MenuItem from "@material-ui/core/MenuItem";
import moment from "moment";
import { useMutation } from "@apollo/client";
import { NotificationManager } from "react-notifications";
import { FileElementA, FilesList } from "components/Inputs/DragFile";
import { degreeOfDanger as degreeOfDangerOptions } from "utils/static";
import { addDays, formatPrice, formatInputPrice, resetPriceFormat } from "utils/functions";
import { UserContext } from "context/UserContext";
import { List, Item } from "components/ComponentsForForm/ItemList";


const initialState = {
    vendor: "",
    transportNumber: "",
    currency: "",
    netto: "",
    brutto: "",
    amount: "",
    station: "",
    trDate: new Date()
};

const TrackingTransportCreate = ({ match }) => {

    const {role} = useContext(UserContext);
    const { id } = match.params;
    const title = useTitle("Изменение Слежения");
    const [additionalData, setAdditionalData] = useState({
        status: "",
        locations: ""
    });
    const [applications, setApplications] = useState([
        {
            expand: true
        },
        {
            expand: true
        },

    ]);

    const history = useHistory();

    const {
        state,
        setState,
        handleChange,
        handlePriceChange
    } = useFormData(initialState);

    const {
        submitData, mutationLoading
    } = useCustomMutation({
        graphQlQuery: {
            queryCreate: UPDATE_TRACKING,
            queryUpdate: UPDATE_TRACKING
        }
    },
        "Слежение",
        () => {
            history.push("/tracking/transport");
        }
    );

    const {
        submitData: submitInvoiceUpdate
    } = useCustomMutation({
        graphQlQuery: {
            queryCreate: INVOICE_UPDATE,
            queryUpdate: INVOICE_UPDATE
        }
    },
        "Инвойс",
        () => { }
    )

    const {
        submitData: submitShippingUpdate
    } = useCustomMutation({
        graphQlQuery: {
            queryCreate: UPDATE_APPLICATION,
            queryUpdate: UPDATE_APPLICATION
        }
    },
        "Дата отгрузки",
        () => {}
    );


    const [getTrackingInfo, trackingInfoRes] = useLazyQuery(GET_TRACKING, {
        fetchPolicy: "network-only"
    }),
        [getVendors, vendorsRes] = useLazyQuery(GET_VENDORS),
        [getApplicationItemsGroupedByOrder, applicationItemsGroupedByOrderRes] = useLazyQuery(GET_APPLICATION_ITEMS_GROUPED_BY_ORDERS),
        [getInvoices, invoicesRes] = useLazyQuery(GET_INVOICES),


        vendors = vendorsRes?.data?.vendor?.vendors.edges || [],
        trackingInfo = trackingInfoRes?.data ? exceptKey(trackingInfoRes?.data?.tracking.tracking, ["application", "__typename", "locations"]) : null,
        locations = trackingInfoRes?.data?.tracking.tracking.locations.edges.map(({ node }) => {
            return exceptKey(node, ["__typename"]);
        }) || [],
        applicationInfo = trackingInfoRes?.data?.tracking?.tracking?.application,
        pk = trackingInfoRes?.data?.tracking?.tracking?.pk,
        applicationItems = applicationItemsGroupedByOrderRes?.data?.application?.application?.orders?.edges?.map(({ node }) => {
            return {
                orderPublicId: node?.publicId,
                country: node.vendorFactory?.vendor?.sapCountry?.name,
                city: node.vendorFactory?.vendor?.sapCity,
                applicationItems: node?.orderItems?.edges?.map(({ node }) => {
                    return node?.applicationItems?.edges?.map(({ node }) => {
                        return node;
                    })
                })
            }
        }),
        ApplicationFiles = applicationInfo?.files?.edges;


    const [updateTracking] = useMutation(UPDATE_TRACKING, {
        onCompleted: () => {
            getTrackingInfo({
                variables: {
                    id
                }
            });
            NotificationManager.success("Статуc слежения изменен")
        },
        onError: (error) => NotificationManager.error(error.message)
    });

    const [shippingDate, setShippingDate] = useState(new Date());

    const shipDate = applicationInfo?.shippingDate;
    
    useEffect(() => {

        if(shipDate){

            setShippingDate(shipDate);

        }

    }, [shipDate]);


    const handleShippingDateChange = (date) => {
        setShippingDate(date);
    }


    useEffect(() => {
        getVendors();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            getTrackingInfo({
                variables: {
                    id
                }
            });
        }
    }, [id]);

    useEffect(() => {
        const id = trackingInfoRes?.data?.tracking?.tracking?.application.id;
        if (id !== undefined) {
            getApplicationItemsGroupedByOrder({
                variables: {
                    id
                }
            });
            getInvoices({
                variables: {
                    id
                }
            });
            setState({
                ...trackingInfo,
                vendor: trackingInfo?.vendor?.pk,
            });
            setAdditionalData({
                ...additionalData,
                status: trackingInfo.status,
            })
        }
    }, [trackingInfoRes?.data]);

    const handleAdditionalDataSubmit = (additional) => {


        if (additional) {
            const requestBody = {
                ...exceptKey(state, ["pk", "publicId", "netto", "brutto", "amount"]),
                status: trackingStatuses.find(status => status.value === additionalData.status)?.label,
                locations: [{
                    name: additionalData.locations,
                    locationDate: moment(additionalData.locationDate).format("YYYY-MM-DD"),
                    status: trackingStatuses.find(status => status.value === additionalData.status)?.label
                }]
            };

            requestBody.trDate = moment(requestBody.trDate).format("YYYY-MM-DD");

            updateTracking({
                variables: {
                    input: {
                        data: requestBody,
                        pk
                    }
                }
            });

        } else {

            const invoicesToUpdate = invoiceList.map(invoice => {
                return {
                    ...exceptKey(invoice, ["pk", "relativeWeight", "netto", "brutto"]),
                    status: invoiceStatuses.find(invoiceStatus => invoiceStatus.value == invoice.status).label,
                    amount: resetPriceFormat(invoice.amount)

                }
            });


            const invoicesPk = invoiceList.map(invoice => invoice.pk);

            const recursiveMutation = recursiveFetch(invoicesToUpdate.length, (turn) => {
                submitInvoiceUpdate(invoicesToUpdate[turn], invoicesPk[turn])
            });

            recursiveMutation();

            let requestBody = { ...state };

            requestBody.trDate = moment(requestBody.trDate).format("YYYY-MM-DD");

            requestBody = exceptKey(requestBody, ["netto", "brutto", "amount"]);

            submitData({
                ...exceptKey(requestBody, ["pk", "publicId", "status"])
            }, pk); 
            
            submitShippingUpdate({
                shippingDate: moment(shippingDate).format("YYYY-MM-DD")
            }, applicationInfo.pk)

            getTrackingInfo({
                variables: {
                    id
                }
            });
        }
    }

    const [invoiceList, setInvoiceList] = useState([]);

    useEffect(() => {
        const list = invoicesRes?.data?.application?.application?.invoices.edges || [];
        if (list.length > 0) {
            const obj = list.map(({ node }) => {
                return {
                    ...exceptKey(node, ["__typename"]),
                    amount: formatPrice(node.amount)
                }
            })

            setInvoiceList(obj);
        }
    }, [invoicesRes?.data?.application?.application?.invoices?.edges.length]);


    const handleInvoiceFieldsChange = (e, idx) => {
        const name = e.target.name,
              tmp = invoiceList.slice(0);

        if(name === "deliveryCondition"){
            switch(e.target.value){
                case "FCA":
                case "FAS":
                case "EXW":
                case "FOB":
                    tmp[idx].destination = "SPL";
                    break;
                case "CPT":
                    tmp[idx].destination = "OFFICE";
                    break;
                case "CIP":
                case "DAP":
                case "CFR":
                case "DDP":
                case "DPU":
                    tmp[idx].destination = "X"
                    break;
            }
            tmp[idx].deliveryCondition = e.target.value;
        }else if(name === "amount"){
            tmp[idx].amount = formatInputPrice(e.target.value);
        }else{
            tmp[idx][name] = e.target.value;
        }

        setInvoiceList(tmp);
    }

    const handleDateChange = (date) => {
        setState({ ...state, trDate: date });
    }

    const expand = (index) => {
        const oldState = [...applications];

        oldState[index].expand = !oldState[index].expand;

        setApplications([...oldState]);
    };

    const [requestDialogState, closeRequestDialog, openRequestDialog] = useToggleDialog();
    const [materialsDialogState, closeMaterialDialog, openMaterialDialog] = useToggleDialog();

    const isSupplyRoles = (role, label, value) => {
        if(role === "SUPPLY_ADMIN" || role === "ORDER"){
            return <CustomInput label={label} value={value} disabled />
        }else{
            return false;
        }
    }

    return (
        <>
            <Helmet title={title} />

            <Form>
                <MiniForm>
                    <Title>Данные транспорта</Title>
                    <CustomizableInputs t="1fr 1fr 1fr 1fr 1fr">

                        {
                            isSupplyRoles(role, "Транспортировщики", vendors.find(({node}) => node.pk === state?.vendor)?.node?.name) ||
                            <CustomSelector label="Транспортировщики" value={state?.vendor} name="vendor" stateChange={e => handleChange({ fElem: e })}>
                                {
                                    vendors.map(({ node }) =>
                                        <MenuItem key={node.pk} value={node.pk} selected={node.pk === state.vendor}>{node.companyName}</MenuItem>
                                    )
                                }
                            </CustomSelector>
                        }
                        {
                            isSupplyRoles(role, "Номер транспорта", state?.transportNumber) ||
                            <CustomInput name="transportNumber" label="Номер транспорта" value={state?.transportNumber} stateChange={e => handleChange({ fElem: e })} fullWidth/>

                        }
                        {
                            isSupplyRoles(role, "Валюта", state?.currency) ||
                            <CustomSelector name="currency" label="Валюта" value={state?.currency} stateChange={e => handleChange({ fElem: e })}>
                                {
                                    currencyOptions.map(currency =>
                                        <MenuItem key={currency.value} value={currency.value} selected={state.currency === currency.value}>{currency.label}</MenuItem>
                                    )
                                }
                            </CustomSelector>
                        }
                        {
                            isSupplyRoles(role, "Станция", state?.station) || 
                            <CustomInput name="station" label="Станция" value={state?.station} stateChange={e => handleChange({ fElem: e })} />
                        }
                        {
                            isSupplyRoles(role, "Дата прибытия", state?.trDate) ||
                            <CustomPicker date={state.trDate} name="trDate" stateChange={date => handleDateChange(date)} label="Дата прибытия" />
                        }
                    </CustomizableInputs>
                    <CustomizableInputs t="1fr 1fr">
                        <CustomPicker date={shippingDate} name="shippingDate" stateChange={date => handleShippingDateChange(date)} label="Дата отгрузки" />
                        {/* <CustomInput label="Дата отгрузки" value={applicationInfo?.shippingDate || "YYYY-MM-DD"} disabled /> */}
                        <CustomInput label="В пути" value={addDays(applicationInfo?.inWayDayCount || 0)} disabled /> 
                    </CustomizableInputs>
                </MiniForm>

                <MiniForm>
                    {
                        invoiceList.length ? <>
                            <Title size="18">Инвойсы</Title>
                            {
                                invoiceList.map((invoice, idx) =>
                                    <AddibleInput>
                                        {/* {
                                            isSupplyRoles(role, "Инвойс", invoice.number) ||
                                            <CustomInput label="Инвойс" value={invoice.number} stateChange={e => handleInvoiceFieldsChange(e, idx)} />
                                        } */}

                                        <Head>
                                            {invoice.number}
                                        </Head>
                                        <CustomInput label="Нетто" value={invoice.netto}  disabled />
                                        <CustomInput label="Брутто" value={invoice.brutto}  disabled />
                                        <CustomInput label="Относительный вес" value={invoice.relativeWeight} disabled />
                                        {
                                            isSupplyRoles(role, "Статус", invoice.status) ||
                                            <CustomSelector name="status" label="Статус" stateChange={e => handleInvoiceFieldsChange(e, idx)} value={invoice.status}>
                                                {
                                                    invoiceStatuses.map(invoiceStatus =>
                                                        <MenuItem key={invoiceStatus.value} value={invoiceStatus.value} selected={invoice.status == invoiceStatus.value}>{invoiceStatus.label}</MenuItem>
                                                    )
                                                }
                                            </CustomSelector>
                                        }
                                        {
                                            <CustomSelector name="deliveryCondition" label="Условия доставки" stateChange={e => handleInvoiceFieldsChange(e, idx)} value={invoice.deliveryCondition}>
                                                {
                                                    deliveryCondition.map(condition => 
                                                        <MenuItem key={condition.value} value={condition.value} selected={condition.value === invoice.condition}>{condition.label}</MenuItem>    
                                                    )
                                                }
                                            </CustomSelector>
                                        }
                                        <CustomInput value={invoice.destination} name="destination" />
                                        <CustomInput label="Транспортный расход" value={invoice.amount} name="amount" stateChange={e => handleInvoiceFieldsChange(e, idx)} />
                                    </AddibleInput> 
                                )
                            }
                        </> : null
                    }
                    <Title size="18">Итог</Title>
                    <List>
                        <Item>
                            <h4>Общий Транспортный расход</h4>
                            <span>{formatPrice(state.amount)}</span>
                        </Item>
                        <Item>
                            <h4>Общий Относительный вес</h4>
                            <span>{invoiceList.length === 0? "0.00" : "1.00"}</span>
                        </Item>
                        <Item>
                            <h4>Общий Брутто</h4>
                            <span>{state.brutto}</span>
                        </Item>
                        <Item>
                            <h4>Общий Нетто</h4>
                            <span>{state.netto}</span>
                        </Item>
                    </List>
                    <Title size="18">Статус слежения: <span>{trackingInfo?.publicId}</span></Title>

                    <CustomizableInputs t="1fr 1fr 1fr 1fr">
                        <CustomSelector name="status" value={additionalData.status} stateChange={e => setAdditionalData({ ...additionalData, status: e.target.value })} label="Статус">
                            {
                                trackingStatuses.map(status =>
                                    <MenuItem key={status.value} value={status.value} selected={status.value === additionalData.status}>{status.label}</MenuItem>
                                )
                            }
                        </CustomSelector>
                        <CustomInput value={additionalData.location} name="location" stateChange={e => setAdditionalData({ ...additionalData, locations: e.target.value })} label="Местонахождение" />
                        <CustomPicker date={additionalData.locationDate} name="locationDate" stateChange={date => setAdditionalData({...additionalData, locationDate: date})} label="Дата" />
                        <Button value={additionalData.status} name="Добавить статус" color="#5762B2" clickHandler={() => handleAdditionalDataSubmit(true)} />
                    </CustomizableInputs>

                    {
                        locations.length ? <Container>
                            {
                                locations.map(location =>
                                    <ContainerRow>
                                        <ContainerColumn>
                                            <b>Статус:</b>
                                            <span>{location.status}</span>
                                        </ContainerColumn>
                                        <ContainerColumn>
                                            <b>Дата:</b>
                                            <span>{moment(location.locationDate).format("YYYY-MM-DD")}</span>
                                        </ContainerColumn>
                                        <ContainerColumn>
                                            <b>Местонахождение:</b>
                                            <span>{location.name}</span>
                                        </ContainerColumn>
                                    </ContainerRow>
                                )
                            }

                        </Container> : null
                    }

                </MiniForm>
                <MiniForm>

                    <Title size="18">Информация заявки</Title>

                    <List>
                        <Item>
                            <h4>Тип транспорта</h4>
                            <span>{applicationInfo?.transportType?.name}</span>
                        </Item>
                        <Item>
                            <h4>Тип заявки</h4>
                            <span>{applicationInfo?.transportMix ? "Сборная" : "Обычная"}</span>
                        </Item>
                        <Item>
                            <h4>
                                Степень опасности
                            </h4>
                            <span>
                                {
                                    degreeOfDangerOptions.find(degree => degree.value == applicationInfo?.degreeOfDanger)?.label
                                }
                            </span>
                        </Item>
                        <Item>
                            <h4>
                                Количество мест
                            </h4>
                            <span>
                                {applicationInfo?.packageOnPallet.slice(0, applicationInfo?.packageOnPallet.indexOf("."))}
                            </span>
                        </Item>
                    </List>

                    <FilesList>
                        {ApplicationFiles?.map(({ node }, i) =>
                            <FileElementA key={i} href={node.fileUrl} download>
                                {node.file.split("/")[1]}
                            </FileElementA>)}
                    </FilesList>

                    <Title size="18">Материалы</Title>


                    {
                        applicationItems?.map(item => {
                            if(item.applicationItems[0].length > 0){
                                return <List direction="column">
                                    <ListHeader>
                                        Номер заказа {item?.orderPublicId}
                                        <b>{item?.country} / {item?.city}</b>
                                    </ListHeader>
                                    {
                                        item.applicationItems.map(applicationItem => {
                                            if (applicationItem.length > 0) {
                                                return <List>
                                                    <Item>
                                                        <h4>
                                                            Название материала
                                                </h4>
                                                        <span>
                                                            {applicationItem[0]?.orderItem?.vendorProduct?.product?.name}
                                                        </span>
                                                    </Item>
                                                    <Item>
                                                        <h4>
                                                            Фирма
                                                </h4>
                                                        <span>
                                                            {applicationItem[0]?.firm?.name}
                                                        </span>
                                                    </Item>
                                                    <Item>
                                                        <h4>
                                                            Брутто вес
                                                </h4>
                                                        <span>
                                                            {applicationItem[0]?.weight}
                                                        </span>
                                                    </Item>
                                                    <Item>
                                                        <h4>
                                                            Обем
                                                </h4>
                                                        <span>
                                                            {applicationItem[0]?.size}
                                                        </span>
                                                    </Item>
                                                    <Item>
                                                        <h4>
                                                            Отгружаемое кол-во
                                                </h4>
                                                        <span>
                                                            {applicationItem[0]?.count}
                                                        </span>
                                                    </Item>
                                                </List>
                                            }
                                        })
                                    }
                                </List>
                            }
                        })
                    }
                </MiniForm>

            </Form>

            <Footer justify="flex-end">
                <Button name="сохранить" clickHandler={() => handleAdditionalDataSubmit()} loading={mutationLoading} />
            </Footer>

            <SmallDialog title="Добавить заявку" close={closeRequestDialog} isOpen={requestDialogState}>
                <CustomSelector fullWidth label="Название материала" />
            </SmallDialog>

            <SmallDialog title="Добавить материал" close={closeMaterialDialog} isOpen={materialsDialogState}>
                <CustomSelector fullWidth label="Номер заявки" />
                <CustomInput label="Отгружаемое кол-во" fullWidth />
                <CustomInput label="Брутто вес" fullWidth />
                <CustomInput label="Обем" fullWidth />
            </SmallDialog>
        </>
    );
}

export default TrackingTransportCreate;


const Head = styled.div`
    height:100%;
    background-color:#fff;
    display:flex;
    justify-content:center;
    align-items:center;
    border:1px solid #E5E5E5;
    border-radius:5px;
`;

const Container = styled.div`
    padding:10px;
    background-color:#fff;
    border-radius:5px;
    border:1px solid rgba(0, 0, 0, 0.1);
    display:flex;
    flex-direction:column;

    &>div:first-child{
        padding-top:0;
    }

    &>div:last-child{
        border-bottom:0;
        padding-bottom:0;
    }
`;

const ContainerRow = styled.div`
    padding:10px 0;
    border-bottom:1px solid rgba(0, 0, 0, 0.1);
    display:grid;
    grid-template-columns:0.9fr 0.9fr 2fr;

    @media(max-width: 970px){
        &{
            grid-template-columns: 1fr;
            grid-row-gap:20px;
        }
    }
`;

const ListHeader = styled.div`
    display:flex;
    justify-content:space-between;
`;

const ContainerColumn = styled.div`
    font-size:18px;
    
    b{
        margin-right:10px;
        font-weight:normal;
    }

    span{
        color:rgba(0, 0, 0, 0.5);
    }
`;

const AddibleInput = styled.div`
    display:grid;
    padding:10px;
    grid-template-columns:1fr 1fr 1fr 1fr;
    border-radius:5px;
    background-color:#fff;
    grid-gap:10px;
    border:1px solid #E5E5E5;


    @media(max-width: 1233px){

        &{
            grid-template-columns:1fr 1fr;
        }

    }

    @media(max-width:609px){
        &{
            grid-template-columns:1fr;
        }
    }

`;

const Inputs = styled.div`
    gap: 10px;
    display: grid;
    grid-template-columns: 1fr 1fr 3fr 1fr;
    margin-bottom: 10px;
`;

const Applications = styled.div`
    background: #F6F6FC;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    max-height: ${({ expand }) => expand ? "1000px" : "72px"};
    transition:  max-height 0.3s ease-in;
`;


const Expand = styled.div`
    color: #5762B2;
    cursor: pointer;
`;


const Tables = styled.div`
    display: flex;
    gap: 10px;
`;

const Material = styled.div``;

const InputRow = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    /* height: 56px; */
    background: white;
    padding: 10px;
    box-sizing: border - box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
`;