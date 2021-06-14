import { Helmet } from 'react-helmet';
import styled, { css } from "styled-components";

import { useTitle } from 'hooks';
import { Form } from 'components/Form';
import { Footer } from 'components/Footer';
import { Button } from 'components/Buttons';
import { AddibleInput } from 'components/Flex';
import { RemoveIcon } from 'components/RemoveIcon';
import { DragFile } from 'components/Inputs/DragFile';
import { CustomInput } from 'components/Inputs/CustomInput';
import { CustomInputWithComponent } from "components/Inputs/CustomInput";
import { CustomSelector } from 'components/Inputs/CustomSelector';
import { CustomSelectorAdd } from "components/Inputs/CustomSelector";
import { GET_ORDERS, GET_TRANSPORT_TYPES, GET_TRACKING_USER, GET_APPLICATION, CREATE_APPLICATION, UPDATE_APPLICATION } from "./gql";
import { GET_ORDER_ITEMS, GET_FIRMS, GET_INVOICES, CREATE_INVOICE, UPDATE_INVOICE } from "./gql";
import CustomPicker from "components/Inputs/DatePicker";
import { CustomNumber } from "components/Inputs/CustomNumber";
import Switch from "@material-ui/core/Switch";
import { useTemplate, useFormData, useCustomMutation, useToggleDialog } from "hooks";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useState, useEffect, useMemo } from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import { getList, getValueOfProperty } from "utils/functions";
import moment from 'moment';
import { deliveryCondition, statuses, degreeOfDanger } from "utils/static";
import Checkbox from "@material-ui/core/Checkbox";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import { exceptKey } from "utils/functions";
import SmallDialog from "components/SmallDialog";
import CheckMarkIcon from "assets/icons/checkmark.svg";
import EditDefaultIcon from "assets/icons/editDefault.svg";
import EditSelectedIcon from "assets/icons/editSelected.svg";
import EditHoveredIcon from "assets/icons/editHovered.svg";
import { uploadFile } from 'api';
import { ValidationMessage } from "components/ValidationMessage";
import { formatInputPrice } from "utils/functions";
import { ApplicationSchema, fieldsMessages } from "./validation";
import { resetPriceFormat } from "utils/functions";

const initialState = {
    orders: [],
    trackingUser: "",
    transportType: "",
    deliveryCondition: undefined,
    degreeOfDanger: undefined,
    packageOnPallet: "",
    transportCount: "",
    shippingDate: new Date(),
    status: undefined,
    transportMix: true
};

const invoiceInitial = {
    number: "",
    netto: "",
    brutto: "",
    amount: ""
}

const ApplicationCreate = ({ match }) => {
    const title = useTitle("Создание новой Заявки"),
        {
            state,
            setState,
            handleChange
        } = useFormData(initialState),
        [open, handleClose, handleOpen] = useToggleDialog(),
        { id } = match.params,
        history = useHistory();

    const [requiredCounts, setRequiredCounts] = useState({});

    const [files, setFiles] = useState({
        fetched: [],
        uploaded: []
    });
    const [loading, setLoading] = useState(false);

    const [getTrackingUserTypes, trackingUserTypesRes] = useLazyQuery(GET_TRACKING_USER),
        [getTransportTypes, transportTypesRes] = useLazyQuery(GET_TRANSPORT_TYPES),
        [getApplication, applicationRes] = useLazyQuery(GET_APPLICATION),
        [getOrders, orderRes] = useLazyQuery(GET_ORDERS),

        [getOrderItems, orderItemsRes] = useLazyQuery(GET_ORDER_ITEMS),
        [getInvoices, invoicesRes] = useLazyQuery(GET_INVOICES),
        [getFirms, firmsRes] = useLazyQuery(GET_FIRMS);



    const orders = useMemo(() => getList(orderRes?.data), [orderRes?.data]) || [],
        transportTypes = useMemo(() => getList(transportTypesRes?.data), [transportTypesRes?.data]) || [],
        trackingUserType = useMemo(() => getList(trackingUserTypesRes?.data), [trackingUserTypesRes?.data]) || [],
        pk = getValueOfProperty(applicationRes?.data, "pk"),

        orderItems = useMemo(() => getList(orderItemsRes?.data), [orderItemsRes?.data]) || [],
        invoices = useMemo(() => getList(invoicesRes?.data), [invoicesRes?.data]) || [],
        firms = useMemo(() => getList(firmsRes?.data), [firmsRes?.data]) || [];

        console.log("invoices", invoices);

    const templ = {
        orderItem: "",
        firm: "",
        invoice: "",
        count: "",
        weight: "",
        size: "",
        invoicePrice: ""
    };

    const [items, setItems] = useState([templ]),
        [invoiceData, setInvoiceData] = useState(invoiceInitial),
        [invoicePk, setInvoicePk] = useState(undefined);

    useEffect(() => {
        console.log("invoiceCreate", invoiceData);
    }, [invoiceData]);

    const {
        addTempl,
        removeTempl
    } = useTemplate(items, setItems, templ);


    const {
        submitData, handleSubmit, validationMessages, mutationLoading
    } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_APPLICATION,
            queryUpdate: UPDATE_APPLICATION
        }
    },
        "Заявка",
        () => {
            history.push("/supply/application");
        },
        ApplicationSchema,
        fieldsMessages
    );

    const {
        submitData: submitInvoiceData
    } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_INVOICE,
            queryUpdate: UPDATE_INVOICE
        }
    },
        "Инвойс",
        () => {
            handleClose();
        }
    )

    useEffect(() => {
        getFirms();
        getOrders();
        getTransportTypes();
        getTrackingUserTypes();
    }, []);

    useEffect(() => {
        if (id !== undefined) {
            getApplication({
                variables: {
                    id
                }
            });
            getInvoices({
                variables: {
                    id
                }
            });
        }
    }, [id]);

    useEffect(() => {
        const application = applicationRes?.data?.application?.application;

        if (application !== undefined) {
            setState({
                ...exceptKey(application, ["applicationItems", "__typename", "pk"]),
                trackingUser: application.trackingUser.pk,
                transportType: application.transportType.pk,
                orders: application.orders.edges.map(({ node }) => node.pk)
            });

            console.log("applicationRes?.data?.application?.application?.files?.edges", applicationRes?.data?.application?.application?.files?.edges)

            if (applicationRes?.data?.application?.application?.files?.edges.length > 0) {
                setFiles({
                    ...files,
                    fetched: [
                        ...files.fetched,
                        ...applicationRes?.data?.application?.application?.files?.edges.map(({ node }) => {
                            return {
                                file: node.file,
                                fileUrl: node.fileUrl
                            }
                        })
                    ]
                })
            }

            const items = getList(application.applicationItems).map(({ node }) => ({
                ...exceptKey(node, ["__typename"]),
                firm: node?.firm?.pk,
                invoice: node?.invoice?.pk,
                orderItem: node?.orderItem?.pk
            }))
            setItems(items);
        }
    }, [applicationRes?.data?.application?.application?.pk]);

    useEffect(() => {
        getOrderItems({
            variables: {
                orders: state.orders
            }
        });
    }, [state.orders]);

    const editInvoice = (id) => {
        const invoiceToEdit = invoices.find(({ node }) => node.id === id).node;
        console.log("invoiceToEdit", invoiceToEdit);
        setInvoiceData(exceptKey(invoiceToEdit, ["__typename"]));
        setInvoicePk(invoiceToEdit.pk);
        handleOpen();
    }

    const handleInvoiceEditClose = () => {
        setInvoiceData(invoiceInitial);
        setInvoicePk(undefined);
        handleClose();
    }

    const handleDateChange = date => {
        setState({ ...state, shippingDate: date });
    }

    const handleItemChange = (e, idx) => {
        const tmp = items.slice(0);
        
        if(e.target.name == "invoicePrice"){
            tmp[idx][e.target.name] = formatInputPrice(e.target.value);
        }else{
            tmp[idx][e.target.name] = e.target.value;
        }

        if (e.target.name === "orderItem") {
            const one = orderItems.find(({ node }) => node.pk === e.target.value).node,
                  requiredCount = one.requiredCount,
                  measure = one.vendorProduct?.product?.measure;
                       
            let tmp = { ...requiredCounts };
            tmp[idx] = requiredCount;
            console.log("here", tmp);

            setRequiredCounts(tmp);

        }
        setItems(tmp);
    }

    const submitInvoice = () => {
        // console.log("invoceData", invoiceData);

        const requestBody = {
            ...invoiceData,
            amount: resetPriceFormat(invoiceData.amount)
        }

        invoicePk ? submitInvoiceData(exceptKey(requestBody, ["id", "pk"]), invoicePk, id) : submitInvoiceData({...requestBody, application: pk}, undefined, id);
    }

    const beforeSubmit = () => {

        console.log("state", state);

        let requestBody = {
            ...state,
            shippingDate: moment(state.shippingDate).format("YYYY-MM-DD"),
            status: statuses.find(status => status.value === state.status)?.label,
            degreeOfDanger: degreeOfDanger.find(degree => degree.value === state.degreeOfDanger)?.label
        }

        const itemsList = items.map(item => {
            return {
                ...item,
                invoicePrice: resetPriceFormat(item.invoicePrice)
            }
        
        })

        requestBody.applicationItems = !pk ? itemsList.map(item => exceptKey(item, "invoice")) : itemsList;

        requestBody.files = files.uploaded.map(file => file.file_id);


        if (pk) {
            handleSubmit(exceptKey(requestBody, ["orders"]), pk)
        } else {
            handleSubmit(requestBody)
        }
    }

    const remove = (idx) => {
        const tmp = { ...requiredCounts };
        delete tmp[idx];
        setRequiredCounts(tmp);
        removeTempl(idx);
    }

    const sendFileToServer = (file) => {
        setLoading(true);

        uploadFile('/api-file/documents/', file).then(res => {
            setFiles({ ...files, uploaded: [...files.uploaded, { file_id: res.data[0].id, file_name: file.name }] })
            setLoading(false);
        }).catch(err => console.log(err));
    }

    useEffect(() => {
        console.log("requiredCounts", requiredCounts);
    }, [requiredCounts]);

    const handleInvoiceDataChange = (e) => {
        const name = e.target.name;
        if(name === "amount"){
            setInvoiceData({...invoiceData, [name]: formatInputPrice(e.target.value)});
        }else{
            setInvoiceData({...invoiceData, [name]: e.target.value});
        }
    }

    return (
        <>
            <Helmet title={title} />
            <Form>
                <Title>Данные транспорта</Title>

                <AddibleInput>

                    {
                        pk ? <CustomInput value={state.orders.join(", ")} label="Заказы" disabled={true} /> :
                            <CustomSelector label="Заказы" value={state.orders} name="orders" stateChange={e => handleChange({ fElem: e })} multiple
                                renderValue={selected => selected.join(", ")}
                            >
                                {
                                    orders.map(({ node }) =>
                                        <MenuItem key={node.pk} value={node.pk}>
                                            <ListItemIcon>
                                                <Checkbox checked={state.orders.indexOf(node.pk) > -1} />
                                            </ListItemIcon>
                                            <ListItemText>{node.pk}</ListItemText>
                                        </MenuItem>
                                    )
                                }
                            </CustomSelector>
                    }
                    <div>
                        <CustomSelector label="Логист" value={state.trackingUser} name="trackingUser" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.trackingUser.length ? true : false} >
                            {
                                trackingUserType.map(({ node }) =>
                                    <MenuItem key={node.pk} value={node.pk}>{node.username}</MenuItem>
                                )
                            }
                        </CustomSelector>
                        {
                            validationMessages.trackingUser.length ? <ValidationMessage>{validationMessages.trackingUser}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomSelector label="Тип транспорта" value={state.transportType} name="transportType" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.transportCount.length ? true : false}>
                            {
                                transportTypes.map(({ node }) =>
                                    <MenuItem key={node.pk} value={node.pk} selected={node.pk === state.transportType}>{node.name}</MenuItem>
                                )
                            }
                        </CustomSelector>
                        {
                            validationMessages.transportType.length ? <ValidationMessage>{validationMessages.transportType}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomSelector label="Условия доставки" value={state.deliveryCondition} name="deliveryCondition" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.deliveryCondition.length ? true : false}>
                            {
                                deliveryCondition.map(condition =>
                                    <MenuItem key={condition.value} value={condition.value} selected={state.deliveryCondition === condition.value}>{condition.value}</MenuItem>
                                )
                            }
                        </CustomSelector>
                        {
                            validationMessages.deliveryCondition.length ? <ValidationMessage>{validationMessages.deliveryCondition}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomSelector label="Уровень опасности" value={state.degreeOfDanger} name="degreeOfDanger" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.degreeOfDanger.length ? true : false}>
                            {
                                degreeOfDanger.map(level =>
                                    <MenuItem key={level.value} value={level.value} selected={state.degreeOfDanger === level.value} >{level.label}</MenuItem>
                                )
                            }
                        </CustomSelector>
                        {
                            validationMessages.degreeOfDanger.length ? <ValidationMessage>{validationMessages.degreeOfDanger}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomNumber label="Кол-во мест" value={state.packageOnPallet} name="packageOnPallet" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.packageOnPallet.length ? true : false} />
                        {
                            validationMessages.packageOnPallet.length ? <ValidationMessage>{validationMessages.packageOnPallet}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomNumber label="Кол-во транспорта" value={state.transportCount} name="transportCount" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.transportCount.length ? true : false} />
                        {
                            validationMessages.transportCount.length ? <ValidationMessage>{validationMessages.transportCount}</ValidationMessage> : null
                        }
                    </div>

                    <CustomPicker label="Дата отгрузки" date={state.shippingDate} name="shippingDate" stateChange={date => handleDateChange(date)} />
                    <div>
                        <CustomSelector label="Статус" name="status" value={state.status} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.status.length ? true : false}>
                            {
                                statuses.map(status => {
                                    return <MenuItem key={status.label} value={status.value} selected={state.status === status.value}>{status.label}</MenuItem>
                                }
                                )
                            }
                        </CustomSelector>
                        {
                            validationMessages.status.length ? <ValidationMessage>{validationMessages.status}</ValidationMessage> : null
                        }
                    </div>
                </AddibleInput>
                <p>
                    <label htmlFor="transportMix">Сборный груз</label>
                    <Switch id="transportMix" name="transportMix" onChange={e => handleChange({ fElem: e, type: "choice" })} checked={state.transportMix} />
                </p>

                <DragFile
                    fetchedFiles={files.fetched}
                    uploadedFiles={files.uploaded}
                    receivedFile={(file) => sendFileToServer(file)}
                    removeClicked={(id) => setFiles({ ...files, uploaded: files.uploaded.filter((e) => e.file_id !== id) })}
                    loading={loading}
                />


                <Header>
                    <Title>Материал</Title>
                    <Button name="Добавить материал" color="#5762B2" clickHandler={addTempl} />
                </Header>
                {
                    items?.map((item, index) => {

                        return <Material>
                            <RowWrapper>
                                <Row>
                                    <CustomSelector label="Мат, заказа" value={item.orderItem} name="orderItem" stateChange={e => handleItemChange(e, index)}>
                                        {
                                            orderItems.map(({ node }) =>
                                                <MenuItem key={node.pk} value={node.pk} selected={node.pk === item.orderItem}>{node.vendorProduct?.product?.name}</MenuItem>
                                            )
                                        }
                                    </CustomSelector>
                                    <CustomSelector label="Фирма" value={item.firm} name="firm" stateChange={e => handleItemChange(e, index)}>
                                        {
                                            firms.map(({ node }) =>
                                                <MenuItem key={node.pk} value={node.pk} selected={node.pk === item.firm}>{node.name}</MenuItem>
                                            )
                                        }
                                    </CustomSelector>
                                    <CustomSelectorAdd label="Номер инвойса" value={item.invoice} name="invoice" stateChange={e => handleItemChange(e, index)} disabled={!pk ? true : false} openModal={handleOpen}>
                                        {
                                            invoices.map(({ node }) =>
                                                <CheckedMenuItem key={node.pk} value={node.pk} selected={node.pk === item.invoice}>
                                                    {node.number}
                                                    <button className="editBtn" onClick={() => editInvoice(node.id)}></button>
                                                </CheckedMenuItem>
                                            )
                                        }
                                    </CustomSelectorAdd>
                                    <CustomInputWithComponent type="text" label="Кол-во" value={item.count} name="count" stateChange={e => handleItemChange(e, index)} component={requiredCounts[index]?.requiredCount && <Badge>{requiredCounts[index].requiredCount}</Badge>} />
                                </Row>

                                <Row>
                                    <CustomInputWithComponent type="text" fullWidth label="Вес" value={item.weight} name="weight" stateChange={e => handleItemChange(e, index)} component={<Measure>кг</Measure>} />
                                    <CustomInputWithComponent type="text" fullWidth label="Вместимость" value={item.size} name="size" stateChange={e => handleItemChange(e, index)} component={<Measure value="3" index>м</Measure>} />
                                    <CustomInput fullWidth label="Цена инвойса" value={item.invoicePrice} name="invoicePrice" stateChange={e => handleItemChange(e, index)} />
                                </Row>
                            </RowWrapper>
                            <RemoveIcon clicked={() => remove(index)} />
                        </Material>
                    })
                }
            </Form>
            <SmallDialog title="Cоздание нового инвойса" close={handleInvoiceEditClose} isOpen={open}>
                <CustomInput label="Номер инвойса" value={invoiceData.number} name="number" stateChange={handleInvoiceDataChange} />
                <CustomInput label="Брутто" value={invoiceData.brutto} name="brutto" stateChange={handleInvoiceDataChange} />
                <CustomInput label="Нетто" value={invoiceData.netto} name="netto" stateChange={handleInvoiceDataChange} />
                <CustomInput label="Транспортный расход" value={invoiceData.amount} name="amount" stateChange={handleInvoiceDataChange} />
                <Button name={invoicePk ? "сохранить" : "создать"} color="#5762B2" clickHandler={submitInvoice} />
            </SmallDialog>

            <Footer>
                <span>Кол-во материалов: {items?.length}</span>
                <Button name={pk ? "Сохранить" : "Создать"} clickHandler={beforeSubmit} loading={mutationLoading} />
            </Footer>
        </>
    )
}

export default ApplicationCreate;

const Badge = styled.span`
    padding:5px;
    border-radius:5px;
    background-color:rgba(87, 98, 178, 0.5);
    color:#fff;
    font-size:14px;
    font-weight:bold;
`;

const Measure = styled.span`
    color: #5762B2;

    ${({ index }) => {
        console.log(index)
        return index ? css`
            position:relative;

            &::after{
                content: "${({ value }) => value}";
                display:inline-block;
                font-size:11px;
                position:absolute;
                font-weight:bold;
                top:-2px;
                right:-7px;
            }
        ` : ""
    }}
`;

const CheckedMenuItem = styled(MenuItem)`
    color: ${({ selected }) => selected ? "#5762B2" : "rgba(0, 0, 0, .5)"} !important;
    font-weight:normal !important;
    transition:color .3s linear !important;

    &::after{
        content: "";
        background-image:${({ selected }) => selected ? `url(${CheckMarkIcon})` : "none"};
        position:absolute;
        top:calc(50%-16px);
        right:35px;
        z-index:5;
        display:inline-block;
        width:20px;
        height:20px;
    }

    &:hover{
        color:#000 !important;
    }

    &:hover .editBtn{
        background-image: url(${EditHoveredIcon});
    }

    .editBtn{
        width:20px;
        height:20px;
        display:inline-block;
        position:absolute;
        top:calc(50% - 10px);
        z-index:9999;
        right:5px;
        background-color:transparent;
        background-image: ${({ selected }) => selected ? `url(${EditSelectedIcon})` : `url(${EditDefaultIcon})`};
        background-size:cover;
        border:none;
        outline:none;
        transition:background-image .3s linear;
    }
`;

const Title = styled.div`
    font-size: 18px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;

const Material = styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0;
    height: 144px;
    background: #F6F6FC;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px; 
`;

const RowWrapper = styled.div`
    width: 100%;
    display: flex;
    flex-direction: column; 
    gap: 10px; 
`;

const Row = styled.div`
    display: grid;
    gap: 10px;
    grid-template-columns: repeat(4, 1fr);
    align-items: center;
`;
