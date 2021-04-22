import styled from "styled-components"

import { InfoContainer } from "../../../components/InfoContainer"

const OrderDetail = () => {

    return (
        <InfoContainer title="Деталь Заказа">
            <Wrapper>
                <div>
                    <b>Завод:</b>
                </div>
                <div>
                    <b>Поставщик:</b>
                </div>
                <div>
                    <b>Контактное лицо:</b> NANJING HARSLE MACHINE TOOL CO.,LTD
                </div>
                <div>
                    <b>Номер телефона:</b>
                </div>
                <div>
                    <b>Proforma Invoice Number:</b>
                </div>
                <div>
                    <b>Пусто:</b>
                </div>
                <div>
                    <b>Proforma Invoice Date:</b>
                </div>
            </Wrapper>
        </InfoContainer>
    )
}

export default OrderDetail;

const Wrapper = styled.div`
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;

    div {
        margin: 10px 50px 10px 0;
    }
`;