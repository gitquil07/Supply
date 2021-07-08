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
import { statuses, degreeOfDanger } from "utils/static";
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
    degreeOfDanger: undefined,
    packageOnPallet: "",
    transportCount: "",
    shippingDate: new Date(),
    status: undefined,
    transportMix: false
};

const invoiceInitial = {
    number: "",
    netto: "",
    brutto: ""
}

const ApplicationCreate = ({ match }) => {
    const title = useTitle("Создание новой Заявки"),
        {
            state,
            setState,
            handleChange
        } = useFormData(initialState),
        [openInvoice, handleInvoiceClose, handleInvoiceOpen] = useToggleDialog(),
        [openOrder, handleOrderClose, handleOrderOpen] = useToggleDialog(),
        { id } = match.params,
        history = useHistory();

    const [requiredCounts, setRequiredCounts] = useState({});

    const [files, setFiles] = useState({
        fetched: [],
        uploaded: []
    });
    
    const [loading, setLoading] = useState(false);
    
    const [map, setMap] = useState([]);

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


    const templ = {
        orderItem: "",
        firm: "",
        invoice: "",
        count: "",
        weight: "",
        size: "",
        invoicePrice: ""
    };

    const [items, setItems] = useState([]),
        [invoiceData, setInvoiceData] = useState(invoiceInitial),
        [invoicePk, setInvoicePk] = useState(undefined);


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
            handleInvoiceClose();
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

            const tmp = {};
            const items = getList(application.applicationItems).map(({ node }, idx) => {
            
                tmp[idx] = node.orderItem.requiredCount;

                return {
                    ...exceptKey(node, ["__typename"]),
                    firm: node?.firm?.pk,
                    invoice: node?.invoice?.pk,
                    orderItem: node?.orderItem?.pk
                }
            })

            setRequiredCounts(tmp);
            setItems(items);
        }
    }, [applicationRes?.data?.application?.application?.pk]);

    useEffect(() => {
        if(state.orders.length > 0){
            getOrderItems({
                variables: {
                    orders: state.orders
                }
            });
        }
    }, [state.orders.length])

    const editInvoice = (id) => {
        const invoiceToEdit = invoices.find(({ node }) => node.id === id).node;
        setInvoiceData(exceptKey(invoiceToEdit, ["__typename"]));
        setInvoicePk(invoiceToEdit.pk);
        handleInvoiceOpen();
    }

    const handleInvoiceEditClose = () => {
        setInvoiceData(invoiceInitial);
        setInvoicePk(undefined);
        handleInvoiceClose();
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
            requiredCount = one.requiredCount;
        
                       
            let tmp = { ...requiredCounts };
            tmp[idx] = requiredCount;

            setRequiredCounts(tmp);

        }
        setItems(tmp);
    }

    const submitInvoice = () => {

        const requestBody = {
            ...exceptKey(invoiceData, ["id", "pk"])
        }

        invoicePk ? submitInvoiceData(requestBody, invoicePk, id) : submitInvoiceData({...requestBody, application: pk}, undefined, id);
    }

    const beforeSubmit = () => {

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

    const handleInvoiceDataChange = (e) => {
        const name = e.target.name;
        // if(name === "amount"){
        //     setInvoiceData({...invoiceData, [name]: formatInputPrice(e.target.value)});
        // }else{
            setInvoiceData({...invoiceData, [name]: e.target.value});
        // }
    }

    const addMaterials = (orderPk, orderIdx) => {
        let mapTmpl = map.slice(0);
    
        const selectedOrder = mapTmpl.find(mapItem => mapItem.orderPk === orderPk); 


        if(selectedOrder !== undefined){
            mapTmpl[orderIdx].applicationItems = [...selectedOrder.applicationItems, items.length]; 
        }else{
            const relationObject = {
                orderPk,
                applicationItems: [items.length] 
            }
            mapTmpl.push(relationObject);
        }

        setMap(mapTmpl);
        addTempl();
    }


    const removeMaterial = (materialIndex) => {

        const relations = map.slice(0);
        const relation = map.find(relation => relation.applicationItems.indexOf(materialIndex) > -1);
                  
        // // Get index of materialIndex in relation
        const mIIndex = relation.applicationItems.indexOf(materialIndex);
        // // Get index of relation in relations
        const relIndex =  relations.indexOf(relation);

        relation.applicationItems.splice(mIIndex, 1);

        relations[relIndex] = {...relation};

        setMap(relations);
        remove(materialIndex == 0? materialIndex : materialIndex - 1);

    }   

    const removeOrder = (orderPk) => {
        const orders = state.orders.slice(0);
        const relations = map.slice(0);

        const relation = relations.find(relation => relation.orderPk === orderPk),
              orderIdx = orders.indexOf(orderPk);

        if(relation !== undefined){
            const relIdx = relations.indexOf(relation);
            relations.splice(relIdx, 1);
            setMap(relations);
        }

        const restOrders = orders.filter(number => number !== orderPk);
        setState({
            ...state,
            orders: restOrders``
        });
    }

    
    return (
        <>
            <Helmet title={title} />
            <Form>
                <Title>Данные транспорта</Title>

                <AddibleInput>
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


                {/* <Header>
                    <Title>Материал</Title>
                    <Button name="Добавить материал" color="#5762B2" clickHandler={addTempl} />
                </Header> */}
                <Header vM="30" >
                    <Title>Заказы</Title>
                    <Button name="Добавить заказ" color="#5762B2" clickHandler={handleOrderOpen} />
                </Header>
                {
                    state.orders.map((orderPk, idx) => {
                        const foundOrder = orders.find(({node}) => node.pk === orderPk)?.node;
                        const itemsToOrderRelationMap = map.find(relation => relation.orderPk === orderPk)?.applicationItems;

                        const filteredItems = [];
                        if(itemsToOrderRelationMap !== undefined && items.length > 0){
                            itemsToOrderRelationMap.forEach(itemIdx => {
                                const applicationItem = items[itemIdx];
                                filteredItems.push(applicationItem);
                            })
                        }
                        
                        return <Material bgColor="#F6F6FC" vM="20">
                                    <RowWrapper>
                                        <RowWrapper>
                                            <OrderInfoConatiner>
                                                <List>
                                                    <Item>
                                                        <h4>Номер заказа</h4>
                                                        <span>{foundOrder?.publicId}</span>
                                                    </Item>
                                                    <Item>
                                                        <h4>Завод</h4>
                                                        <span>{foundOrder?.vendorFactory.factory.name}</span>
                                                    </Item>
                                                    <Item>
                                                        <h4>Поставщик</h4>
                                                        <span>{foundOrder?.vendorFactory.vendor.companyName}</span>
                                                    </Item>
                                                </List>
                                                <List width="370">
                                                    <CustomSelector label="Логист" name="" stateChange={() => {}} fullWidth>
                                                        {
                                                            trackingUserType.map(({node}) =>
                                                                <MenuItem key={node?.pk} value={node?.pk}>{node?.username}</MenuItem>
                                                            )
                                                        }
                                                    </CustomSelector>
                                                </List>
                                                <RemoveIcon clicked={() => removeOrder(orderPk)} />
                                            </OrderInfoConatiner>   
                                            <Header vM="0">
                                                <Title>Материалы</Title>
                                                <Button name="Добавить материал" color="#5762B2" clickHandler={() => addMaterials(orderPk, idx)} />
                                            </Header>
                                        </RowWrapper>
                                        {
                                            filteredItems?.map((item, index) => {
                                                const materialIndex = itemsToOrderRelationMap[index];

                                                return <Material bgColor="#fff" vM="0">
                                                    <RowWrapper>
                                                        <Row>
                                                            <CustomSelector label="Мат, заказа" value={item?.orderItem} name="orderItem" stateChange={e => handleItemChange(e, materialIndex)}>
                                                                {
                                                                    orderItems.map(({ node }) =>
                                                                        <MenuItem key={node.pk} value={node.pk} selected={node.pk === item?.orderItem}>{node.vendorProduct?.product?.name}</MenuItem>
                                                                    )
                                                                }
                                                            </CustomSelector>
                                                            <CustomSelector label="Фирма" value={item?.firm} name="firm" stateChange={e => handleItemChange(e, materialIndex)}>
                                                                {
                                                                    firms.map(({ node }) =>
                                                                        <MenuItem key={node.pk} value={node.pk} selected={node.pk === item?.firm}>{node.name}</MenuItem>
                                                                    )
                                                                }
                                                            </CustomSelector>
                                                            <CustomSelectorAdd label="Номер инвойса" value={item?.invoice} name="invoice" stateChange={e => handleItemChange(e, materialIndex)} disabled={!pk ? true : false} openInvoiceModal={handleInvoiceOpen}>
                                                                {
                                                                    invoices.map(({ node }) =>
                                                                        <CheckedMenuItem key={node.pk} value={node.pk} selected={node.pk === item?.invoice}>
                                                                            {node.number}
                                                                            <button className="editBtn" onClick={() => editInvoice(node.id)}></button>
                                                                        </CheckedMenuItem>
                                                                    )
                                                                }
                                                            </CustomSelectorAdd>
                                                            <CustomInputWithComponent type="text" label="Кол-во" value={item?.count} name="count" stateChange={e => handleItemChange(e, materialIndex)} component={requiredCounts[materialIndex] && <Badge>{requiredCounts[materialIndex]}</Badge>} />
                                                        </Row>
                                        
                                                        <Row>
                                                            <CustomInputWithComponent type="text" fullWidth label="Вес" value={item?.weight} name="weight" stateChange={e => handleItemChange(e, materialIndex)} component={<Measure>кг</Measure>} />
                                                            <CustomInputWithComponent type="text" fullWidth label="Вместимость" value={item?.size} name="size" stateChange={e => handleItemChange(e, materialIndex)} component={<Measure value="3" materialIndex>м</Measure>} />
                                                            <CustomInput fullWidth label="Цена инвойса" value={item?.invoicePrice} name="invoicePrice" stateChange={e => handleItemChange(e, materialIndex)} />
                                                        </Row>
                                                    </RowWrapper>
                                                    <RemoveIcon clicked={() => removeMaterial(materialIndex)} />
                                                </Material>
                                            })
                                        }
                                    </RowWrapper>
                               </Material>

                    })
                }
            </Form>
            <SmallDialog title="Cоздание нового инвойса" close={handleInvoiceEditClose} isOpen={openInvoice}>
                <CustomInput label="Номер инвойса" value={invoiceData.number} name="number" stateChange={handleInvoiceDataChange} />
                <CustomInput label="Брутто" value={invoiceData.brutto} name="brutto" stateChange={handleInvoiceDataChange} />
                <CustomInput label="Нетто" value={invoiceData.netto} name="netto" stateChange={handleInvoiceDataChange} />
                <Button name={invoicePk ? "сохранить" : "создать"} color="#5762B2" clickHandler={submitInvoice} />
            </SmallDialog>
            <SmallDialog title="Выбор заказа" close={handleOrderClose} isOpen={openOrder}>
                <CustomSelector label="Заказы" value={state.orders} name="orders" stateChange={e => handleChange({ fElem: e })} multiple
                    renderValue={selected => selected.join(", ")}>
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

const List = styled.div`
    width:${({width}) => width? `${width}px` : '100%'};
    padding:10px;
    box-sizing:border-box;
    background-color:#fff;
    border-radius:5px;
    border:1px solid rgba(0, 0, 0, 0.15);
    display:flex;
    justify-content:space-between;

    ${({ direction }) =>
        direction ? css`
            flex-direction:column;
            row-gap:10px;
        ` : ""
    }
    
`;

const Item = styled.div`
    h4{
        margin:0 0 5px 0;
        font-size:18px;
        font-weight:normal;
    }
    span{
        font-size:14px;
        color: rgba(0, 0, 0, 0.5);
    }
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
    margin: ${({vM}) => `${vM}px`} 0;
`;

const Material = styled.div`
    display: flex;
    gap: 10px;
    margin: ${({vM}) => `${vM}px`} 0;
    height: ${({fixHeight}) => fixHeight? '144px' : ''};
    background: ${({bgColor}) => bgColor};
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px; 
`;

const OrderInfoConatiner = styled.div`
    display:flex;
    width:100%;
    column-gap:10px
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
