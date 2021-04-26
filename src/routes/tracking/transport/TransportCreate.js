import styled from "styled-components";

import { Form } from "../../../components/Form";
import { Button } from "../../../components/Buttons";
import { CustomInput } from "../../../components/CustomInput";
import { CustomSelector } from "../../../components/CustomSelector";
import { FlexForHeader, FlexWithWrap } from "../../../components/Flex";
import { Table } from "../../../components/Table";
import { RemoveIcon } from "../../../components/RemoveIcon";
import { Footer } from "../../../components/Footer";
import { DisabledInput } from "../../../components/DisabledInput";
import { Helmet } from "react-helmet";
import { useTitle } from "../../../hooks";

const TrackingTransportCreate = () => {
    const title = useTitle("Создание нового Слежения");

    return (
        <>
            <Helmet title={title} />
            <Form>
                <Title>Данные транспорта</Title>

                <FlexWithWrap>
                    <CustomSelector label="Транспортировщики" />
                    <CustomInput label="Номер транспорта" short />
                    <CustomSelector label="Примечание" />
                    <CustomInput label="Сумма" short />
                    <CustomSelector label="Валюта" short />
                    <CustomInput label="Нетто" short />
                    <CustomSelector label="Брутто" short />
                </FlexWithWrap>

                <FlexForHeader m="20px 0">
                    <Title>Заявки</Title>
                    <Button name="Добавить заявку" color="#5762B2" />
                </FlexForHeader>

                <Applications>
                    <FlexForHeader p="0 0 30px 0">
                        <Title>Номер заявки: <span>873264923</span></Title>
                        <Expand>Свернуть</Expand>
                    </FlexForHeader>

                    <Tables>
                        <Table />
                        <Table />
                    </Tables>

                    <Material>
                        <FlexForHeader m="20px 0">
                            <Title>Материалы</Title>
                            <Button name="Добавить материал" color="#5762B2" />
                        </FlexForHeader>

                        <InputRow>
                            <DisabledInput name="Название материала" value="01290949889612389" />
                            <DisabledInput name="OOO “trade solution”" value="100 000 000" />
                            <DisabledInput name="Брутто вес" value="320 000 кг" />
                            <DisabledInput name="Обем" value="21 м3" />
                            <CustomInput label="Отгружаемое кол-во" />

                            <RemoveIcon />
                        </InputRow>
                    </Material>

                    <Footer>
                        <span>Кол-во материалов: 6</span>
                        <Button name="Создать Слежение" />
                    </Footer>
                </Applications>
            </Form>
        </>
    );
}

export default TrackingTransportCreate;

const Title = styled.div`
    font-size:18px;

    span {
        color: rgba(0, 0, 0, 0.5);
    }
`;

const Applications = styled.div`
    background: #F6F6FC;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 20px;
`;

const Expand = styled.div`
    color: #5762B2;
`;

const Tables = styled.div`
    display: flex;
    gap: 10px;
`;

const Material = styled.div``;

const InputRow = styled.div`
    width: 100%;
    display: flex;
    gap: 10px;
    align-items: center;
    /* height: 56px; */
    background: white;
    padding: 10px;
    box-sizing: border-box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
`;