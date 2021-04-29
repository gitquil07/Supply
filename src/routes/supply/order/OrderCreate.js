import { useState, useEffect } from "react";
import { useMutation, useQuery, useLazyQuery } from "@apollo/client";
import moment from "moment";
import { Helmet } from 'react-helmet';
import styled from "styled-components";

import { uploadFile } from "../../../api";
import { useTitle } from '../../../hooks';
import { getObjectivesList } from "../../../utils/functions";
import { testMeasureOptions } from "../../../utils/static";
import MenuItem from '@material-ui/core/MenuItem';

import { Button } from '../../../components/Buttons';
import CustomPicker from '../../../components/Inputs/DatePicker';
import { DragFile } from '../../../components/Inputs/DragFile';
import { RemoveIcon } from '../../../components/RemoveIcon';
import { CustomInput } from '../../../components/Inputs/CustomInput';
import { CustomSelector } from '../../../components/Inputs/CustomSelector';
import { AddibleInput, AddibleInputWithTrash } from "../../../components/Flex";
import { Footer } from '../../../components/Footer';
import { ORDER_CREATE } from "./gql";
import { GET_FACTORIES_LIST, GET_VENDOR_FACTORIES, GET_VENDOR_FACTORY_PRODUCTS } from "./gql";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";
import { Form } from "../../../components/Form";

const OrderCreate = () => {
    const title = useTitle("Создать Заказ");
    const [createOrder] = useMutation(ORDER_CREATE, {
        onError: (error) => console.log(error)
    }),
    factoriesQuerySet = useQuery(GET_FACTORIES_LIST),
    [getVendorFactories, vendorFactoriesResp] = useLazyQuery(GET_VENDOR_FACTORIES),
    [getVendorFactoryProducts, vendorFactoryProductsResp] = useLazyQuery(GET_VENDOR_FACTORY_PRODUCTS);


    const [factory, setFactory] = useState("");
    const factories = factoriesQuerySet?.data?.factory?.factories?.edges || [],
          vendorFactories = vendorFactoriesResp?.data?.vendor.vendorFactories?.edges || [],
          products = vendorFactoryProductsResp?.data?.vendor.vendorProducts?.edges || [];


    const [files, setFiles] = useState([]);
    const [materials, setMaterials] = useState([
        {
            vendorProduct: "",
            dateOfDelivery: Date.now(),
            productionDayCount: "",
            count: "",
            currency : "", 
            price: ""
        }
    ]);

    const [orderData, setOrderData] = useState({
        vendorFactory: "",
        status: "",
        invoiceDate: Date.now(),
        invoiceProforma: ""
    });

    useEffect(() => {

        getVendorFactories({
            variables: {
                factory
            }
        });

    }, [factory]);

    const { vendorFactory } = orderData;
    useEffect(() => {
        console.log("vendorFactory", vendorFactory);
        getVendorFactoryProducts({
            variables: {
                vendorFactory        
            }
        });

    }, [vendorFactory]);

    const handleDataChange = (event, dataType, index) => {
        if(dataType === "order"){
            setOrderData({...orderData, [event.target.name] : event.target.value});
        }

        if(dataType === "material"){
            const materialsCopy = materials.slice(0);
            materialsCopy[index] = {...materialsCopy[index], [event.target.name] : event.target.value}
            setMaterials(materialsCopy);
        }
    }

    const handleDateChange = (dateFieldName, date, index) => {
        const materialsCopy = materials.slice(0);
        materialsCopy[index] = {...materialsCopy[index], [dateFieldName] : date};
        setMaterials(materialsCopy);
    }

    const sendOrder = () => {
        const orderRequestBody = {...orderData};
        let orderMaterials = materials.slice(0);

        const formedOrderMaterials = orderMaterials.map(orderMaterial => {
            return {
                        vendorProduct: orderMaterial.vendorProduct,
                        dateOfDelivery: orderMaterial.dateOfDelivery,
                        productionDayCount: orderMaterial.productionDayCount,
                        dateOfDelivery: moment(orderMaterial.dateOfDelivery).format("YYYY-MM-DD"),
                        currency: orderMaterial.currency,
                        count: orderMaterial.count,
                        price: orderMaterial.price
                    }
        });

        orderRequestBody.invoiceDate = moment(orderRequestBody.invoiceDate).format("YYYY-MM-DD");

        orderRequestBody.orderItems = formedOrderMaterials;

        createOrder({
            variables: {
                input: {
                    data: orderRequestBody
                }
            }
        });
       

        uploadFile('/api-file/documents/', files)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));
    }


    const addMaterial = () => {
        const temp = materials.slice(0);
        temp.push({vendorProduct: "", dateOfDelivery: Date.now(), productionDayCount: "", count: "", currency: "",  price: ""});
        setMaterials(temp);
    };

    const removeMaterial = (index) => {
        setMaterials(materials.filter((e, idx) => idx !== index));
    }

    if(factoriesQuerySet.error) return "error";

    return (
        <>
            <Helmet title={title} />
            <Wrapper>
                <Form>
                    <Title>Данные заказа</Title>

                    <AddibleInput>
                        <CustomSelector label="Выберите завод" name="factory" value={factory} stateChange={(e) => setFactory(e.target.value)}>
                            {
                                factories?.map(({node}) => {
                                    return <MenuItem value={node?.pk}>{node?.name}</MenuItem>
                                })
                            }
                        </CustomSelector>
                        <CustomSelector label="Выберите поставщика" options={vendorFactories} name="vendorFactory" value={orderData.vendorFactory} stateChange={(e) => handleDataChange(e, "order")}>
                            {
                                vendorFactories?.map(({node}) => {
                                    return <MenuItem value={node?.vendor?.pk}>{node?.vendor?.name}</MenuItem>
                                })
                            }
                        </CustomSelector>
                        {/* <CustomSelector label="Выберите поставщика" options={vendors} optName="vendor" keyName="name" name="status" value={orderData.status} stateChange={(e) => handleDataChange(e, "order")} /> */}
                        <CustomPicker label="Дата создание" name="invoiceDate" date={orderData.invoiceDate} stateChange={(date) => setOrderData({...orderData, invoiceDate: date})} />
                        <CustomInput label="Инвойс заказа" name="invoiceProforma" value={orderData.invoiceProforma} stateChange={(e) => handleDataChange(e, "order")} />
                    </AddibleInput>

                    <DragFile receivedFile={(file) => setFiles([...files, file])} files={files} removeClicked={(index) => setFiles(files.filter((e, i) => i !== index))} />

                    <Header>
                        <Title>Материал</Title>
                        <Button name="Добавить материал" color="#5762B2" clickHandler={addMaterial} />
                    </Header>

                    {
                        materials.map((e, index) => {
                            return <AddibleInputWithTrash>
                                <InputsWrapper>
                                    <CustomSelector name="vendorProduct" label="Выберите материал" value={e.vendorProduct} stateChange={(e) => handleDataChange(e, "material", index)}>
                                        {
                                            products?.map(({node}) => {
                                                return <MenuItem value={node.pk}>{node.maktx}</MenuItem>
                                            })
                                        }
                                    </CustomSelector>
                                    <CustomNumber  name="productionDayCount" label="Срок изготовление" value={e.productionDayCount}  stateChange={(e) => handleDataChange(e, "material", index)} />
                                    <CustomPicker name="dateOfDelivery" label="Дата отгрузки" date={e.dateOfDelivery}  stateChange={(date) => handleDateChange("dateOfDelivery", date, index)} />
                                    <CustomInput name="count" label="Кол-во" value={e.count}  stateChange={(e) => handleDataChange(e, "material", index)} />
                                    <CustomSelector name="currency" label="Ед. Изм." value={e.currency} stateChange={(e) => handleDataChange(e, "material", index)}>
                                        {
                                            testMeasureOptions?.map(({node}) => {
                                                return <MenuItem value={node?.pk}>{node?.pk}</MenuItem>
                                            })
                                        }
                                    </CustomSelector>
                                    <CustomInput name="price" label="Цена" value={e.price}  stateChange={(e) => handleDataChange(e, "material", index)} />
                                </InputsWrapper>
                                <RemoveIcon clicked={() => removeMaterial(index)} />
                            </AddibleInputWithTrash>
                        })
                    }

                </Form>

                <Footer>
                    <span>Кол-во материалов: 6</span>
                    <Button name="Создать Заказ" clickHandler={sendOrder}/>
                </Footer>
            </Wrapper>
        </>
    )
}

export default OrderCreate;

const Wrapper = styled.div`
    width: 100%;
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

const InputsWrapper = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
    grid-gap: 10px;
`;