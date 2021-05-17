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
                        <th colSpan="10">Общие данные о <br /> остатки и закупке</th>
                        <th colSpan="11">Транспортировка</th>
                        <th colSpan="4">План на</th>
                    </tr>
                    <tr>
                        <th>№</th>
                        <th className="last-child">Код материала</th>

                        <th>Наименование</th>
                        <th>Ед.изм.</th>
                        <th className="last-child">Средный расход <br /> за день</th>

                        <th>"Готовая продукция <br /> Текущая"</th>
                        <th>"Остаток на начало <br /> месяц (Склад)"</th>
                        <th>Факт Приход с начало <br /> месяц до сегодня</th>
                        <th>Факт Приход с начало <br /> месяц до сегодня</th>
                        <th>План расход на Июнь</th>
                        <th>Выпол-е план расхода</th>
                        <th>Остаток на сегодня</th>
                        <th>Хватает, дней</th>
                        <th>Остаток на конец <br /> месяц (по планом)</th>
                        <th className="last-child">Остаток на <br /> конец месяц (по факту)</th>

                        <th>"В пути <br /> (приход по месяцам)"</th>
                        <th>Местонахождение</th>
                        <th>Дата прибытия</th>
                        <th>Хватает, дней</th>
                        <th>Хватает, дата</th>
                        <th>Поставщик  </th>
                        <th>Страна</th>
                        <th>Цена</th>
                        <th>Условия оплаты</th>
                        <th>Заказано</th>
                        <th className="last-child">Планируемая дата <br /> отгрузка</th>

                        <th>Остаток на начало месяц</th>
                        <th>Приход  на Июнь</th>
                        <th>Расход на Июнь</th>
                        <th className="last-child">Остаток на конец месяца</th>
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
        }

        tr:last-child {
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
        }

        tr th {
                font-size: 14px;
                font-weight: 600;
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

            :nth-child(even) {
                .group-1, .group-2, .group-3, .group-4, .group-5, .group-6, .group-7 {
                    /* filter: brightness(80%); */    
                    box-shadow: inset -300px 0px 0px rgba(0, 0, 0, 0.15);

                    
                }
            }
    }
`