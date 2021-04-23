
import { useEffect } from 'react';
import { Helmet } from 'react-helmet';
import styled from "styled-components";
import { useDispatch } from 'react-redux';
import { CustomSelector } from '../../../components/CustomSelector';
import { DragImage } from '../../../components/DragImage';
import { CustomInput } from '../../../components/CustomInput';
import { DatePicker } from '@material-ui/pickers';
import CustomPicker from '../../../components/DatePicker';


const OrderCreate = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({ type: "CHANGE_TITLE", payload: "Создать Заказ" })
    }, [dispatch])

    return (
        <>
            <Helmet>
                <title>Создать Заказ</title>
            </Helmet>
            <Wrapper>
                <Form>
                    <Title>Данные заказа</Title>

                    <Inputs>
                        <CustomSelector />
                        <CustomSelector />
                        <CustomSelector />
                        <CustomSelector />
                    </Inputs>

                    <DragImage />

                    <AddibleInput>
                        <CustomInput label="Выберите материал" placeholder="Название материала" />
                        <CustomPicker />
                        <CustomPicker />
                        <CustomInput />
                        <CustomInput />
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
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 10px;
    margin: 15px 0;
`;

const AddibleInput = styled.div`
    display: grid;  
    grid-template-columns: 1fr auto auto 1fr 1fr;
    gap: 10px;
    margin: 20px 0;
`;