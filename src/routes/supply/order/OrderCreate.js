import { useState } from "react";
import { Helmet } from 'react-helmet';
import styled from "styled-components";

import { useTitle } from '../../../hooks';
import { Button } from '../../../components/Buttons';
import CustomPicker from '../../../components/Inputs/DatePicker';
import { DragFile } from '../../../components/Inputs/DragFile';
import { RemoveIcon } from '../../../components/RemoveIcon';
import { CustomInput } from '../../../components/Inputs/CustomInput';
import { CustomSelector } from '../../../components/Inputs/CustomSelector';
import { AddibleInput } from "../../../components/Flex";
import { Footer } from '../../../components/Footer';
import { fromPromise } from '@apollo/client';

const OrderCreate = () => {
    const title = useTitle("Создать Заказ");

    const [materials, setMaterials] = useState([
        {
            id: 1,
            name: "",
            productDuration: "",
            shipmentTime: "",
            quantity: "",
            price: ""

        }
    ]);


    const addMaterial = () => {
        setMaterials([...materials, { id: materials.length + 1, name: "", productDuration: "", shipmentTime: "", quantity: "", price: "" }]);
    };

    const removeMaterial = (id) => {
        setMaterials([...materials.filter(e => e.id !== id)])
    }
 

    return (
        <>
            <Helmet title={title} />
            <Wrapper>
                <Form>
                    <Title>Данные заказа</Title>

                    <Inputs>
                        <CustomSelector label="Выберите завод" />
                        <CustomSelector label="Выберите поставщика" />
                        <CustomPicker label="Дата  создание" />
                        <CustomInput label="Инвойс заказа" />
                    </Inputs>

                    <DragFile />

                    <Header>
                        <Title>Материал</Title>
                        <Button name="Добавить материал" color="#5762B2" clickHandler={addMaterial} />
                    </Header>

                    {
                        materials.map((e) =>
                            <AddibleInput>
                                <CustomSelector label="Выберите материал" />
                                <CustomPicker label="Срок изготовление" />
                                <CustomPicker label="Дата отгрузки" />
                                <CustomInput label="Кол-во" />
                                <CustomSelector label="Ед. Изм." />
                                <CustomInput label="Цена" />

                                <RemoveIcon clicked={() => removeMaterial(e.id)} />
                            </AddibleInput>
                        )
                    }

                </Form>

                <Footer>
                    <span>Кол-во материалов: 6</span>
                    <Button name="Создать Заказ" />
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