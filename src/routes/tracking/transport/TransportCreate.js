import { useState } from "react";
import { useToggleDialog } from "../../../hooks";


import styled from "styled-components";

import { Form } from "../../../components/Form";
import { Button } from "../../../components/Buttons";
import { CustomInput } from "../../../components/CustomInput";
import { CustomSelector } from "../../../components/CustomSelector";
import SmallDialog from "../../../components/SmallDialog";


const TrackingTransportCreate = () => {

    const [requestDialogState, closeRequestDialog, openRequestDialog] = useToggleDialog();
    const [materialsDialogState, closeMaterialDialog, openMaterialDialog] = useToggleDialog();

    return (
        <>
            <Form>
                <TranspostDataTitle>Данные транспорта</TranspostDataTitle>
                <TranspostDataParameters>
                    <CustomSelector 
                        label="Транспортировщики"/>
                    <CustomInput
                        label="Номер транспорта"
                    >
                    </CustomInput>
                    <CustomSelector
                        label="Примечание"/>
                    <CustomInput
                        label="Сумма"
                    >
                    </CustomInput>
                    <CustomSelector
                        label="Валюта"
                    />
                    <CustomInput
                        label="Нетто"
                    >
                    </CustomInput>
                    <CustomSelector
                        label="Брутто"
                    />
                </TranspostDataParameters>
                <Header>
                    <Title>Заявки</Title>
                    <Button name="Добавить заявку" color="#5762B2" />
                </Header>

                {/* <RequestCard></RequestCard> */}
                <button onClick={openRequestDialog}>open</button>
                <button onClick={openMaterialDialog}>open</button>
            </Form>

            <SmallDialog close={closeRequestDialog} isOpen={requestDialogState}>
                <CustomSelector
                    fullWidth={true}
                    label="Номер заявки"
                ></CustomSelector>
            </SmallDialog>

            <SmallDialog close={closeMaterialDialog} isOpen={materialsDialogState}>
                <CustomSelector
                    fullWidth={true}
                    label="Номер заявки"
                ></CustomSelector>
            </SmallDialog>
        </>
    );
}

export default TrackingTransportCreate; 


const TranspostDataParameters = styled.div`
    display: flex;
    gap: 10px;
`; 

const TranspostDataTitle = styled.h3`
    margin:0 0 20px 0;
`

const Header = styled.div`
    display:flex;
    justify-content:space-between;
    align-items:center;
    margin:20px 0;
`;

const Title = styled.div`
    font-size:18px;
`