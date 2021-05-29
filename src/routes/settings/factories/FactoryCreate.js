import React, { useEffect } from "react";

import { CREATE_FACTORY, UPDATE_FACTORY } from "./gql";
import { Button } from "components/Buttons";
import SmallDialog from "components/SmallDialog";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomNumber } from "components/Inputs/CustomNumber";
import { ValidationMessage } from "components/ValidationMessage"

import { useCustomMutation, useFormData } from "hooks";
import { object, string, number } from "yup";

const initialState = {
    name: "",
    officialName: "",
    code: "",
    position: ""
}

const fieldsMessages = {
    name: "",
    officialName: "",
    code: "",
    position: ""
}

const factorySchema = object({
    name: string().typeError("Поле должно быть строкой").required("Поле 'Название' обязательно к заполнению"),
    officialName: string().typeError("Поле должно быть строкой").required("Поле 'Официальное название' обязательо к заполнению"),
    code: string().typeError("Поле должно быть строкой").required("Поле 'Код' обязательно к заполению"),
    position: number().typeError("Введите число").required("Поле 'Позиция' обязательно к заполнению")
});

const FactoryCreate = ({ isOpen, close, entry, setMutateState, getEntries, amountOfElemsPerPage, paginatingState }) => {
    
    let pk = entry?.pk;

    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

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



    const { handleSubmit, validationMessages, setValidationMessages } = useCustomMutation({
            graphQlQuery: {
                queryCreate: CREATE_FACTORY,
                queryUpdate: UPDATE_FACTORY,
            }
        },
        "Завод",
        () => {
            handleClose();
            if((paginatingState.nextPage === true && paginatingState.prevPage === true) || (paginatingState.nextPage === false && paginatingState.prevPage === true)){
                setMutateState("create");
                getEntries({
                    variables: {
                        first: amountOfElemsPerPage,
                        last: null,
                        after: null,
                        before: null
                    }
                });
            }
        },
        factorySchema,
        fieldsMessages
    );

    const handleClose = () => {
        close();
        setState(initialState);
        setValidationMessages(fieldsMessages);
    }

    return (
        <SmallDialog title={pk? "Изменить" : "Создать Завод"} isOpen={isOpen} close={handleClose}>
            <CustomInput value={state.name} name="name" label="Название" stateChange={e => handleChange({fElem:e})} errorVal={validationMessages.name.length? true : false} />
            {
                validationMessages.name.length? <ValidationMessage>{validationMessages.name}</ValidationMessage> : null   
            }
            <CustomInput value={state.officialName} name="officialName" label="Официальное название" stateChange={e => handleChange({fElem:e})} errorVal={validationMessages.officialName.length? true : false} />
            {
                validationMessages.officialName.length? <ValidationMessage>{validationMessages.officialName}</ValidationMessage> : null
            }
            <CustomInput value={state.code} name="code" label="Код" stateChange={e => handleChange({fElem:e})} errorVal={validationMessages.code.length? true : false} />
            {
                validationMessages.code.length? <ValidationMessage>{validationMessages.code}</ValidationMessage> : null
            }
            <CustomNumber value={state.position} name="position" label="Позиция" stateChange={e => handleChange({fElem:e})} fullWidth errorVal={validationMessages.position.length? true : false} />
            {
                validationMessages.position.length? <ValidationMessage>{validationMessages.position}</ValidationMessage> : null
            }
            <Button name={pk? "сохранить" : "Добавить завод"} color="#5762B2" clickHandler={() =>  pk? handleSubmit(state, pk) : handleSubmit(state)}/>
        </SmallDialog>
    );
};

export default React.memo(FactoryCreate, (prevProps, nextProps) => {
           return prevProps.isOpen === nextProps.isOpen;
});