import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { AddibleInput } from "../../../components/Flex";
import { Form } from "../../../components/Form";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { useTitle } from "../../../hooks";
import styled from "styled-components"
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Buttons";

import MenuItem from "@material-ui/core/MenuItem";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { currencies } from "../../../utils/static";
import Switch from "@material-ui/core/Switch";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";


import { GET_FACTORIES, GET_VENDOR_FACTORIES, GET_PRODUCTS, CREATE_VENDOR_PRODUCT, UPDATE_VENDOR_PRODUCT, GET_VENDOR_PRODUCT, GET_VENDOR_PRODUCT_HISTORY } from "./gql";
import { exceptKey } from "../../../utils/functions";
import { useCustomMutation, useFormData } from "../../../hooks";
import { getList } from "../../../utils/functions";

const initialState = {
    "factory": "",
    "vendorFactory": "",
    "product": "",
    "price": "",
    "deliveryDayCount": "",
    "productionDayCount": "",
    "isActive": true,
    "currency": ""
}

const SuppliersCreate = ({ match }) => {
    const {id} = match.params,
          title = useTitle("Создание нового материала"),
          history = useHistory();
    
    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

    const [getFactories, factoriesRes] = useLazyQuery(GET_FACTORIES),
          [getVendorFactories, vendorFactoriesRes] = useLazyQuery(GET_VENDOR_FACTORIES),
          [getProducts, productsRes] = useLazyQuery(GET_PRODUCTS),
          [getVendorProduct, vendorProductRes] = useLazyQuery(GET_VENDOR_PRODUCT),
          [getVendorProductHistory, vendorProductHistoryRes] = useLazyQuery(GET_VENDOR_PRODUCT_HISTORY);


    // const factories = getList(factoriesRes?.data) || [],
    //       vendorFactories = getList(vendorFactoriesRes?.data) || [],
    //       products = getList(productsRes?.data) || [],
    //       pk = getList(vendorProductRes?.data) || [],
    //       vendorProductHistoriesFull = getList(vendorProductHistoryRes?.data) || [],
    //       vendorProductHistories = vendorProductHistoriesFull.map(({node}) => {
    //         const obj = exceptKey(node, ["vendorFactory", "__typename"]);
    //         return {
    //             ...obj,
    //             factory: node.vendorFactory.factory.name,
    //             vendor: node.vendorFactory.vendor.name,
    //             product: node.product.name
    //         }
    //       });

    
    const factories = useMemo(() => getList(factoriesRes?.data), [factoriesRes?.data]) || [],
          vendorFactories = useMemo(() => getList(vendorFactoriesRes?.data), [vendorFactoriesRes?.data]) || [],
          products = useMemo(() => getList(productsRes?.data), [productsRes?.data]) || [],
          pk = useMemo(() => getList(vendorProductRes?.data), [vendorProductRes?.data]) || undefined,
          vendorProductHistoriesFull = useMemo(() => getList(vendorProductHistoryRes?.data), [vendorProductHistoryRes?.data]) || [],
          vendorProductHistories = useMemo(() => vendorProductHistoriesFull.map(({node}) => {
                    return {
                        ...exceptKey(node, ["vendorFactory", "__typename"]),
                        factory: node.vendorFactory.factory.name,
                        vendor: node.vendorFactory.vendor.name,
                        product: node.product.name
                    }
                }), [vendorProductHistoriesFull]);



    useEffect(() => {

        getFactories();
        getProducts();

    }, []);

    useEffect(() => {
        if(id !== undefined){
            getVendorProduct({
                variables: {
                    id
                }
            });
            getVendorProductHistory({
                variables: {
                    id
                }
            });
        }
    }, [id]);


    useEffect(() => {
        const vendor = vendorProductRes?.data?.vendor?.vendorProduct;
        if(vendor !== undefined){
            setState({
                ...exceptKey(vendor, ["pk", "__typename", "id", "vendorFactory"]),
                product: vendor?.product.pk,
                vendorFactory: vendor?.vendorFactory.pk,
                factory: vendor?.vendorFactory.factory.pk
            });
        }
    }, [vendorProductRes?.data?.vendor.vendorProduct]);

    useEffect(() => {
        if(state.factory){
            getVendorFactories({
                variables : {
                    factory: state.factory
                }
            });
        }
    }, [state.factory])

    const { submitData } = useCustomMutation({
            graphQlQuery: {
                queryCreate: CREATE_VENDOR_PRODUCT,
                queryUpdate: UPDATE_VENDOR_PRODUCT
            }
        },
        "База данных",
        () => {
            history.push("/settings/materials");
        }
    );

    const handleSubmit = () => {
        const data = exceptKey(state, ["factory"]);

        console.log("pk", pk);

        pk? submitData(exceptKey(data, ["vendorFactory", "product"]), pk) : submitData(data);
    }

    return (
        <>
            <Helmet title={title} />
            <Form>
                <p>Информация о материале</p>
                <AddibleInput>
                    <CustomSelector disabled={id? true : false} name="factory" value={state.factory} stateChange={e => handleChange({fElem: e})} label="Завод">
                        {
                            factories?.map(({node}) => {
                                    return <MenuItem value={node.pk} selected={node.pk === state.factory}>{node.name}</MenuItem>    
                                }
                            )
                        }
                    </CustomSelector>
                    <CustomSelector disabled={id? true : false} name="vendorFactory" value={state.vendorFactory} stateChange={e => handleChange({fElem: e})} label="Поставщик">
                        {
                            vendorFactories?.map(({node}) => {
                                    return <MenuItem value={node.pk} selected={node.pk === state.vendorFactory}>{node.vendor.name}</MenuItem>
                                }
                            )
                        }
                    </CustomSelector>
                    <CustomSelector disabled={id? true : false} name="product" value={state.product} stateChange={e => handleChange({fElem: e})} label="Продукт">
                        {
                            products?.map(({node}) => 
                                <MenuItem value={node.pk} selected={node.pk === state.product}>{node.name}</MenuItem>
                            )
                        }
                    </CustomSelector>
                    <CustomSelector label="Валюта" name="currency" value={state.currency} stateChange={e => handleChange({fElem: e})}>
                        {
                            currencies.map((currency) => 
                                <MenuItem value={currency.value} selected={currency.value === state.currency}>{currency.label}</MenuItem> 
                            )
                        }
                    </CustomSelector>
                    <CustomNumber label="Цена" name="price" value={state.price} stateChange={e => handleChange({fElem: e})} />
                    <CustomNumber label="Дни доставки" name="deliveryDayCount" value={state.deliveryDayCount} stateChange={e => handleChange({fElem: e})} />
                    <CustomNumber label="Срок изготовления" name="productionDayCount" value={state.productionDayCount} stateChange={e => handleChange({fElem: e})}/>
                    <p>
                        <label htmlFor="isActive">Активность</label> 
                        <Switch
                            id="isActive"
                            checked={state.isActive}
                            name="isActive"
                            onChange={e => handleChange({fElem: e, type: "choice"})}
                        />
                    </p>

                </AddibleInput>
                {
                    id && <>
                        <p>История материала</p>
                        <GreyTable>
                            <Head>
                                <span> Завод: </span>
                                <span> Поставщик: </span>
                                <span> Продукт: </span>
                                <span> Цена: </span>
                                <span> Ед. Изм: </span>
                                <span> Дни изготовления: </span>
                                <span> Дни доставки: </span>
                                <span> Дата изменения: </span>
                                <span> Статус: </span>
                            </Head>
                            <Body>
                                {
                                    vendorProductHistories?.map(history => {
                                        return (
                                            <List>
                                                <span>{history.factory}</span>
                                                <span>{history.vendor}</span>
                                                <span>{history.product.length > 25? history.product.slice(0, 25)+"..." : history.product}</span>
                                                <span>{history.price}</span>
                                                <span>{history.currency}</span>
                                                <span>{history.productionDayCount}</span>
                                                <span>{history.deliveryDayCount}</span>
                                                <span>{history.updatedAt}</span>
                                                <span>{history.isActive? "Активный" : "Неактивный"}</span> 
                                            </List>
                                        )
                                    })
                                }
                            </Body>
                        </GreyTable>
                    </>
                }
            </Form>
            <Footer justify="flex-end">
                {/* <span>Кол-во материалов: 6</span> */}
                <Button name={pk? "Сохранить" : "Создать"} clickHandler={handleSubmit}/>
            </Footer>
        </>
    )
}

export default SuppliersCreate;

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
    grid-template-columns: .7fr 0.7fr 1.5fr .5fr .4fr 0.9fr 0.7fr 0.7fr 0.7fr;
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
    grid-template-columns: .7fr 0.7fr 1.5fr .5fr .4fr 0.9fr 0.7fr 0.7fr 0.7fr;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);

    :last-child {
        border: none;
    }
`;
