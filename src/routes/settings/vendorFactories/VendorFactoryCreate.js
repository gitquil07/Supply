import {  useEffect, useMemo } from "react";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import CustomPicker from "../../../components/Inputs/DatePicker";
import { Form } from "../../../components/Form";
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Buttons";
import { AddibleInput } from "../../../components/Flex";
import { Helmet } from "react-helmet";
import { MenuItem } from "@material-ui/core";

import { useTitle } from "../../../hooks";
import { useLazyQuery } from "@apollo/client";
import { exceptKey } from "../../../utils/functions";
import { GET_FACTORIES, GET_VENDORS, GET_VENDOR_FACTORY, CREATE_VENDOR_FACTORY, UPDATE_VENDOR_FACTORY, GET_VENDOR_DEPENDENT_PRODUCT } from "./gql";
import { paymentOptions } from "../../../utils/static";
import { useHistory } from "react-router-dom";
import Switch from "@material-ui/core/Switch";
import moment from "moment";
import styled from "styled-components";

import { useCustomMutation, useFormData } from "../../../hooks";
import { getList } from "../../../utils/functions";

const initialState = {
    vendor: "",
    factory: "",
    paymentCondition: "",
    partnerStartDate: new Date(),
    isActive: true
};

const FactoryCreate = ({ match }) => {

    const title = useTitle("Создание нового Поставщика"),
          {id} = match.params,
          history = useHistory();

    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

    const [getFactories, factoriesRes] = useLazyQuery(GET_FACTORIES),
          [getVendors, vendorsRes] = useLazyQuery(GET_VENDORS),
          [getVendorFactory, vendorFactoryRes] = useLazyQuery(GET_VENDOR_FACTORY),
          [getDependentMaterials, dependentMaterialsRes] = useLazyQuery(GET_VENDOR_DEPENDENT_PRODUCT);

    const factoriesFull = useMemo(() => getList(factoriesRes?.data), [factoriesRes?.data]) || [], 
          factories = useMemo(() => factoriesFull.map(({node}) => {
              const obj = exceptKey(node, ["__typename"]);
              return obj;
          }), [factoriesFull]);

    const vendorsFull = useMemo(() => getList(vendorsRes?.data), [vendorsRes?.data]) || [],
          vendors = useMemo(() => vendorsFull.map(({node}) => {
              const obj = exceptKey(node, ["__typename"]);
              return obj; 
          }), [vendorsFull]);

    const vendorFactory = vendorFactoryRes?.data?.vendor?.vendorFactory,
          pk = vendorFactory?.pk;

    const dependentMaterials = useMemo(() => getList(dependentMaterialsRes?.data)?.map(({node}) => {
            return {
                ...exceptKey(node, ["__typename", "vendorFactory"]),
                factory: node.vendorFactory.factory?.name,
                product: node.product?.name
            }
    }), [dependentMaterialsRes?.data]);

    const { submitData } = useCustomMutation({
            graphQlQuery: {
                queryCreate: CREATE_VENDOR_FACTORY,
                queryUpdate: UPDATE_VENDOR_FACTORY
            }
        },
        "Поставщик",
        () => {
            history.push("/settings/vendor-factories");
        }
    );


    useEffect(() => {
        console.log("state", state);
    }, [state]);

    useEffect(() => {

        if(id !== undefined){
            getVendorFactory({
                variables: {
                    id
                }
            })
        }

    }, [id]);

    useEffect(() => {

        getFactories();
        getVendors();
        getDependentMaterials();

    }, []);

    useEffect(() => {

        if(vendorFactory !== undefined){
            const obj = exceptKey(vendorFactory, ["__typename", "pk"]);
            setState({
                ...obj,
                factory: obj.factory?.pk,
                vendor: obj.vendor?.pk
            });

        }

    }, [vendorFactory])
    
    const handleDateChange = (date) => {
        setState({...state, partnerStartDate: date});
    }

    const handleSubmit = () => {

        const data = {...state, partnerStartDate: moment(state.partnerStartDate).format("YYYY-MM-DD")};

        pk? submitData(exceptKey(data, ["factory", "vendor"]), pk) : submitData(data);

    }


    return (
        <>  
            <Helmet>
                <title>{title}</title>
            </Helmet>
            <Form>
                <p>Информация о поставщике</p>
                <AddibleInput>
                    <CustomSelector label="Завод" name="factory" disabled={id? true : false} stateChange={e => handleChange({fElem: e})} value={state.factory}>
                        {
                            factories?.map(factory => 
                                <MenuItem value={factory.pk} selected={factory.pk === state.factory}>{factory.name}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomSelector label="Поставщик" name="vendor" disabled={id? true : false} stateChange={e => handleChange({fElem: e})} value={state.vendor}>
                        {
                            vendors?.map(vendor => 
                                <MenuItem value={vendor.pk} selected={vendor.pk === state.vendor}>{vendor.name}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomSelector label="Условия оплаты" name="paymentCondition" stateChange={e => handleChange({fElem: e})} value={state.paymentCondition}>
                        {
                            paymentOptions?.map(option => 
                                <MenuItem value={option.value}>{option.label}</MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomPicker
                        name="partnerStartDate"
                        label="Начало сотрудничества"
                        date={state.partnerStartDate}
                        stateChange={date => handleDateChange(date)}
                    />
                </AddibleInput>
                <label htmlFor="isActive">Активность : </label>
                <Switch 
                    name="isActive"
                    id="isActive"
                    color="primary"
                    checked={state.isActive}
                    onChange={e => handleChange({fElem: e, type: "choice"})} />

                    {
                        id && (
                            <>
                                <p>Список зависимых материалов</p>
                                <GreyTable>
                                    <Head>
                                        <span> Завод: </span>
                                        <span> Продукт: </span>
                                        <span> Цена: </span>
                                        <span> Дни изготовления: </span>
                                        <span> Дни доставки: </span>
                                        <span> Дата изменения: </span>
                                    </Head>
                                    <Body>
                                        {
                                            dependentMaterials?.map(material => 
                                                <List>
                                                      <span>{material.factory}</span>
                                                      <span>{material.product}</span>
                                                      <span>{material.price}</span>
                                                      <span>{material.deliveryDayCount}</span>
                                                      <span>{material.productionDayCount}</span>
                                                      <span>{material.updatedAt}</span>
                                                </List>    
                                            )
                                        }
                                    </Body>
                                </GreyTable>
                            </>
                        )
                    }
            </Form>
            <Footer justify="flex-end">
                <Button name={pk? "сохранить" : "создать"} clickHandler={handleSubmit} />
            </Footer>
        </>
    );

}


const GreyTable = styled.div`
    width: 100%;
    background-color: #F6F6FC;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    font-size: 18px;
    margin-top: 20px;
    padding: 10px; 
`;

const Head = styled.div`
    display: grid;
    grid-template-columns: .7fr 0.7fr 0.7fr .5fr .7fr 0.7fr 0.7fr;
    padding: 0 10px 10px 10px;
    gap: 10px;
`;

const Body = styled.div` 
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
`;

const List = styled.div`
    display: grid;
    grid-template-columns: .7fr 0.7fr 0.7fr .5fr .7fr 0.7fr 0.7fr;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);

    :last-child {
        border: none;
    }
`;

export default FactoryCreate;