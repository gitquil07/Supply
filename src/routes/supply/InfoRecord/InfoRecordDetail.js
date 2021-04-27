import styled from "styled-components";
import { Button } from "../../../components/Buttons";

import { Helmet } from "react-helmet";
import { useTitle } from "../../../hooks";

import { Form } from "../../../components/Form";
import { FlexForHeader } from "../../../components/Flex";
import { AddibleInput } from "../../../components/Flex";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { CustomInput } from "../../../components/Inputs/CustomInput";

const InfoRecordDetail = ({match}) => {
    
    const { id } = match.params;

    const title = useTitle(`Материал (№${id})`)

    return (
        <>
            <Helmet>
                <title>
                    {title}
                </title>
            </Helmet>
            <Form>
                <FlexForHeader>
                    <Title>
                        Информация о материале
                    </Title>
                    <Button name="Добавить изменения" color="#5762B2"/>
                </FlexForHeader>
                <AddibleInput>
                    <CustomSelector label="Завод" />
                    <CustomSelector label="Поставшик"/>
                    <CustomSelector label="Продукт" />
                    <CustomSelector label="Цена" short/>
                    <CustomSelector label="Ед.Изм." short/>
                    <CustomInput label="Кол-во дней изготовления" short/>
                    <CustomInput label="Кол-во дней доставки" short/>
                    <CustomSelector label="Статус" short/>
                </AddibleInput>
                <FlexForHeader>
                    <Title>
                        История материала
                    </Title>
                </FlexForHeader>
                <GreyTable>
                    <thead>
                        <tr>
                            <th>
                                Завод:
                            </th>
                            <th>
                                Поставщик:
                            </th>
                            <th>
                                Продукт:
                            </th>
                            <th>
                                Цена:
                            </th>
                            <th>
                                Ед. Изм:
                            </th>
                            <th>
                                Дни изготовления:
                            </th>
                            <th>
                                Дни доставки:
                            </th>
                            <th>
                                Дата изменения:
                            </th>
                            <th>
                                Статус:
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                Телевизор
                            </td>
                            <td>
                                Мумтоз
                            </td>
                            <td>
                                STP329-0-32CHR СРЕДНЯЯ ПА ...
                            </td>
                            <td>
                                5.00
                            </td>
                            <td>
                                кг
                            </td>
                            <td>
                                12
                            </td>
                            <td>
                                20
                            </td>
                            <td>
                                01.04.2021
                            </td>
                            <td>
                                Активный
                            </td>
                        </tr>
                        <tr>
                            <td>
                                Телевизор
                            </td>
                            <td>
                                Мумтоз
                            </td>
                            <td>
                                STP329-0-32CHR СРЕДНЯЯ ПА ...
                            </td>
                            <td>
                                5.00
                            </td>
                            <td>
                                кг
                            </td>
                            <td>
                                12
                            </td>
                            <td>
                                20
                            </td>
                            <td>
                                01.04.2021
                            </td>
                            <td>
                                Активный
                            </td>
                        </tr>
                    </tbody>
                </GreyTable>
            </Form>
        </>
    );
}

const GreyTable = styled.table`
    width:100%;
    background-color:#F6F6FC;
    border-radius:10px;
    /* border-collapse:collapse; */
    border:1px solid rgba(0, 0, 0, 0.15);
    padding:10px;
    box-sizing:border-box;
    font-size:18px;
    margin-top:20px;

    thead tr th{
        position:-webkit-sticky;
        top:0;
        z-index:2;
        padding:0 10px 10px 10px;
        font-weight:normal;
    }
    
    tbody{
        padding:10px;
        color:rgba(0, 0, 0, 0.5);
        border-radius:5px;
        border:1px solid rgba(0, 0, 0, 0.1);

        tr{
            border-bottom:1px solid rgba(0, 0, 0, 0.1);
            background-color:#fff;

            td{
                padding:10px;
            }
        }
    }

`;

const Title = styled.div`
    font-size:18px;

    span {
        color: rgba(0, 0, 0, 0.5);
    }
`;

export default InfoRecordDetail;