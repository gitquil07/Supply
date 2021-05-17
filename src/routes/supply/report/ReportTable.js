import styled from 'styled-components'
import { tableData } from './tableData'

const ReportTable = () => {
    return (
        <Wrapper>
            <Table>
                <thead>
                    <tr>
                        <th colSpan="2">Завод</th>
                        <th colSpan="3">10.05.2021</th>
                        <th colSpan="10">Общие данные о остатки и закупке <span className="badge">Июнь  2020</span></th>
                        <th colSpan="12">Транспортировка</th>
                        <th colSpan="4">План на  <span className="badge">Июнь  2020</span></th>
                    </tr>

                    <tr>
                        <th rowSpan="2">№</th>
                        <th rowSpan="2" className="last-child">Код материала</th>

                        <th rowSpan="2">Наименование</th>
                        <th rowSpan="2">Ед.изм.</th>
                        <th rowSpan="2" className="last-child">Средный расход <br /> за день</th>

                        <th rowSpan="2">"Готовая продукция <br /> Текущая"</th>
                        <th rowSpan="2">"Остаток на начало <br /> месяц (Склад)"</th>
                        <th rowSpan="2">Факт Приход с начало <br /> месяц до сегодня</th>
                        <th rowSpan="2">Факт Приход с начало <br /> месяц до сегодня</th>
                        <th rowSpan="2">План расход на Июнь</th>
                        <th rowSpan="2">Выпол-е план расхода</th>
                        <th rowSpan="2">Остаток на сегодня</th>
                        <th rowSpan="2">Хватает, дней</th>
                        <th rowSpan="2">Остаток на конец <br /> месяц (по планом)</th>
                        <th rowSpan="2" className="last-child">Остаток на <br /> конец месяц (по факту)</th>

                        <th colSpan="2">"В пути <br /> (приход по месяцам)"</th>
                        <th rowSpan="2">Местонахождение</th>
                        <th rowSpan="2">Дата прибытия</th>
                        <th rowSpan="2">Хватает, дней</th>
                        <th rowSpan="2">Хватает, дата</th>
                        <th rowSpan="2">Поставщик  </th>
                        <th rowSpan="2">Страна</th>
                        <th rowSpan="2">Цена</th>
                        <th rowSpan="2">Условия оплаты</th>
                        <th rowSpan="2">Заказано</th>
                        <th rowSpan="2" className="last-child">Планируемая дата <br /> отгрузка</th>

                        <th rowSpan="2">Остаток на начало месяц</th>
                        <th rowSpan="2">Приход  на Июнь</th>
                        <th rowSpan="2">Расход на Июнь</th>
                        <th rowSpan="2" className="last-child">Остаток на конец месяца</th>
                    </tr>

                    <tr>
                        <th>Июнь</th>
                        <th>Июль</th>
                    </tr>
                </thead>

                <tbody>
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                    {tableData}
                </tbody>
            </Table>
        </Wrapper >
    )
}

export default ReportTable

const Wrapper = styled.div``

const Table = styled.table`
    width: 100%;
    height: calc(100vh - 90px);
    font-family: arial, sans-serif;
    border-collapse: collapse;
    overflow-x: scroll;
    overflow: auto;  
    display: block;
    border-radius: 10px;
    box-shadow: 0px 0px 20px rgba(0, 0, 0, 0.30);

    ::-webkit-scrollbar {
        height: 12px !important;
        width: 12px !important; 
    }

    ::-webkit-scrollbar-track {
        background: #f1f1f1; 
    }

    ::-webkit-scrollbar-thumb {
        background: #5762B2; 
    }

    thead {
        width: 100%;
        white-space: nowrap;
        
        tr:first-child th {
            height: 50px;
            background: #4A4D63;
            color: #fff;
            border-right: 5px solid #fff;
            padding: 0;
        }

        tr {
            th {
                background: #5762B2;
                color: #fff;
                padding: 20px; 
                border-right: 1px solid #000000;
                border-bottom: 1px solid #000000;
            }
            
            .last-child {
                border-right: 5px solid white;;
            }

            .badge {
                background: #08BB19;
                border-radius: 5px;
                padding: 5px;
                margin-left: 10px;
            }
        }

        tr th {
            font-size: 14px; 
            font-family: "Roboto", sans-serif;
        }
    }

    tbody {
        width: 100%;
        white-space: nowrap; 

        tr { 
            td {
                padding: 15px;
                text-align: center; 
                position: relative;
                font-family: "Roboto", sans-serif;
                font-size: 14px;

                :after {
                    content: '';
                    height: 80%;
                    width: 1px;
                    position: absolute;
                    right: 0;
                    top: 10%;
                    background-color: #999999; 
                }

                :first-child {
                    color: #fff;
                    background-color: #5762B2;
                    border-right: 1px solid #000000;

                    ::after {
                        content: none;
                    }
                }

                :last-child {
                    ::after {
                        content: none;
                    }
                }
            }

            .group-1 {
                background: #FFFFFF;
            }

            .group-2 {
                    background: #FFFFFF;
            }

            .group-3 {
                    background: #FFD0D0;
            }

            .group-4 {
                    background: #FAFFC3;
            }

            .group-5 {
                    background: #FFFFFF;
            }

            .group-6 {
                    background: #FFD0D0;
            }

            .group-7 {
                    background: #FAFFC3;
            }

            .group-1-last {
                background: #FFFFFF;
                border-right: 5px solid white;;


                ::after {
                    content: none;
                }
            }

            .group-2-last {
                background: #FFFFFF;
                border-right: 5px solid white;;

                ::after {
                    content: none;
                }
            } 

            .group-4-last {
                background: #FAFFC3;
                border-right: 5px solid white;;

                ::after {
                    content: none;
                }
            }

            .group-5-last {
                background: #FFFFFF;
                border-right: 5px solid white;;

                ::after {
                    content: none;
                }
            }
 
            :nth-child(even) {
                .group-1, .group-1-last, 
                .group-2, .group-2-last, 
                .group-3, .group-3-last,
                .group-4, .group-4-last,
                .group-5, .group-5-last,
                .group-6, .group-6-last,
                .group-7, .group-7-last {
                    box-shadow: inset -300px 0px 0px rgba(0, 0, 0, 0.15);
                }
            }
    }
`