import { Helmet } from 'react-helmet';
import styled from "styled-components";

import { useTitle } from '../../../hooks';
import { Form } from '../../../components/Form';
import { Footer } from '../../../components/Footer';
import { Button } from '../../../components/Buttons';
import { AddibleInput } from '../../../components/Flex';
import { RemoveIcon } from '../../../components/RemoveIcon';
import { DragFile } from '../../../components/Inputs/DragFile';
import { CustomInput } from '../../../components/Inputs/CustomInput';
import { CustomSelector } from '../../../components/Inputs/CustomSelector';
import { CustomLongInput } from '../../../components/Inputs/CustomLongInput';
// import CustomSelectorWithAdds, { SelectorBody } from "../../../components/Inputs/CustomSelectorWithAdds";
import { CustomSelectorAdd } from "../../../components/Inputs/CustomSelector";
import { EditableMenuItem } from "../../../components/Inputs/CustomSelector";
import { GET_ORDERS, GET_TRANSPORT_TYPES, GET_TRACKING_USER, GET_APPLICATION, CREATE_APPLICATION, UPDATE_APPLICATION } from "./gql";
import { GET_ORDER_ITEMS, GET_FIRMS, GET_INVOICES, CREATE_INVOICE, UPDATE_INVOICE } from "./gql";
import CustomPicker from "../../../components/Inputs/DatePicker";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";
import Switch from "@material-ui/core/Switch";
import { useTemplate, useFormData, useCustomMutation } from "../../../hooks";
import { useHistory } from "react-router-dom";
import { useLazyQuery } from "@apollo/client";
import { useState, useEffect, useMemo } from 'react';
import MenuItem from "@material-ui/core/MenuItem";
import { getList, getValueOfProperty } from "../../../utils/functions";
import moment from 'moment';
import { packagingTypes, deliveryCondition, statuses } from "../../../utils/static";


const initialState = {
    orders: "",
    trackingUser: "",
    transportType: "",
    deliveryCondition: "",
    degreeOfDanger: "",
    typeOfPackaging: "",
    packageOnPallet: "",
    transportCount: "",
    shippingDate: new Date(),
    status: "",
    transportMix: false
};

const ApplicationCreate = ({ match }) => {
    const title = useTitle("Создание новой Заявки"),
          {
            state,
            setState,
            handleChange
          } = useFormData(initialState),
          { id } = match.params,
          history = useHistory();


    const [getTrackingUserTypes, trackingUserTypesRes] = useLazyQuery(GET_TRACKING_USER),
          [getTransportTypes, transportTypesRes] = useLazyQuery(GET_TRANSPORT_TYPES),
          [getApplication, applicationRes] = useLazyQuery(GET_APPLICATION),
          [getOrders, orderRes] = useLazyQuery(GET_ORDERS),

          [getOrderItems, orderItemsRes] = useLazyQuery(GET_ORDER_ITEMS),
          [getInvoices, invoicesRes] = useLazyQuery(GET_INVOICES),
          [getFirms, firmsRes] = useLazyQuery(GET_FIRMS);


    const orders = getList(orderRes?.data) || [],
          transportTypes = getList(transportTypesRes?.data) || [],
          trackingUserType = getValueOfProperty(trackingUserTypesRes?.data, "role") || [],
          pk = getValueOfProperty(applicationRes?.data, "pk"),

          orderItems = getList(orderItemsRes?.data) || [],
          invoices = getList(invoicesRes?.data) || [],
          firms = getList(firmsRes?.data) || [];
    

    const memoizedTmpl = useMemo(() => {
        return {
            orderItem: "",
            firm: "",
            invoice: "",
            count: "",
            weight: "",
            size: "",
            invoicePrice: ""
        }   
    }, []);

    const [items, setItems] = useState([memoizedTmpl]);
    
    const {
              addTempl,
              removeTempl
          } = useTemplate(items, setItems, memoizedTmpl);


    const {
        submitData
    } = useCustomMutation({
            graphQlQuery: {
                queryCreate: CREATE_APPLICATION,
                queryUpdate: UPDATE_APPLICATION
            }
        },
        "Заявка",
        () => {
            history.push("supply/appplication");
        }
    );

    useEffect(() => {
        console.log("application items state", items);
    }, [items]);

    useEffect(() => {
        getFirms();
        getOrders();
        getInvoices();
        getOrderItems();
        getTransportTypes();
        getTrackingUserTypes();
    }, []);

    useEffect(() => {
        if(id !== undefined){
            getApplication({
                variables: {
                    id
                }
            });
        }
    }, [id]);

    useEffect(() => {
        const application = applicationRes?.data?.application;

        if(application !== undefined){
            setState({
                ...application,
                trackingUser: application.trackingUser.pk,
                transportType: application.transportType.pk,
            });
        }
    }, [applicationRes?.data?.application]);


    const handleDateChange = date => {
        setState({...state, shippingDate: date});
    }

    const handleItemChange = (e, idx) => {
        const tmp =  items.slice(0);
        tmp[idx][e.target.name] = e.target.value;
        setItems(tmp);
    }

    const handleSubmit = () => {
        const requestBody = {
            ...state,
            shippingDate: moment(state.shippingDate).format("YYYY-MM-DD")
        }

        requestBody.applicationItems = items;

        // console.log("pk", pk);
        pk? submitData(requestBody, pk) : submitData(requestBody);
    }

    return (
        <>
            <Helmet title={title} />
            <Form>
                <Title>Данные транспорта</Title>

                <AddibleInput>
                    <CustomSelector label="Заказы" value={state.order} name="orders" stateChange={e => handleChange({fElem: e, multiple: true})}>
                        {
                            orders.map(({node}) => 
                                <MenuItem key={node.pk} value={node.pk} selected={node.pk === state.order} >{node.publicId}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomSelector label="Роль" value={state.trackingUser} name="trackingUser" stateChange={e => handleChange({fElem: e})}>
                            <MenuItem key={trackingUserType.pk} value={trackingUserType.pk} selected={true}>{trackingUserType.displayName}</MenuItem>    
                    </CustomSelector>
                    <CustomSelector label="Тип транспорта" value={state.transportType} name="transportType" stateChange={e => handleChange({fElem: e})}>
                        {
                            transportTypes.map(({node}) => 
                                <MenuItem key={node.pk} value={node.pk} selected={node.pk === state.transportType}>{node.name}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomSelector label="Условия доставки" value={state.deliveryCondition} name="deliveryCondition" stateChange={e => handleChange({fElem: e})}>
                        {
                            deliveryCondition.map(condition => 
                                <MenuItem key={condition.value} value={condition.value} selected={state.deliveryCondition === condition.value}>{condition.label}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomSelector label="Тип упаковки" value={state.typeOfPackaging} name="typeOfPackaging" stateChange={e => handleChange({fElem: e})}>
                        {
                            packagingTypes.map(packaging => 
                                <MenuItem key={packaging.value} value={packaging.label} selected={state.typeOfPackaging === packaging.value}>{packaging.label}</MenuItem>    
                                )
                            }
                    </CustomSelector>
                    <CustomInput label="уровень опасности" value={state.degreeOfDanger} name="degreeOfDanger" stateChange={e => handleChange({fElem: e})}/>
                    <CustomNumber label="Кол-во на поддоне" value={state.packageOnPallet} name="packageOnPallet" stateChange={e => handleChange({fElem: e})} />
                    <CustomNumber label="Кол-во транспорта" value={state.transportCount} name="transportCount" stateChange={e => handleChange({fElem: e})} />
                    <CustomPicker label="Дата отгрузки" date={state.shippingDate} name="shippingDate" stateChange={date => handleDateChange(date)} />
                    {/* <CustomDateTimePicker label="Дата отгрузки" value={state.shippingDate} name="shippingDate" stateChange={date => handleDateChange(date)} /> */}
                    <CustomSelector label="Статус" value={state.status} name="status" stateChange={e => handleChange({fElem: e})}>
                        {
                            statuses.map(status => 
                                <MenuItem key={status.label} value={status.label} selected={state.status === status.value}>{status.label}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                </AddibleInput>
                <p>
                    <label htmlFor="transportMix">Комбинированный транспорт</label>
                    <Switch id="transportMix" name="transportMix" onChange={e => handleChange({fElem: e, type: "choice"})}/>
                </p>

                <DragFile />

                <Header>
                    <Title>Материал</Title>
                    <Button name="Добавить материал" color="#5762B2" clickHandler={addTempl} />
                </Header>
                {
                    items?.map((item, index) => {

                    return  <Material>
                                <RowWrapper>
                                    <Row>
                                        <CustomSelector label="Мат, заказа"  value={item.orderItem} name="orderItem" stateChange={e => handleItemChange(e, index)}>
                                            {
                                                orderItems.map(({node}) => 
                                                    <MenuItem key={node.pk} value={node.pk} selected={node.pk === item.orderItem}>{node.vendorProduct?.product?.name}</MenuItem>    
                                                )
                                            }
                                        </CustomSelector>
                                        <CustomSelector label="Фирма"  value={item.firm} name="firm" stateChange={e => handleItemChange(e, index)}>
                                            {
                                                firms.map(({node}) => 
                                                    <MenuItem key={node.pk} value={node.pk} selected={node.pk === item.firm}>{node.name}</MenuItem>
                                                )
                                            }
                                        </CustomSelector>
                                        <CustomSelector label="Номер инвойса" value={item.invoice} name="invoice" stateChange={e => handleItemChange(e, index)}>
                                            {
                                                invoices.map(({node}) => 
                                                    <MenuItem key={node.pk} value={node.pk} selected={node.pk === item.invoice}>{node.number}</MenuItem>
                                                )
                                            }
                                        </CustomSelector>
                                        {/* <CustomSelectorAdd label="Номер инвойса"  value={item.invoice} name="invoice">
                                            {
                                                invoices.map(({node}) => 
                                                    <EditableMenuItem key={node.pk} override={{value: node.pk, selected: node.pk === item.invoice}}>{node.number}</EditableMenuItem>
                                                )
                                            }
                                        </CustomSelectorAdd> */}
                                        <CustomInput label="Кол-во" value={item.count} name="count" stateChange={e => handleItemChange(e, index)} />
                                    </Row>

                                    <Row>
                                        <CustomNumber fullWidth label="Вес" value={item.weight} name="weight" stateChange={e => handleItemChange(e, index)} />
                                        <CustomNumber fullWidth label="Размер" value={item.size} name="size" stateChange={e => handleItemChange(e, index)} />
                                        <CustomNumber fullWidth label="Цена инвойса"  value={item.invoicePrice} name="invoicePrice" stateChange={e => handleItemChange(e, index)} />
                                    </Row>
                                </RowWrapper>
                                <RemoveIcon clicked={() => removeTempl(index)}/>
                            </Material>
                    })
                }
            </Form>

            <Footer>
                <span>Кол-во материалов: {items.length}</span>
                <Button name={pk? "Сохранить" : "Создать"} clickHandler={handleSubmit} />
            </Footer>
        </>
    )
}

export default ApplicationCreate;

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
