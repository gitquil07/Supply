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

const vals = ["sadasds", "sadasdsadfg", "gferfgre"];


const initialState = {
    orders: "",
    trackingUser: "",
    transportType: "",
    deliveryCondition: "",
    degreeOfDanger: "",
    typeOfPackaging: "",
    packageOnPallet: "",
    transportCount: "",
    shippingDate: "",
    status: "",
    transportMix: ""
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


    const [getApplication, applicationRes] = useLazyQuery(GET_APPLICATION),
          [getOrders, orderRes] = useLazyQuery(GET_ORDERS),
          [getTransportTypes, transportTypesRes] = useLazyQuery(GET_TRANSPORT_TYPES),
          [getTrackingUserTypes, trackingUserTypesRes] = useLazyQuery(GET_TRACKING_USER);


    const orders = getList(orderRes?.data) || [],
          transportTypes = getList(transportTypesRes?.data) || [],
          trackingUserType = getValueOfProperty(trackingUserTypesRes?.data, "role") || [],
          pk = getValueOfProperty(applicationRes?.data, "pk");
    

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
        getOrders();
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

        // pk? submitData(application, pk) : submitData(application);
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
                                <MenuItem key={node.pk} value={node.pk}>{node.publicId}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomSelector label="Роль" value={state.trackingUser} name="trackingUser" stateChange={e => handleChange({fElem: e})}>
                            <MenuItem key={trackingUserType.pk} value={trackingUserType.pk}>{trackingUserType.displayName}</MenuItem>    
                    </CustomSelector>
                    <CustomSelector label="Тип транспорта" value={state.transportType} name="transportType" stateChange={e => handleChange({fElem: e})}>
                        {
                            transportTypes.map(({node}) => 
                                <MenuItem key={node.pk} value={node.pk}>{node.name}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomInput label="Условия доставки" value={state.deliveryCondition} name="deliveryCondition" stateChange={e => handleChange({fElem: e})}/>
                    <CustomInput label="уровень опасности" value={state.degreeOfDanger} name="degreeOfDanger" stateChange={e => handleChange({fElem: e})}/>
                    <CustomInput label="Тип упаковки" value={state.typeOfPackaging} name="typeOfPackaging" stateChange={e => handleChange({fElem: e})} />
                    <CustomNumber label="Кол-во на поддоне" value={state.packageOnPallet} name="packageOnPallet" stateChange={e => handleChange({fElem: e})} />
                    <CustomNumber label="Кол-во транспорта" value={state.transportCount} name="transportCount" stateChange={e => handleChange({fElem: e})} />
                    <CustomPicker label="Дата отгрузки" value={state.shippingDate} name="shippingDate" stateChange={date => handleDateChange(date)} />
                    <CustomInput label="Статус" value={state.status} name="status" stateChange={e => handleChange({fElem: e})} />
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
                                        <CustomSelector label="Мат, заказа"  value={item.orderItem} name="orderItem" stateChange={e => handleItemChange(e, index)} />
                                        <CustomSelector label="Фирма"  value={item.firm} name="firm" stateChange={e => handleItemChange(e, index)} />
                                        <CustomSelectorAdd label="Номер инвойса"  value={item.invoice} name="invoice">
                                            <EditableMenuItem stateChange={() => {}}  override={{value: 1, selected: false}}>
                                                    saSDADSADZ
                                            </EditableMenuItem>
                                            <EditableMenuItem stateChange={() => {}} override={{value: 2, selected: true}}>
                                                    DFGDFGDF
                                            </EditableMenuItem>
                                        </CustomSelectorAdd>
                                        <CustomInput label="Кол-во" value={item.count} name="count" stateChange={e => handleItemChange(e, index)} />
                                        <CustomNumber label="Вес" value={item.weight} name="weight" stateChange={e => handleItemChange(e, index)} />
                                        <CustomNumber label="Размер" value={item.size} name="size" stateChange={e => handleItemChange(e, index)} />
                                        <CustomNumber label="Цена инвойса"  value={item.invoicePrice} name="invoicePrice" stateChange={e => handleItemChange(e, index)} />
                                    </Row>

                                    {/* <Row>
                                        <CustomNumber label="Вес"/>
                                        <CustomNumber label="Размер" />
                                        <CustomNumber label="Цена инвойса" />
                                    </Row> */}
                                </RowWrapper>
                                <RemoveIcon clicked={() => removeTempl(index)}/>
                            </Material>
                    })
                }
            </Form>

            <Footer>
                <span>Кол-во материалов: 6</span>
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
