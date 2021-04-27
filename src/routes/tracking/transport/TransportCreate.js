import { useState } from "react";
import { Helmet } from "react-helmet";
import { useToggleDialog } from "../../../hooks";

import styled from "styled-components";

import { useTitle } from "../../../hooks";
import { Form } from "../../../components/Form";
import { Button } from "../../../components/Buttons";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import SmallDialog from "../../../components/SmallDialog";

import { FlexForHeader, FlexWithWrap } from "../../../components/Flex";
import { Table } from "../../../components/Table";
import { Footer } from "../../../components/Footer";
import { Arrows } from "../../../components/Arrows";
import { RemoveIcon } from "../../../components/RemoveIcon";
import { DisabledInput } from "../../../components/DisabledInput";

const TrackingTransportCreate = () => {
    const title = useTitle("Создание нового Слежения");
    const [applications, setApplications] = useState([
        {
            expand: true
        },
        {
            expand: true
        },

    ]);

    const expand = (index) => {
        const oldState = [...applications];

        oldState[index].expand = !oldState[index].expand;

        setApplications([...oldState]);
    };


    console.log(applications)

    const [requestDialogState, closeRequestDialog, openRequestDialog] = useToggleDialog();
    const [materialsDialogState, closeMaterialDialog, openMaterialDialog] = useToggleDialog();


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
                    <Button name="Добавить заявку" color="#5762B2" clickHandler={openRequestDialog} />
                </FlexForHeader>

                {
                    applications.map((e, i) =>
                        <Applications expand={e.expand}>
                            <FlexForHeader p="0 0 30px 0">
                                <Title>Номер заявки: <span>873264923</span></Title>
                                <Expand onClick={() => expand(i)}><Arrows open={e.expand} /> Свернуть</Expand>
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
                    )
                }
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
                            <Button name="Добавить материал" color="#5762B2" clickHandler={openMaterialDialog} />
                        </FlexForHeader>

                        {/* <RequestCard></RequestCard> */}
                        {/* <button onClick={openRequestDialog}>open</button>
                <button onClick={openMaterialDialog}>open</button> */}
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
            <SmallDialog title="Добавить заявку" close={closeRequestDialog} isOpen={requestDialogState}>
                <CustomSelector fullWidth label="Название материала" />
            </SmallDialog>

            <SmallDialog title="Добавить материал" close={closeMaterialDialog} isOpen={materialsDialogState}>
                <CustomSelector fullWidth label="Номер заявки" />
                <CustomInput label="Отгружаемое кол-во" fullWidth />
                <CustomInput label="Брутто вес" fullWidth />
                <CustomInput label="Обем" fullWidth />
            </SmallDialog>
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
    margin-bottom: 20px;
    overflow: hidden;
    max-height: ${({ expand }) => expand ? "1000px" : "72px"};
    transition:  max-height 0.3s ease-in;
`;


const Expand = styled.div`
    color: #5762B2;
    cursor: pointer;
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
    box-sizing: border - box;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 10px;
`;