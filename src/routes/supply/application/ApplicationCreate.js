import { Helmet } from 'react-helmet';
import styled from "styled-components";

import { useTitle } from '../../../hooks';
import { Button } from '../../../components/Buttons';
import { DragFile } from '../../../components/Inputs/DragFile';
import { RemoveIcon } from '../../../components/RemoveIcon';
import { CustomInput } from '../../../components/Inputs/CustomInput';
import { CustomSelector } from '../../../components/Inputs/CustomSelector';
import { Footer } from '../../../components/Footer';
import { CustomLongInput } from '../../../components/Inputs/CustomLongInput';
import { Form } from '../../../components/Form';
import { FlexWithWrap } from '../../../components/Flex';

const ApplicationCreate = () => {
    const title = useTitle("Создание новой Заявки");

    return (
        <>
            <Helmet title={title} />
            <Form>
                <Title>Данные транспорта</Title>

                <FlexWithWrap>
                    <CustomSelector label="Тип транспорта" />
                    <CustomInput label="Количество транспота" />
                    <CustomSelector label="Вид упаковки" />
                    <CustomInput label="Степнь опасности" />
                    <CustomInput label="Количество упаковки" />
                    <CustomInput label="Количество упаковки" />
                    <CustomSelector label="Условие доставки" />
                    <CustomSelector label="Человек для слежения" />
                </FlexWithWrap>

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
                    </RowWrapper>k
                    <RemoveIcon />
                </Material>

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
