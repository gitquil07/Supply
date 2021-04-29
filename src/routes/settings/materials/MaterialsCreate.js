import { Helmet } from "react-helmet";
import { AddibleInput } from "../../../components/Flex";
import { Form } from "../../../components/Form";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { useTitle } from "../../../hooks";
import styled from "styled-components"
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Buttons";

const SuppliersCreate = ({ isOpen, close }) => {
    const title = useTitle("Создание нового Поставщика");

    return (
        <>
            <Helmet title={title} />
            <Form>
                <p>Информация о материале</p>
                <AddibleInput>
                    <CustomSelector label="Завод" />
                    <CustomSelector label="Поставщик" />
                    <CustomSelector label="Продукт" />
                    <CustomInput label="Цена" />
                    <CustomSelector label="Валюта" />
                    <CustomSelector label="Ед. Изм." />
                    <CustomSelector label="Кол-во дней изготовления" />
                    <CustomSelector label="Кол-во дней доставки" />
                    <CustomSelector label="Статус" />
                </AddibleInput>

                <p>История материала</p>

                <GreyTable>
                    <Head>
                        <span> Завод: </span>
                        <span> Поставщик: </span>
                        <span> Продукт: </span>
                        <span> Цена: </span>
                        <span> Ед. Изм: </span>
                        <span> Дни изготовления: </span>
                        <span> Дни доставки: </span>
                        <span> Дата изменения: </span>
                        <span> Статус: </span>
                    </Head>
                    <Body>
                        <List>
                            <span> Телевизор </span>
                            <span> Мумтоз </span>
                            <span> STP329-0-32CHR СРЕДНЯЯ ПА ... </span>
                            <span> 5.00 </span>
                            <span> кг </span>
                            <span> 12 </span>
                            <span> 20 </span>
                            <span> 01.04.2021 </span>
                            <span> Активный </span>
                        </List>

                        <List>
                            <span> Телевизор </span>
                            <span> Мумтоз </span>
                            <span> STP329-0-32CHR СРЕДНЯЯ ПА ... </span>
                            <span> 5.00 </span>
                            <span> кг </span>
                            <span> 12 </span>
                            <span> 20 </span>
                            <span> 01.04.2021 </span>
                            <span> Активный </span>
                        </List>

                        <List>
                            <span> Телевизор </span>
                            <span> Мумтоз </span>
                            <span> STP329-0-32CHR СРЕДНЯЯ ПА ... </span>
                            <span> 5.00 </span>
                            <span> кг </span>
                            <span> 12 </span>
                            <span> 20 </span>
                            <span> 01.04.2021 </span>
                            <span> Активный </span>
                        </List>
                    </Body>
                </GreyTable>
            </Form>
            <Footer>
                <span>Кол-во материалов: 6</span>
                <Button name="Создать Сохранить" />
            </Footer>
        </>
    )
}

export default SuppliersCreate;

const GreyTable = styled.div`
    width: 100%;
    background-color: #F6F6FC;
    border-radius: 10px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    box-sizing: border-box;
    font-size: 18px;
    margin-top: 20px;
    padding: 10px; 
`;

const Head = styled.div`
    display: grid;
    grid-template-columns: .7fr 0.7fr 1.5fr .5fr .4fr 0.9fr 0.7fr 0.7fr 0.7fr;
    padding: 0 10px 10px 10px;
    gap: 10px;
`;

const Body = styled.div` 
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
`;

const List = styled.div`
    display: grid;
    grid-template-columns: .7fr 0.7fr 1.5fr .5fr .4fr 0.9fr 0.7fr 0.7fr 0.7fr;
    gap: 10px;
    padding: 10px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    color: rgba(0, 0, 0, 0.5);

    :last-child {
        border: none;
    }
`;