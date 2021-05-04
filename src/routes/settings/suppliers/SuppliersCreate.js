import { Helmet } from "react-helmet";
import { AddibleInput } from "../../../components/Flex";
import { Form } from "../../../components/Form";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { useTitle } from "../../../hooks";
import styled from "styled-components"
import { Footer } from "../../../components/Footer";
import { Button } from "../../../components/Buttons";
import { FlexForHeader } from '../../../components/Flex';

import { useLazyQuery, useMutation } from "@apollo/client";
import { GET_SAP_COUNTRIES } from "./gql";
import { useCreate } from "../../../hooks";
import { CREATE_VENDOR, UPDATE_VENDOR } from "./gql";
import { useEffect, useState } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { update } from "ramda";
import { showNotification } from "../../../utils/functions";

const initialState = {
    sapCountry: "",
    sapAccountGroup: "",
    name: "",
    companyName: "",
    phoneNumber: "",
    street: "",
    house: "",
    role: "",
    email: "",
    postcode: "",
    sapSearchCriteria: "",
    sapOkonkh: "",
    sapCity: ""
};

const accountGroups = [
    {
        pk: 1,
        name: "account_1"
    }
]

const sapCountries = [
    {
        pk: 1,
        name: "country_1"
    }
]


const SuppliersCreate = ({ match }) => {

    const title = useTitle("Создание нового Поставщика");
    const [state, setState] = useState(initialState);
    const {id} = match.params;

    const [ create ] = useMutation(CREATE_VENDOR, {
                onCompleted: data => {
                    showNotification(data, "vendor", "vendorCreate", "Поставщик создан");
                },
                onError: error => console.log(error)
          }),

          [ update ] = useMutation(UPDATE_VENDOR, {
                onCompleted: data => {
                    showNotification(data, "vendor", "vendorUpdate", "Поставщик изменён" );
                },
                onError: error => console.log(error)
          });

    const [getSapCountries, { data }] = useLazyQuery(GET_SAP_COUNTRIES),
          sapCountries = data?.sap?.sapCountries?.edges;

    useEffect(() => {
        getSapCountries();
    }, []);

    const handleInputChange = e => {
        setState({...state, [e.target.name] : e.target.value});
    }

    const handleSubmit = () => {

        if(id !== undefined){
            // update({
            //     variables: {
            //         input
            //     }   
            // });
        }else{  
            // create({
            //     variables: {
            //         input
            //     }
            // })
        }

    }
    return (
        <>
            <Helmet title={title} />
            <Form>
                <p>Информация о Поставщике</p>
                <AddibleInput>
                    <CustomInput name="name" label="Имя" value={state.name} stateChange={e => handleInputChange(e)} />
                    <CustomInput name="phoneNumber" label="Номер телефона" value={state.phoneNumber} stateChange={e => handleInputChange(e)} />
                    <CustomInput name="companyName" label="Фирма" value={state.companyName} stateChange={e => handleInputChange(e)} />
                    <CustomInput name="email" label="Email" value={state.email} stateChange={e => handleInputChange(e)} />
                    <CustomInput name="role" label="Роль" value={state.role} stateChange={e => handleInputChange(e)} />
                    <CustomInput name="postcode" label="Почтовый индекс" value={state.postcode} stateChange={e => handleInputChange(e)} />
                    <CustomInput name="sapOkonkh" label="ОКОНКХ" value={state.sapOkonkh} stateChange={e => handleInputChange(e)} />
                    <CustomInput name="sapCity" label="Город" value={state.sapCity} stateChange={e => handleInputChange(e)} />
                    <CustomInput name="sapSearchCriteria" label="Критерий поиска" value={state.sapSearchCriteria} stateChange={e => handleInputChange(e)} />
                </AddibleInput>

                <p>Адрес</p>
                <AddibleInput>
                    <CustomSelector name="sapCountry" label="Страна" value={state.sapCountry} stateChange={e => handleInputChange(e)}>
                        {
                            sapCountries?.map(({node}) => {
                                return <MenuItem value={node.pk}>{node.name}</MenuItem>
                            })
                        }
                    </CustomSelector>
                    <CustomSelector name="sapAccountGroup" label="Группа аккаунтов" value={state.sapAccountGroup} stateChange={e => handleInputChange(e)}>
                        {
                            accountGroups?.map(accountGroup => {
                                return <MenuItem value={accountGroup.pk}>{accountGroup.name}</MenuItem>
                            })
                        }
                    </CustomSelector>
                    <CustomInput name="street" label="Улица" value={state.street} stateChange={handleInputChange} />
                    <CustomInput name="house" label="Дом" value={state.house} stateChange={handleInputChange} />
                </AddibleInput>

                <Header>
                    <Title>Материал</Title>
                    <Button name="Добавить поставшика" color="#5762B2" clickHandler={handleSubmit} />
                </Header>

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
                <Button name="Сохранить" />
            </Footer>
        </>
    )
}

export default SuppliersCreate;

const Title = styled.div`
    font-size: 18px;
`;

const Header = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 20px 0;
`;

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