import { Helmet } from "react-helmet";
import { AddibleInput } from "components/Flex";
import { Form } from "components/Form";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomSelector } from "components/Inputs/CustomSelector";
import { useTitle } from "hooks";
import styled from "styled-components"
import { Footer } from "components/Footer";
import { Button } from "components/Buttons";

import { useLazyQuery } from "@apollo/client";
import { GET_SAP_COUNTRIES } from "./gql";
import { CREATE_VENDOR, UPDATE_VENDOR, GET_VENDOR } from "./gql";
import { useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { vendorRoles } from "utils/static";
import { useCustomMutation, useFormData } from "hooks";
import { getList } from "utils/functions";
import { useState } from "react";
import { ValidationMessage } from "components/ValidationMessage";
import { SuppliersValidation, fieldsMessages } from "./validation";

const initialState = {
    sapCountry: "",
    name: "",
    companyName: "",
    phoneNumber: "",
    street: "",
    house: "",
    role: "",
    email: "",
    postcode: "",
};

const SuppliersCreate = ({ match }) => {

    const title = useTitle("Создание нового Партнера"),
        { id } = match.params,
        history = useHistory();

    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

    const { submitData, handleSubmit, validationMessages, mutationLoading } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_VENDOR,
            queryUpdate: UPDATE_VENDOR
        }
    },
        "Партнер",
        () => {
            history.push("/settings/suppliers");
        },
        SuppliersValidation,
        fieldsMessages
    );


    const [getSapCountries, sapCountriesRes] = useLazyQuery(GET_SAP_COUNTRIES),
        sapCountries = getList(sapCountriesRes?.data),
        [getVendor, vendorRes] = useLazyQuery(GET_VENDOR, {
            fetchPolicy: "no-cache"
        }),
        pk = vendorRes?.data?.vendor?.vendor?.pk;

    useEffect(() => {
        getSapCountries();
        if (id !== undefined) {
            getVendor({
                variables: {
                    id
                }
            });
        }
    }, [id]);


    useEffect(() => {
        const vendor = vendorRes.data?.vendor?.vendor;

        const state = {};
        if (vendor) {
            Object.keys(vendor).forEach(key => {
                if (key !== "pk" && key !== "__typename") {
                    state[key] = (typeof vendor[key] === "object" && vendor[key] !== null) ? vendor[key]?.pk : vendor[key];
                }
            })
        }

        setState(state);

    }, [vendorRes.data?.vendor?.vendor])

    const beforeSubmit = () => {
        console.log("state", state);
        const requestBody = {
            ...state,
            role: vendorRoles.find(vendorRole => vendorRole.value == state.role)?.label
        }

        console.log("requestBody", requestBody);
        // pk? submitData(requestBody, pk) : submitData(requestBody)
        pk ? handleSubmit(requestBody, pk) : handleSubmit(requestBody)

    }

    return (
        <>
            <Helmet title={title} />
            <Form>
                <p>Информация о Партнере</p>
                <AddibleInput>
                    <div>
                        <CustomInput name="name" label="Контактное лицо" value={state.name} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.name.length ? true : false} />
                        {
                            validationMessages.name.length ? <ValidationMessage>{validationMessages.name}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomInput name="phoneNumber" label="Номер телефона" value={state.phoneNumber} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.phoneNumber.length ? true : false} />
                        {
                            validationMessages.phoneNumber.length ? <ValidationMessage>{validationMessages.phoneNumber}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomInput name="companyName" label="Фирма" value={state.companyName} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.companyName.length ? true : false} />
                        {
                            validationMessages.companyName.length ? <ValidationMessage>{validationMessages.companyName}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomInput name="email" label="Email" value={state.email} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.email.length ? true : false} />
                        {
                            validationMessages.email.length ? <ValidationMessage>{validationMessages.email}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomSelector name="role" label="Роль" value={state.role} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.role.length ? true : false} >
                            {
                                vendorRoles.map(role => (
                                    <MenuItem value={role.value}>{role.label}</MenuItem>
                                ))
                            }
                        </CustomSelector>
                        {
                            validationMessages.role.length ? <ValidationMessage>{validationMessages.role}</ValidationMessage> : null
                        }
                    </div>
                </AddibleInput>

                <p>Адрес</p>
                <AddibleInput>
                    <div>
                        <CustomSelector name="sapCountry" label="Страна" value={state.sapCountry} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.sapCountry.length ? true : false}>
                            {
                                sapCountries?.map(({ node }) => {
                                    return <MenuItem value={node.pk}>{node.name}</MenuItem>
                                })
                            }
                        </CustomSelector>
                        {
                            validationMessages.sapCountry.length ? <ValidationMessage>{validationMessages.sapCountry}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomInput name="street" label="Улица" value={state.street} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.street.length ? true : false} />
                        {
                            validationMessages.street.length ? <ValidationMessage>{validationMessages.street}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomInput name="house" label="Дом" value={state.house} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.street.length ? true : false} />
                        {
                            validationMessages.house.length ? <ValidationMessage>{validationMessages.house}</ValidationMessage> : null
                        }
                    </div>
                    <div>
                        <CustomInput name="postcode" label="Почтовый индекс" value={state.postcode} stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.postcode.length ? true : false} />
                        {
                            validationMessages.postcode.length ? <ValidationMessage>{validationMessages.postcode}</ValidationMessage> : null
                        }
                    </div>
                </AddibleInput>

                <Header>
                </Header>
            </Form>
            <Footer justify="flex-end">
                <Button name={pk ? "Сохранить" : "создать"} clickHandler={beforeSubmit} loading={mutationLoading} />
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
