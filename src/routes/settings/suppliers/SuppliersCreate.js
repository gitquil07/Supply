import { useState } from "react";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { Button } from "../../../components/Buttons";

import { useCreate } from "../../../hooks";
import { CREATE_VENDOR } from "./gql";
import MenuItem from "@material-ui/core/MenuItem";


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
    postCode: "",
    sapSearchCriteria: "",
    sapOkonkh: "",
    sapCity: ""
};

const SuppliersCreate = ({ isOpen, close }) => {

    const {
        state,
        handleClose,
        handleInputChange,
        handleSubmit
    } = useCreate(initialState, CREATE_VENDOR, close);

    const countries = [],
          accountGroups = [];

    const inputs = [
        { label: "Имя", name: "name" },
        { label: "Назваие компании", name: "companyName" },
        { label: "Номер телефона", name: "phone_number" },
        { label: "Пароль", name: "password", type: "password" },
        { label: "Улица", name: "street" },
        { label: "Дом", name: "house" },
        { label: "Роль", name: "role" },
        { label: "Email", name: "email" },
        { label: "Почтовый индекс", name: "postcode" },
        { label: "Критерий поиска", name: "sapSearchCriteria" },
        { label: "ОКОНКХ", name: "sapOkonkh" },
        { label: "Город", name: "sapCity" },
    ];

    return (
        <SmallDialog title="Создать Поставщики" isOpen={isOpen} close={handleClose}>
            {
                inputs.map((e, i) =>
                    <CustomInput
                        key={i}
                        name={e.name}
                        label={e.label}
                        onChange={handleInputChange}
                    />
                )
            }

            <CustomSelector label="Страна" stateChange={(e) => handleInputChange(e)} value={state.sapCountry}>
                {
                    countries?.map(country => {
                        return <MenuItem value={country.pk}>{country.name}</MenuItem>
                    })
                }
            </CustomSelector>
            <CustomSelector label="Группа" stateChange={(e) => handleInputChange(e)} value={state.sapAccountGroup}>
                {
                    accountGroups?.map(aGroup => {
                        return <MenuItem value={aGroup.pk}>{aGroup.name}</MenuItem>
                    })
                }
            </CustomSelector>
            <Button name="Добавить поставшика" color="#5762B2" clickHandler={handleSubmit}/>
        </SmallDialog>
    )
}

export default SuppliersCreate;