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
                    <table>
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
                    </table>
                </GreyTable>
            </Form>
        </>
    );
}

const GreyTable = styled.div`
    width:100%;
    background-color:#F6F6FC;
    border-radius:10px;
    border:1px solid rgba(0, 0, 0, 0.15);
    padding:0 10px 10px 10px;
    box-sizing:border-box;
    font-size:18px;
    margin-top:20px;
    text-align:left;
    max-height:400px;
    overflow:auto;

    ::-webkit-scrollbar { 
        width:5px;
    }

    ::-webkit-scrollbar-track {
        background: transparent;
    }

    ::-webkit-scrollbar-thumb {
        max-height:50px;
        background: #5762B2;
        border-radius: 6px;
    }

    table {
        border-collapse:collapse;
        width:100%;

        thead{
            font-weight:normal;
            /* box-sizing:border-box; */

            tr th{ 
                position:sticky;
                top:0;
                z-index:6;
                background-color:#F6F6FC;
                padding:10px 10px 10px 10px;
            }
        }
        
        tbody{
            padding:0 10px 10px 10px;
            color:rgba(0, 0, 0, 0.5);
            border-radius:5px;
            position:relative;
            border:1px solid rgba(0, 0, 0, 0.1);
            background-color:#fff;
            box-sizing:border-box;

            tr{
                border-bottom:1px solid rgba(0, 0, 0, 0.1);

                td{
                    padding:10px;
                }
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