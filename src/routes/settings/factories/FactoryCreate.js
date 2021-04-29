import { useState, useEffect } from "react";

import { useMutation } from "@apollo/client";
import { CREATE_FACTORY } from "./gql";
import { Button } from "../../../components/Buttons";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";

const initialState = {
    name: "",
    officialName: "",
    code: "",
    position: ""
}

const FactoryCreate = ({ isOpen, close }) => {

    const [factoryCreate, setFactoryCreate] = useState(initialState);

    const [ addFactory ] = useMutation(CREATE_FACTORY, {
        onError: (error) => console.log(error)
    });

    const handleInputChange = (e) => {
        setFactoryCreate({...factoryCreate, [e.target.name] : e.target.value});
    }

    const handleClose = () => {
        close();
        setFactoryCreate(initialState);
    }

    const handleSubmit = () => {
        addFactory({
            variables: {
                input: factoryCreate
            }
        })
    }

    useEffect(() => {
        console.log(factoryCreate);
    }, [factoryCreate]);

    return (
        <SmallDialog title="Создать Заводы" isOpen={isOpen} close={handleClose}>
            <CustomInput value={factoryCreate.name} name="name" label="Название завода" stateChange={handleInputChange} />
            <CustomInput value={factoryCreate.officialName} name="officialName" label="Название завода" stateChange={handleInputChange} />
            <CustomInput value={factoryCreate.code} name="code" label="Код" stateChange={handleInputChange} />
            <CustomNumber value={factoryCreate.position} name="position" label="Позиция" stateChange={handleInputChange} fullWidth />
            <Button name="Добавить завод" color="#5762B2" onClick={handleSubmit}/>
        </SmallDialog>
    );
};

export default FactoryCreate;