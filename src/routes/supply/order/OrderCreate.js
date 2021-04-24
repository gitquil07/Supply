import { Helmet } from 'react-helmet';
import styled from "styled-components";

import { useTitle } from '../../../hooks';
import { Button } from '../../../components/Buttons';
import CustomPicker from '../../../components/DatePicker';
import { DragFile } from '../../../components/DragFile';
import { RemoveIcon } from '../../../components/RemoveIcon';
import { CustomInput } from '../../../components/CustomInput';
import { CustomSelector } from '../../../components/CustomSelector';


const OrderCreate = () => {
    const title = useTitle("Создать Заказ");

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
                        <Button name="Добавить материал" color="#5762B2" />
                    </Header>

                    <AddibleInput>
                        <CustomSelector label="Выберите материал" />
                        <CustomPicker label="Срок изготовление" />
                        <CustomPicker label="Дата отгрузки" />
                        <CustomInput label="Кол-во" />
                        <CustomSelector label="Ед. Изм." />
                        <CustomInput label="Кол-во" />
                        <RemoveIcon />
                    </AddibleInput>

                    <AddibleInput>
                        <CustomSelector label="Выберите материал" />
                        <CustomPicker label="Срок изготовление" />
                        <CustomPicker label="Дата отгрузки" />
                        <CustomInput label="Кол-во" />
                        <CustomSelector label="Ед. Изм." />
                        <CustomInput label="Кол-во" />
                        <RemoveIcon />
                    </AddibleInput>

                    <AddibleInput>
                        <CustomSelector label="Выберите материал" />
                        <CustomPicker label="Срок изготовление" />
                        <CustomPicker label="Дата отгрузки" />
                        <CustomInput label="Кол-во" />
                        <CustomSelector label="Ед. Изм." />
                        <CustomInput label="Кол-во" />
                        <RemoveIcon />
                    </AddibleInput>
                </Form>
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

const AddibleInput = styled.div`
    display: flex;
    gap: 10px;
    margin: 20px 0;
    background: #F6F6FC;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 10px;
    padding: 10px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;