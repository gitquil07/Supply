import styled from "styled-components";

import { Form } from "../../../components/Form";
import { Button } from "../../../components/Buttons";
import { CustomInput } from "../../../components/CustomInput";
// import { RequestCard } from "../../../components/RequestCard";
import { CustomSelector } from "../../../components/CustomSelector";

const TrackingTransportCreate = () => {
    return (
        <>
            <Form>
                <TranspostDataTitle>Данные транспорта</TranspostDataTitle>
                <TranspostDataParameters>
                    <CustomSelector 
                        label="Транспортировщики">
                    </CustomSelector>
                    <CustomInput
                        label="Номер транспорта"
                    >
                    </CustomInput>
                    <CustomSelector
                        label="Примечание">
                    </CustomSelector>
                    <CustomInput
                        label="Сумма"
                    >
                    </CustomInput>
                    <CustomSelector
                        label="Валюта"
                    >
                    </CustomSelector>
                    <CustomInput
                        label="Нетто"
                    >
                    </CustomInput>
                    <CustomSelector
                        label="Брутто"
                    >
                    </CustomSelector>
                </TranspostDataParameters>
                <Header>
                    <Title>Заявки</Title>
                    <Button name="Добавить заявку" color="#5762B2" />
                </Header>

                {/* <RequestCard></RequestCard> */}
            </Form>
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