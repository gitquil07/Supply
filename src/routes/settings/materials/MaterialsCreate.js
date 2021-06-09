import { useEffect, useMemo } from "react";
import { Helmet } from "react-helmet";
import { AddibleInput } from "components/Flex";
import { Form } from "components/Form";
import { CustomSelector } from "components/Inputs/CustomSelector";
import { CustomInput } from "components/Inputs/CustomInput"
import { useTitle } from "hooks";
import styled from "styled-components"
import { Footer } from "components/Footer";
import { Button } from "components/Buttons";

import MenuItem from "@material-ui/core/MenuItem";
import { useLazyQuery } from "@apollo/client";
import { useHistory } from "react-router-dom";
import { currencyOptions } from "utils/static";
import Switch from "@material-ui/core/Switch";
import { CustomNumber } from "components/Inputs/CustomNumber";
import { formatInputPrice } from "utils/functions";

import { GET_FACTORIES, GET_VENDOR_FACTORIES, GET_PRODUCTS, CREATE_VENDOR_PRODUCT, UPDATE_VENDOR_PRODUCT, GET_VENDOR_PRODUCT, GET_VENDOR_PRODUCT_HISTORY } from "./gql";
import { exceptKey, getValueOfProperty } from "utils/functions";
import { useCustomMutation, useFormData } from "hooks";
import { getList } from "utils/functions";
import moment from "moment";
import { ValidationMessage } from "components/ValidationMessage";
import { object, number, string, boolean } from "yup";
import { formatPrice } from "utils/functions"



const currencyEnum = currencyOptions.map(currency => currency.value);

const MaterialsSchema = object().shape({
    vendorFactory: number().typeError("Значение для поля 'Поставщик' не выбрано"),
    product: number().typeError("Значение для поля 'Продукт' не выбрано"),
    price: number()
            .positive("Цена не можеть быть отрицательной")
            .typeError("Поле 'Продукт' должно иметь число в качестве значения"),
    deliveryDayCount: number()
            .positive("Введите положительно число")
            .integer("Введите целое число")
            .typeError("Поле 'Дни доставкм' должно иметь число в качестве значения"),
    productionDayCount: number()
            .positive("Введите положительно число")
            .integer("Введите целое число")
            .typeError("Поле 'Срок изготовлеия' должно иметь число в качестве значения"),
    isActive: boolean(),
    currency: string()
        .oneOf(currencyEnum, "Недопустимое значение поля 'Валюта'"),
    moq: number()
            .positive("Введите положительное число")
            .integer("Введите целое число")
            .required("Поле 'moq' должно быть заполнено")
});

const fieldsMessages = {
    "factory": "",
    "vendorFactory": "",
    "product": "",
    "price": "",
    "deliveryDayCount": "",
    "productionDayCount": "",
    "isActive": "",
    "currency": "",
    "moq": ""
}

const initialState = {
    "factory": "",
    "vendorFactory": "",
    "product": "",
    "price": "",
    "deliveryDayCount": "",
    "productionDayCount": "",
    "isActive": true,
    "currency": "",
    "moq": ""
}

const SuppliersCreate = ({ match }) => {
    const { id } = match.params,
        title = useTitle("Создание новой базы данных"),
        history = useHistory();

    const {
        state,
        setState,
        handleChange,
        handlePriceChange
    } = useFormData(initialState);

    const [getFactories, factoriesRes] = useLazyQuery(GET_FACTORIES),
        [getVendorFactories, vendorFactoriesRes] = useLazyQuery(GET_VENDOR_FACTORIES),
        [getProducts, productsRes] = useLazyQuery(GET_PRODUCTS),
        [getVendorProduct, vendorProductRes] = useLazyQuery(GET_VENDOR_PRODUCT, {
            fetchPolicy: "no-cache"
        }),
        [getVendorProductHistory, vendorProductHistoryRes] = useLazyQuery(GET_VENDOR_PRODUCT_HISTORY, {
            fetchPolicy: "no-cache"
        });


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
        pk = useMemo(() => getValueOfProperty(vendorProductRes?.data, "pk"), [vendorProductRes?.data]) || undefined,
        vendorProductHistoriesFull = useMemo(() => getList(vendorProductHistoryRes?.data), [vendorProductHistoryRes?.data]) || [],
        vendorProductHistories = useMemo(() => vendorProductHistoriesFull.map(({ node }) => {
            return {
                ...exceptKey(node, ["vendorFactory", "__typename"]),
                factory: node?.vendorFactory?.factory?.name,
                vendor: node?.vendorFactory?.vendor?.companyName,
                product: node?.product?.name
            }
        }), [vendorProductHistoriesFull]);



    useEffect(() => {

        getFactories();
        getProducts();

    }, []);

    useEffect(() => {
        if (id !== undefined) {
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
        if (vendor !== undefined) {
            setState({
                ...exceptKey(vendor, ["pk", "__typename", "id", "vendorFactory"]),
                product: vendor?.product.pk,
                vendorFactory: vendor?.vendorFactory?.vendor?.companyName,
                factory: vendor?.vendorFactory?.factory?.name
            });
        }
    }, [vendorProductRes?.data?.vendor.vendorProduct]);

    useEffect(() => {
        if (state.factory) {
            getVendorFactories({
                variables: {
                    factory: state.factory
                }
            });
        }
    }, [state.factory])

    const { submitData, handleSubmit, validationMessages, mutationLoading } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_VENDOR_PRODUCT,
            queryUpdate: UPDATE_VENDOR_PRODUCT
        }
    },
        "База данных",
        () => {
            history.push("/settings/materials");
        },
        MaterialsSchema,
        fieldsMessages
    );

    const beforeSubmit = () => {
        const data = exceptKey(state, ["factory"]);

        console.log("pk", pk);


        pk ? handleSubmit(exceptKey(data, ["vendorFactory", "product"]), pk) : handleSubmit(data);
        // pk? submitData(exceptKey(data, ["vendorFactory", "product"]), pk) : submitData(data);
    }

    // const factory = factories.find(({node}) => node.pk == state.factor)?.name,
    //       vendor = vendorFactories.find(({node}) => node.pk == state.vendorFactory)?.name,
    //       product = products.find(({node}) => node.pk == state.product)?.name;


    return (
        <>
            <Helmet title={title} />
            <Form>
                <p>Информация о материале</p>
                <AddibleInput>
                    {
                        pk ? <CustomInput label="Завод" value={state.factory} disabled /> :
                            <CustomSelector name="factory" value={state.factory} stateChange={e => handleChange({ fElem: e })} label="Завод">
                                {
                                    factories?.map(({ node }) => {
                                        return <MenuItem value={node.pk} selected={node.pk === state.factory}>{node.name}</MenuItem>
                                    }
                                    )
                                }
                            </CustomSelector>
                    }
                    <div>
                        {
                            pk ? <CustomInput label="Поставщик" value={state.vendorFactory} disabled /> : <>
                                <CustomSelector name="vendorFactory" value={state.vendorFactory} stateChange={e => handleChange({ fElem: e })} label="Поставщик" errorVal={validationMessages.vendorFactory.length > 0 ? true : false}>
                                    {
                                        vendorFactories?.map(({ node }) => {
                                            return <MenuItem value={node.pk} selected={node.pk === state.vendorFactory}>{node.vendor.name}</MenuItem>
                                        }
                                        )
                                    }
                                </CustomSelector>
                                {
                                    validationMessages.vendorFactory.length > 0 ? <ValidationMessage>{validationMessages.vendorFactory}</ValidationMessage> : null
                                }
                            </>
                        }
                    </div>
                    <div>
                        {
                            pk ? <CustomInput label="Продукт" name="product" value={products.find(({ node }) => node.pk == state.product)?.node?.name} disabled /> : <>
                                <CustomSelector disabled={id ? true : false} name="product" value={state.product} stateChange={e => handleChange({ fElem: e })} label="Продукт" errorVal={validationMessages.product.length > 0 ? true : false}>
                                    {
                                        products?.map(({ node }) =>
                                            <MenuItem value={node.pk} selected={node.pk === state.product}>{node.name}</MenuItem>
                                        )
                                    }
                                </CustomSelector>
                                {
                                    validationMessages.product.length > 0 ? <ValidationMessage>{validationMessages.product}</ValidationMessage> : null
                                }
                            </>
                        }
                    </div>
                    <div>
                        <CustomSelector label="Валюта" name="currency" value={state.currency} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.currency.length > 0 ? true : false}>
                            {
                                currencyOptions.map((currency) =>
                                    <MenuItem value={currency.value} selected={currency.value === state.currency}>{currency.label}</MenuItem>
                                )
                            }
                        </CustomSelector>
                        {
                            validationMessages.currency.length > 0 ? <ValidationMessage>{validationMessages.currency}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomInput label="Цена" name="price" value={state.price} stateChange={e => handlePriceChange(e)} errorVal={validationMessages.price.length > 0 ? true : false} />
                        {
                            validationMessages.price.length > 0 ? <ValidationMessage>{validationMessages.price}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomNumber label="Дни доставки" name="deliveryDayCount" value={state.deliveryDayCount} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.deliveryDayCount.length > 0 ? true : false} />
                        {
                            validationMessages.deliveryDayCount.length > 0 ? <ValidationMessage>{validationMessages.deliveryDayCount}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomNumber label="Срок изготовления" name="productionDayCount" value={state.productionDayCount} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.productionDayCount.length > 0 ? true : false} />
                        {
                            validationMessages.productionDayCount.length > 0 ? <ValidationMessage>{validationMessages.productionDayCount}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomNumber label="MOQ" name="moq" value={state.moq} stateChange={e => handleChange({fElem: e})} errorVal={validationMessages.moq.length > 0? true : false} />
                        {
                            validationMessages.moq.length? <ValidationMessage>{validationMessages.moq}</ValidationMessage> : null
                        }
                    </div>


                </AddibleInput>
                <p>
                    <label htmlFor="isActive">Активность</label>
                    <Switch
                        id="isActive"
                        checked={state.isActive}
                        name="isActive"
                        onChange={e => handleChange({ fElem: e, type: "choice" })}
                    />
                    {
                        validationMessages.isActive.length > 0 ? <ValidationMessage>{validationMessages.isActive}</ValidationMessage> : null
                    }
                </p>
                {
                    id && <>
                        <p>История материала</p>
                        <GreyTable>
                            <Head>
                                <span> Завод: </span>
                                <span> Поставщик: </span>
                                <span> Продукт: </span>
                                <span> Цена: </span>
                                <span> Валюта: </span>
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
                                                <span>{history?.factory}</span>
                                                <span>{history?.vendor}</span>
                                                <span>{history?.product.length > 25 ? history?.product.slice(0, 25) + "..." : history?.product}</span>
                                                <span>{formatPrice(history?.price)}</span>
                                                <span>{history?.currency}</span>
                                                <span>{history?.productionDayCount}</span>
                                                <span>{history?.deliveryDayCount}</span>
                                                <span>{moment(history?.updatedAt).format("YYYY-MM-DD")}</span>
                                                <span>{history?.isActive ? "Активный" : "Неактивный"}</span>
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
                <Button name={pk ? "Сохранить" : "Создать"} clickHandler={beforeSubmit} loading={mutationLoading} />
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
