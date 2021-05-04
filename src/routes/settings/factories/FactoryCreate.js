import React from "react";

import { CREATE_FACTORY, UPDATE_FACTORY } from "./gql";
import { Button } from "../../../components/Buttons";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";

import { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { showNotification } from "../../../utils/functions";

const initialState = {
    name: "",
    officialName: "",
    code: "",
    position: ""
}

const FactoryCreate = ({ isOpen, close, entry }) => {

    let pk = entry?.pk;

    const [state, setState] = useState(initialState);

    useEffect(() => {

        if(entry !== undefined){

            setState({
                name: entry.name,
                officialName: entry.officialName,
                code: entry.code,
                position: entry.position
            });

        }

    }, [entry?.id]);

    // Test 
    // useEffect(() => {
    //     console.log("state", state);
    // }, [state]);

    const handleInputChange = (e) => {
        setState({...state, [e.target.name] : e.target.value});
    }

    const handleClose = () => {
        close();
        setState(initialState);
    }

    const [ create ] = useMutation(CREATE_FACTORY, {
        onError: (error) => console.log(error),
        onCompleted: (data) => {
            showNotification(data, "factory", "factoryCreate", "Завод создан");
            handleClose();
        }
    });

    const [ update ] = useMutation(UPDATE_FACTORY, {
        onError: (error) => console.log(error),
        onCompleted: (data) => {
            showNotification(data, "factory", "factoryUpdate", "Завод успешно изменен");
            handleClose();
        }
    });

    const handleSubmit = (pk) => {
        const body = {
            variables : {
                input: {
                    data : state
                }
            }
        };

        if(pk !== undefined){
            body.variables.input.pk = pk;
            update(body);
        }else{
            create(body);
        }

    }

    return (
        <SmallDialog title={pk? "Изменить" : "Создать Завод"} isOpen={isOpen} close={handleClose}>
            <CustomInput value={state.name} name="name" label="Название завода" stateChange={handleInputChange} />
            <CustomInput value={state.officialName} name="officialName" label="Название завода" stateChange={handleInputChange} />
            <CustomInput value={state.code} name="code" label="Код" stateChange={handleInputChange} />
            <CustomNumber value={state.position} name="position" label="Позиция" stateChange={handleInputChange} fullWidth />
            <Button name={pk? "сохранить" : "Добавить завод"} color="#5762B2" clickHandler={() => pk? handleSubmit(pk) : handleSubmit()}/>
        </SmallDialog>
    );
};

export default FactoryCreate;