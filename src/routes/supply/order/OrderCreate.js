import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client";
import moment from "moment";
import { Helmet } from 'react-helmet';
import styled from "styled-components";

import { uploadFile } from "../../../api";
import { useTitle } from '../../../hooks';
import { getObjectivesList } from "../../../utils/functions";
import { testMeasureOptions } from "../../../utils/static";

import { Button } from '../../../components/Buttons';
import CustomPicker from '../../../components/Inputs/DatePicker';
import { DragFile } from '../../../components/Inputs/DragFile';
import { RemoveIcon } from '../../../components/RemoveIcon';
import { CustomInput } from '../../../components/Inputs/CustomInput';
import { CustomSelector } from '../../../components/Inputs/CustomSelector';
import { AddibleInput } from "../../../components/Flex";
import { Footer } from '../../../components/Footer';
import { ORDER_CREATE } from "./gql";
import { GET_SELECT_OPTIONS } from "./gql";
import { fromPromise } from '@apollo/client';
import { CustomNumber } from "../../../components/Inputs/CustomNumber";

const OrderCreate = () => {
    const title = useTitle("Создать Заказ");
    const [createOrder] = useMutation(ORDER_CREATE),
          { data, error } = useQuery(GET_SELECT_OPTIONS),
          { factories, products, vendors } = getObjectivesList(data, "factory", "vendor", "product");

    const [files, setFiles] = useState([]);
    const [materials, setMaterials] = useState([
        {
            id: 1,
            vendorProduct: "",
            dateOfDelivery: "",
            productionDayCount: "",
            count: "",
            currency : "", 
            price: ""

        }
    ]);

    const [orderData, setOrderData] = useState({
        vendorFactory: "",
        status: "",
        invoiceDate: "",
        invoiceProforma: ""
    });

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

        uploadFile('/api-file/documents/', files)
            .then(resp => console.log(resp))
            .catch(err => console.log(err));

        createOrder({
            variables: {
               input: {
                    data: orderRequestBody
               }
            }
        });
    }


    const addMaterial = () => {
        setMaterials([...materials, { id: materials.length + 1, vendorProduct: "", dateOfDelivery: "", productionDayCount: "", count: "", currency: "",  price: ""}]);
    };

    const removeMaterial = (id) => {
        setMaterials([...materials.filter(e => e.id !== id)])
    }

    if(error) return "error";

    console.log(files)

    return (
        <>
            <Helmet title={title} />
            <Wrapper>
                <Form>
                    <Title>Данные заказа</Title>

                    <Inputs>
                        <CustomSelector label="Выберите завод" options={factories} keyName="name" name="vendorFactory" value={orderData.vendorFactory} stateChange={(e) => handleDataChange(e, "order")} />
                        <CustomSelector label="Выберите поставщика" options={vendors} keyName="name" name="status" value={orderData.status} stateChange={(e) => handleDataChange(e, "order")} />
                        <CustomPicker label="Дата  создание" name="invoiceData" date={orderData.invoiceData} stateChange={(date) => setOrderData({...orderData, invoiceDate: date})} />
                        <CustomInput label="Инвойс заказа" name="invoiceProforma" value={orderData.invoiceProforma} stateChange={(e) => handleDataChange(e, "order")} />
                    </Inputs>

                    <DragFile receivedFile={(file) => setFiles([...files, file])} files={files} removeClicked={(index) => setFiles(files.filter((e, i) => i !== index))} />

                    <Header>
                        <Title>Материал</Title>
                        <Button name="Добавить материал" color="#5762B2" clickHandler={addMaterial} />
                    </Header>

                    {
                        materials.map((e, index) =>
                            <AddibleInput>
                                <CustomSelector name="vendorProduct" options={products} keyName="maktx" label="Выберите материал" value={e.vendorProduct}  stateChange={(e) => handleDataChange(e, "material", index)} />
                                <CustomNumber  name="productionDayCount" label="Срок изготовление" value={e.productionDayCount}  stateChange={(e) => handleDataChange(e, "material", index)} />
                                <CustomPicker name="dateOfDelivery" label="Дата отгрузки" value={e.dateOfDelivery}  stateChange={(date) => handleDateChange("dateOfDelivery", date, index)} />
                                <CustomInput name="count" label="Кол-во" value={e.count}  stateChange={(e) => handleDataChange(e, "material", index)} />
                                <CustomSelector name="currency" options={testMeasureOptions} keyName="pk" label="Ед. Изм." value={e.currency}  stateChange={(e) => handleDataChange(e, "material", index)} />
                                <CustomInput name="price" label="Цена" value={e.price}  stateChange={(e) => handleDataChange(e, "material", index)} />

                                <RemoveIcon clicked={() => removeMaterial(e.id)} />
                            </AddibleInput>
                        )
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

const Form = styled.div`
    background: #FFFFFF;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
    padding: 20px;
`;

const Title = styled.div`
    font-size: 18px;
`;

const Inputs = styled.div`
    display: flex;
    gap: 10px;
    margin: 15px 0;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;