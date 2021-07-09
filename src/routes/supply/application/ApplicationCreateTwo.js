import { useContext } from "react";
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
import { GET_ORDERS, GET_TRANSPORT_TYPES, GET_TRACKING_USER, GET_MIX_TRACKING_USER, GET_APPLICATION, CREATE_APPLICATION, UPDATE_APPLICATION } from "./gql";
import { GET_ORDER_ITEMS, GET_FIRMS, GET_INVOICES, CREATE_INVOICE, UPDATE_INVOICE } from "./gql";
import CustomPicker from "components/Inputs/DatePicker";
import { CustomNumber } from "components/Inputs/CustomNumber";
import Switch from "@material-ui/core/Switch";
import { useTemplate, useFormData, useCustomMutation, useToggleDialog } from "hooks";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useState, useEffect, useMemo } from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import { formatPrice, getList, getValueOfProperty } from "utils/functions";
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
import Radio from "@material-ui/core/Radio";
import {default as ConfirmButton } from "@material-ui/core/Button";

const initialState = {
    orders: [],
    trackingUser: "",
    transportType: "",
    degreeOfDanger: undefined,
    packageOnPallet: "",
    transportCount: "",
    shippingDate: new Date(),
    // status: undefined,
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
        { id } = match.params,
        [openInvoice, handleInvoiceClose, handleInvoiceOpen] = useToggleDialog(),
        [openOrder, handleOrderClose, handleOrderOpen] = useToggleDialog(),
        history = useHistory();

    const [files, setFiles] = useState({
        fetched: [],
        uploaded: []
    });
    
    const [loading, setLoading] = useState(false);

    const [getTrackingUserTypes, trackingUserTypesRes] = useLazyQuery(GET_TRACKING_USER),
        [getMixTrackingUsertype, mixTrackingUserTypeRes] = useLazyQuery(GET_MIX_TRACKING_USER),
        [getTransportTypes, transportTypesRes] = useLazyQuery(GET_TRANSPORT_TYPES),
        [getApplication, applicationRes] = useLazyQuery(GET_APPLICATION),
        [getOrders, orderRes] = useLazyQuery(GET_ORDERS, {
            fetchPolicy: "no-cache"
        }),

        [getOrderItems, orderItemsRes] = useLazyQuery(GET_ORDER_ITEMS),
        [getInvoices, invoicesRes] = useLazyQuery(GET_INVOICES),
        [getFirms, firmsRes] = useLazyQuery(GET_FIRMS);

    const orders = useMemo(() => getList(orderRes?.data), [orderRes?.data]) || [],
        transportTypes = useMemo(() => getList(transportTypesRes?.data), [transportTypesRes?.data]) || [],
        trackingUserType = useMemo(() => getList(trackingUserTypesRes?.data), [trackingUserTypesRes?.data]) || [],
        mixTrackingUserType = useMemo(() => getList(mixTrackingUserTypeRes?.data), [mixTrackingUserTypeRes?.data]) || [],
        pk = getValueOfProperty(applicationRes?.data, "pk"),

        orderItems = useMemo(() => getList(orderItemsRes?.data), [orderItemsRes?.data]) || [],
        invoices = useMemo(() => getList(invoicesRes?.data), [invoicesRes?.data]) || [],
        firms = useMemo(() => getList(firmsRes?.data), [firmsRes?.data]) || [];


    const [orderTemplate, setOrderTemplate] = useState([]);

    const [invoiceData, setInvoiceData] = useState(invoiceInitial),
        [invoicePk, setInvoicePk] = useState(undefined);


    const applicationItemTemplate = {
        orderItem: "",
        firm: "",
        invoice: "",
        count: "",
        weight: "",
        size: "",
        invoicePrice: "",
        requiredCount: 0,
        trackingUser: "",
    }

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
        getMixTrackingUsertype();
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

            const items = getList(application.applicationItems).map(({ node }, idx) => {
                return {
                    ...exceptKey(node, ["__typename"]),
                    firm: node?.firm?.pk,
                    invoice: node?.invoice?.pk,
                    requiredCount: node?.orderItem?.requiredCount
                }
            });


            // Distribute applicationItems between orders

            // 1) Get order objects

            const selectedOrders = [];

            application.orders.edges.forEach(({node}) => {
                const orderPk = node.pk;

                const found = orders.find(({node}) => node.pk === orderPk)?.node;
                      
                const order = {
                    pk: found?.pk,
                    publicId: found?.publicId,
                    factory: found?.vendorFactory?.factory?.name,
                    vendor: found?.vendorFactory?.vendor?.companyName,
                    trackingUser: "",
                }

                let itemsByOrderPk = items.filter(item => item?.orderItem?.order?.pk === order.pk); 

                
                // Add trackingUser to order and remove it from applicationItems
                order.trackingUser = itemsByOrderPk[0]?.trackingUser?.pk;
                
                
                itemsByOrderPk = itemsByOrderPk.map(itemByOrderPk => {
                    return {
                        ...exceptKey(itemByOrderPk, ["trackingUser"]),
                        orderItem: itemByOrderPk.orderItem.pk,
                        invoicePrice: formatPrice(itemByOrderPk.invoicePrice)
                    }
                });
                
                order.applicationItems = itemsByOrderPk;

                selectedOrders.push(order);
            
            });


            setState({
                ...exceptKey(application, ["applicationItems", "__typename", "pk"]),
                trackingUser: application?.trackingUser?.pk,
                transportType: application?.transportType?.pk || null,
                orders: application?.orders?.edges?.map(({ node }) => node.pk)
            });
            setOrderTemplate(selectedOrders);

        }
    }, [applicationRes?.data?.application?.application?.pk, ]);

    useEffect(() => {
        console.log("orders", orders)
        if(state.orders.length > 0){
            getOrderItems({
                variables: {
                    orders: state.orders
                }
            });
        }
    }, [state.orders])

    const handleDateChange = date => {
        setState({ ...state, shippingDate: date });
    }


    const submitInvoice = () => {

        const requestBody = {
            ...exceptKey(invoiceData, ["id", "pk"])
        }
        invoicePk ? submitInvoiceData(requestBody, invoicePk, id) : submitInvoiceData({...requestBody, application: pk}, undefined, id);
    }

    
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

    const handleInvoiceDataChange = (e) => {
        const name = e.target.name;
        // if(name === "amount"){
        //     setInvoiceData({...invoiceData, [name]: formatInputPrice(e.target.value)});
        // }else{
            setInvoiceData({...invoiceData, [name]: e.target.value});
        // }
    }

    const beforeSubmit = () => {

        let requestBody = {
            ...state,
            shippingDate: moment(state.shippingDate).format("YYYY-MM-DD"),
            // status: statuses.find(status => status.value === state.status)?.label,
            degreeOfDanger: degreeOfDanger.find(degree => degree.value === state.degreeOfDanger)?.label
        }

        // We have to extract all (applicationItems) from  orders
        // and collect them into one array.
        const templates = orderTemplate.slice(0);

        const reducer = (applicationItemsList, currentOrder) => {
            const applicationItems = currentOrder.applicationItems,
                  trackingUser = currentOrder.trackingUser; 

            applicationItems.forEach(applicationItem => 
                applicationItemsList.push({...exceptKey(!pk? exceptKey(applicationItem, ["invoice"]) : applicationItem, ["requiredCount"]), trackingUser})
            );

            return applicationItemsList;
        }

        let applicationItems = templates.reduce(reducer,[]);
        
        // Check if amount of orders is one remove trackingUser from applicationItem


        
        // Reset price in applicationItems
        applicationItems = applicationItems.map(item => ({
            ...item,
            invoicePrice: resetPriceFormat(item.invoicePrice)
        }));

        // Add applicationItems to requestBody
        requestBody = {
            ...requestBody,
            applicationItems
        }

        requestBody.files = files.uploaded.map(file => file.file_id);

        if(!requestBody.transportMix){
            delete requestBody.trackingUser;
        }


        if (pk) {
            handleSubmit(exceptKey(requestBody, ["orders"]), pk);
        } else {
            handleSubmit(requestBody)
        }
    }

    
    const sendFileToServer = (file) => {
        setLoading(true);

        uploadFile('/api-file/documents/', file).then(res => {
            setFiles({ ...files, uploaded: [...files.uploaded, { file_id: res.data[0].id, file_name: file.name }] })
            setLoading(false);
        }).catch(err => console.log(err));
    }

    const handleItemChange = (e, orderPk, itemIndex) => {
        let templates = orderTemplate.slice(0);

        const { name, value }= e.target;
        const { foundIndex, found } = getApplicationItem(orderPk);
        
        if(name === "invoicePrice"){
            found.applicationItems[itemIndex][name] = formatInputPrice(value);
        }else if(name === "orderItem"){
            found.applicationItems[itemIndex][name] = value;
            
            // We have to find necessary orderItem by selectedPk then take requiredCount value 
            // from found orderItem and update requiredCount value in applicationItem
            const foundOrderItem = orderItems.find(({node}) => node.pk === value)?.node,
                  { requiredCount } = foundOrderItem;
            
            // Update requiredCount in found
            found.applicationItems[itemIndex].requiredCount = requiredCount;  
            
        }else{
            found.applicationItems[itemIndex][name] = value;
        }

        templates[foundIndex] = found;

        setOrderTemplate(templates);
    }

    const handleOrderTrackingChange = (e, orderPk) => {
        const { name, value } = e.target;
        let templates = orderTemplate.slice(0);
        
        const { foundIndex, found } = getApplicationItem(orderPk);

        found[name] = value;

        templates[foundIndex] = found;

        setOrderTemplate(templates);
    }   

    const handleOrderOneChange = (e) => {
        const selectedOrderPk = e.target.value;
        const templates = orderTemplate.slice(0);

        const found = orders.find(({node}) => node.pk == selectedOrderPk)?.node;

        const order = {
            pk: found.pk,
            trackingUser: "",
            publicId: found.publicId,
            factory: found.vendorFactory.factory.name,
            vendor: found.vendorFactory.vendor.companyName,
            applicationItems: [applicationItemTemplate],

        }

        // order.applicationItems = [applicationItemTemplate];
        
        templates[0] = order;

        setOrderTemplate(templates);
        setState({
            ...state,
            orders: [e.target.value]
        })
    }

    const handleOrderChange = (e) => {
        const selectedOrdersPk = e.target.value;
        let templates = orderTemplate.slice(0);

        // Compares (selectedOrdersPk) and (templates Pk);

        // 1) First get all pks from templates array use (map) to modify templates
        const templatesPk = templates.map(orderTemplate => orderTemplate.pk);
        
        // 2) Find unchecked pks by checking existing selectedOrdersPk
        let uncheckedPksList = [];
        for(let i = 0; i < templatesPk.length; i++){
            let match = false;
            for(let l = 0; l < selectedOrdersPk.length; l++){
                if(templatesPk[i] === selectedOrdersPk[l]){
                    match = true;
                }
            }
            if(match == false){
                uncheckedPksList.push(templatesPk[i]);
            }
        }

        // 3) Remove order templates on unchcked pks
        for(let pk of uncheckedPksList){
            const foundOrderTemplate = templates.find(orderTemplate => orderTemplate.pk === pk);

            const foundIndex = templates.indexOf(foundOrderTemplate);

            templates.splice(foundIndex, 1);
        }

        // 4) Check whether selcted pk exists in array if not 
        // create empty order template and add it to templates
        for(let i = 0; i < selectedOrdersPk.length; i++){
            const found = templates.find(orderTemplate => orderTemplate?.pk === selectedOrdersPk[i]);
            // If theres is not order with such (pk) we will create template and it to orderTemplate list
            if(found === undefined){                
                const orderByPk = orders.find(({node}) => node.pk === selectedOrdersPk[i])?.node;

                const order = {
                    pk: orderByPk?.pk,
                    publicId: orderByPk?.publicId,
                    trackingUser: "",
                    factory: orderByPk?.vendorFactory?.factory?.name,
                    vendor: orderByPk?.vendorFactory?.vendor?.companyName,
                    applicationItems: [applicationItemTemplate]
                }

                templates.push(order);
            }
        }

        setOrderTemplate(templates);

        handleChange({fElem: e});
    }

    const getApplicationItem = (orderPk) => {
        let templates = orderTemplate.slice(0);

        let found = templates.find(template => template.pk === orderPk);
        const foundIndex = templates.indexOf(found);
        found = { ...found };

        found.applicationItems = found.applicationItems.slice(0);

        return {
            foundIndex,
            found
        }
    }

    const addApplicationItemToOrder = (orderPk) => {
        let templates = orderTemplate.slice(0);
        
        const {foundIndex, found} = getApplicationItem(orderPk);

        found.applicationItems.push(applicationItemTemplate)
    
        templates[foundIndex] = found;
        setOrderTemplate(templates);

    }

    const removeApplicationItemOrder = (orderPk, itemIndex) => {
        
        let templates = orderTemplate.slice(0);

        const {foundIndex, found} = getApplicationItem(orderPk);
        

        found.applicationItems.splice(itemIndex, 1);
        

        templates[foundIndex] = found;
        setOrderTemplate(templates);
        
    }

    const removeOrder = (orderPk) => {
        // 1) Remove orderPk from state.orders
        let ordersPk = state?.orders?.slice(0);
            ordersPk = ordersPk?.filter(pk => pk !== orderPk);
        
        // 2) Remove orderTemplate on orderPk
        let templates = orderTemplate?.slice(0);
            templates = templates?.filter(template =>  template.pk !== orderPk); 

        setState({
            ...state,
            orders: ordersPk
        });
        setOrderTemplate(templates);

    }

    const [transportMixMessage, setTransportMixMessage] = useState(""),
          [selectedOption, setSelectedOption] = useState(undefined);


    const handleTransportMixChange = (e) => {

        // Check whether we switch from (mixed) to (normal) 
        if(state.transportMix === true || e.target.checked === false){
            if(state.orders.length > 1){
                setTransportMixMessage("В обычной заявке не может быть более одного заказа! Выберите один из списка");
                handleOrderOpen();
            }
            
            if(state.orders.length === 1){
                setState({
                    ...state,
                    trackingUser: "",
                    transportMix: e.target.checked 
                });
            }

            if(state.orders.length === 0){
                setState({
                    ...state,
                    transportMix: e.target.checked
                });
            }
            
            

        }else{
            handleChange({ fElem: e, type: "choice" });
        }

    }


    const handleCheckboxChange = (e) => {
        setSelectedOption(e.target.value)
    }


    const handleConfirmOrderChoice = () => {

        // Update orderTemplate, remain that template that much to selected order pk
        const selectedTemplate = orderTemplate.find(template => template.pk === +selectedOption);
        setOrderTemplate([selectedTemplate]);
        
        // Reset (message) and (selectedOption) than close modal 
        
        handleOrderClose();
        setTransportMixMessage("");
        setSelectedOption(undefined);    

        setState({
            ...state,
            orders: [+selectedOption],
            trackingUser: "",
            transportMix: !state.transportMix
        });
    }
    
    // Variable to count applicationItems
    let applicationItemCount = 0;

    return (
        <>
            <Helmet title={title} />
            <Form>
                <Title>Данные транспорта</Title>

                <AddibleInput>
                        <>               
                            {
                                !state.transportMix && orderTemplate.length === 1 &&
                                    <div>
                                        <CustomSelector label="Логист" value={orderTemplate[0]?.trackingUser} name="trackingUser" stateChange={e => handleOrderTrackingChange(e, orderTemplate[0]?.pk)} >
                                            {
                                                trackingUserType.map(({node}) => 
                                                    <MenuItem key={node.pk} value={node.pk}>{node.username}</MenuItem>
                                                )
                                            }
                                        </CustomSelector>
                                    </div>
                            }
                            {
                                state.transportMix &&
                                    <div>
                                        <CustomSelector label="Сборный Логист" value={state.trackingUser} name="trackingUser" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.trackingUser.length ? true : false} >
                                            {
                                                mixTrackingUserType.map(({ node }) =>
                                                    <MenuItem key={node.pk} value={node.pk}>{node.username}</MenuItem>
                                                )
                                            }
                                        </CustomSelector>
                                    </div>
                            }
                            {
                                validationMessages.trackingUser.length ? <ValidationMessage>{validationMessages.trackingUser}</ValidationMessage> : null
                            }
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
                            <CustomNumber label="Кол-во мест" value={state.packageOnPallet} name="packageOnPallet" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.packageOnPallet.length ? true : false} fullWidth />
                            {
                                validationMessages.packageOnPallet.length ? <ValidationMessage>{validationMessages.packageOnPallet}</ValidationMessage> : null
                            }
                        </div>
                        <div>
                            <CustomNumber label="Кол-во транспорта" value={state.transportCount} name="transportCount" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.transportCount.length ? true : false} fullWidth />
                            {
                                validationMessages.transportCount.length ? <ValidationMessage>{validationMessages.transportCount}</ValidationMessage> : null
                            }
                        </div>

                        <CustomPicker label="Дата отгрузки" date={state.shippingDate} name="shippingDate" stateChange={date => handleDateChange(date)} />
                        {/* <div>
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
                        </div> */}
                    </>

                </AddibleInput>
                <p>
                    <label htmlFor="transportMix">Сборный груз</label>
                    <Switch id="transportMix" name="transportMix" onChange={e => handleTransportMixChange(e)} checked={state.transportMix} />
                </p>

                <DragFile
                    fetchedFiles={files.fetched}
                    uploadedFiles={files.uploaded}
                    receivedFile={(file) => sendFileToServer(file)}
                    removeClicked={(id) => setFiles({ ...files, uploaded: files.uploaded.filter((e) => e.file_id !== id) })}
                    loading={loading}
                />

                <Header vM="30" >
                    <Title>Заказы</Title>
                    <Button name="Добавить заказ" color="#5762B2" clickHandler={handleOrderOpen} />
                </Header>
                {
                    orderTemplate?.map(order => {

                        const applicationItems = order?.applicationItems || [];

                        return (
                            <Material bgColor="#F6F6FC" vM="20">
                                <RowWrapper>
                                    <RowWrapper>
                                    <OrderInfoConatiner>
                                        <List>
                                            <Item>
                                                <h4>Номер заказа</h4>
                                                <span>{order?.publicId}</span>
                                            </Item>
                                            <Item>
                                                <h4>Завод</h4>
                                                <span>{order?.factory}</span>
                                            </Item>
                                            <Item>
                                                <h4>Поставщик</h4>
                                                <span>{order?.vendor}</span>
                                            </Item>
                                        </List>
                                        {
                                            state.transportMix &&
                                            <List width="370">
                                                <CustomSelector label="Логист" name="trackingUser" value={order.trackingUser} stateChange={e => handleOrderTrackingChange(e, order.pk)} fullWidth>
                                                    {
                                                        trackingUserType.map(({node}) =>
                                                            <MenuItem key={node?.pk} value={node?.pk}>{node?.username}</MenuItem>
                                                        )
                                                    }
                                                </CustomSelector>
                                            </List>
                                        }
                                        <RemoveIcon clicked={() => removeOrder(order.pk)} />
                                        </OrderInfoConatiner>   
                                        <Header vM="0">
                                            <Title>Материалы</Title>
                                            <Button name="Добавить материал" color="#5762B2" clickHandler={() => addApplicationItemToOrder(order.pk)} />
                                        </Header>
                                    </RowWrapper>
                                {
                                    applicationItems?.map((item, index) => {
                                    
                                        applicationItemCount++;

                                        return (
                                            <Material bgColor="#fff" vM="0">
                                                <RowWrapper>
                                                    <Row>
                                                        <CustomSelector label="Мат, заказа" value={item?.orderItem} name="orderItem" stateChange={e => handleItemChange(e, order.pk, index)}>
                                                            {
                                                                orderItems.map(({ node }) =>
                                                                    <MenuItem key={node.pk} value={node.pk} selected={node.pk === item?.orderItem}>{node.vendorProduct?.product?.name}</MenuItem>
                                                                )
                                                            }
                                                        </CustomSelector>
                                                        <CustomSelector label="Фирма" value={item?.firm} name="firm" stateChange={e => handleItemChange(e, order.pk, index)}>
                                                            {
                                                                firms.map(({ node }) =>
                                                                    <MenuItem key={node.pk} value={node.pk} selected={node.pk === item?.firm}>{node.name}</MenuItem>
                                                                )
                                                            }
                                                        </CustomSelector>
                                                        <CustomSelectorAdd label="Номер инвойса" value={item?.invoice} name="invoice" stateChange={e => handleItemChange(e, order.pk, index)} disabled={!pk ? true : false} openModal={handleInvoiceOpen}>
                                                            {
                                                                invoices.map(({ node }) =>
                                                                    <CheckedMenuItem key={node.pk} value={node.pk} selected={node.pk === item?.invoice}>
                                                                        {node.number}
                                                                        <button className="editBtn" onClick={() => editInvoice(node.id)}></button>
                                                                    </CheckedMenuItem>
                                                                )
                                                            }
                                                        </CustomSelectorAdd>
                                                        {/* <CustomInputWithComponent type="text" label="Кол-во" value={item?.count} name="count" stateChange={e => handleItemChange(e, order.pk, index)} component={requiredCounts[index] && <Badge>{requiredCounts[index]}</Badge>} /> */}
                                                        <CustomInputWithComponent type="text" label="Кол-во" value={item?.count} name="count" stateChange={e => handleItemChange(e, order.pk, index)} component={<Badge>{item?.requiredCount}</Badge>} />
                                                    </Row>
                                    
                                                    <Row>
                                                        <CustomInputWithComponent type="text" fullWidth label="Вес" value={item?.weight} name="weight" stateChange={e => handleItemChange(e, order.pk, index)} component={<Measure>кг</Measure>} />
                                                        <CustomInputWithComponent type="text" fullWidth label="Вместимость" value={item?.size} name="size" stateChange={e => handleItemChange(e, order.pk, index)} component={<Measure value="3" index>м</Measure>} />
                                                        <CustomInput fullWidth label="Цена инвойса" value={item?.invoicePrice} name="invoicePrice" stateChange={e => handleItemChange(e, order.pk, index)} />
                                                    </Row>
                                                </RowWrapper>
                                                <RemoveIcon clicked={() => removeApplicationItemOrder(order.pk, index)} />
                                            </Material>
                                        )
                                    })
                                }
                                </RowWrapper>
                            </Material>
                        )
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
                {
                    (transportMixMessage.length > 0)?
                            <> 
                                <ConfirmationMessage>{transportMixMessage}</ConfirmationMessage>
                                <RadioGroup>
                                    {
                                        state.orders.map(orderPk => 
                                            <label>{orderPk} <Radio name="order" value={orderPk} onChange={handleCheckboxChange} checked={selectedOption == orderPk} /></label>     
                                        )
                                    }
                                </RadioGroup>
                                <ConfirmButton color="primary" onClick={handleConfirmOrderChoice}>подтвердить</ConfirmButton>
                            </>
                            : 
                            <>
                                {   
                                    state.transportMix? 
                                        <CustomSelector label="Заказы" value={state.orders} name="orders" stateChange={e => handleOrderChange(e)} multiple
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
                                        </CustomSelector> :
                                        <CustomSelector label="Заказы" name="orders" value={state.orders[0]} stateChange={e => handleOrderOneChange(e)}>
                                            {
                                                orders.map(({node}) => 
                                                    <MenuItem key={node.pk} value={node.pk}>
                                                        {node.pk}
                                                    </MenuItem>
                                                )
                                            }
                                        </CustomSelector> 
                                }
                            </>
                }
            </SmallDialog>
            <Footer>
                <span>Кол-во материалов: {applicationItemCount}</span>
                <Button name={pk ? "Сохранить" : "Создать"} clickHandler={beforeSubmit} loading={mutationLoading} />
            </Footer>

        </>
    )
}

const RadioGroup = styled.div`
    width:100%;
    display:flex;
    flex-direction:row;
    justify-content:space-around;
`;

const ConfirmationMessage = styled.p`
    color: #F50057;
    text-align: center;
`;

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
    grid-template-columns: repeat(auto-fill, minmax(20%, 1fr)); 
    align-items: center;


    @media(max-width: 1100px){
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    }
`;



export default ApplicationCreate;