import { Helmet } from 'react-helmet';
import styled from "styled-components";

import { useTitle } from '../../../hooks';
import { Button } from '../../../components/Buttons';
import CustomPicker from '../../../components/DatePicker';
import { DragFile } from '../../../components/DragFile';
import { RemoveIcon } from '../../../components/RemoveIcon';
import { CustomInput } from '../../../components/CustomInput';
import { CustomSelector } from '../../../components/CustomSelector';
import { Footer } from '../../../components/Footer';
import { CustomLongInput } from '../../../components/CustomLongInput';
import { Form } from '../../../components/Form';

const ApplicationCreate = () => {
    const title = useTitle("Создание новой Заявки");

    return (
        <>
            <Helmet title={title} />
            <Form>
                <Title>Данные транспорта</Title>

                <Inputs>
                    <CustomSelector label="Тип транспорта" />
                    <CustomInput label="Количество транспота" />
                    <CustomSelector label="Вид упаковки" />
                    <CustomInput label="Степнь опасности" />
                    <CustomInput label="Количество упаковки" />
                    <CustomInput label="Количество упаковки" />
                    <CustomSelector label="Условие доставки" />
                    <CustomSelector label="Человек для слежения" />
                </Inputs>

                <DragFile />

                <Header>
                    <Title>Материал</Title>
                    <Button name="Добавить материал" color="#5762B2" />
                </Header>

                <Material>
                    <CustomLongInput label="Выберите материал" />

                    <RowWrapper>
                        <Row>
                            <CustomSelector label="Номер инвойса" />
                            <CustomInput label="Отгружаемое кол-во" />
                            <CustomSelector label="Номер инвойса" />
                            <CustomSelector label="Получатель" />
                        </Row>

                        <Row>
                            <CustomSelector label="Номер инвойса" />
                            <CustomInput label="Отгружаемое кол-во" />
                            <CustomSelector label="Номер инвойса" />
                            <CustomSelector label="Получатель" />
                        </Row>
                    </RowWrapper>

                    <RemoveIcon />
                </Material>

            </Form>

            <Footer>
                <span>Кол-во материалов: 6</span>
                <Button name="Создать Заявки" />
            </Footer>
        </>
    )
}

export default ApplicationCreate;

const Title = styled.div`
    font-size: 18px;
`;

const Inputs = styled.div`
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 15px 0;
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
