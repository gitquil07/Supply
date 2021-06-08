import React, { useEffect } from "react";

import { CREATE_TRANSPORT_TYPE, UPDATE_TRANSPORT_TYPE } from "./gql";
import { Button } from "components/Buttons";
import SmallDialog from "components/SmallDialog";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomNumber } from "components/Inputs/CustomNumber";
import { ValidationMessage } from "components/ValidationMessage";
import { object, string, number } from "yup";

import { useCustomMutation, useFormData } from "hooks";

const initialState = {
    name: "",
    customsDayCount: ""
}

const fieldsMessages = {
    name: "",
    customsDayCount: ""
}

const transportSchema = object({
    name: string().typeError("Поле должно быть строкой").required("Поле 'Название транспорта' обязательно к заполнению"),
    customsDayCount: number().typeError("Поле должно быть строкой").required("Поле 'Кол-во дней' обязательно к заполнению")
});


const TransportCreate = ({ isOpen, close, entry, setMutateState, setIsFirstPage, getEntries, amountOfElemsPerPage, paginatingState }) => {

    let pk = entry?.pk;

    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

    useEffect(() => {

        if (entry !== undefined) {

            setState({
                name: entry.name,
                customsDayCount: entry.customsDayCount
            });

        }

    }, [entry?.id]);

    const handleClose = () => {
        close();
        setState(initialState);
        setValidationMessages(fieldsMessages);
    }

    const { handleSubmit, validationMessages, setValidationMessages, mutationLoading } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_TRANSPORT_TYPE,
            queryUpdate: UPDATE_TRANSPORT_TYPE,
        }
    },
        "Тип транспорта",
        () => {
            handleClose();
            if ((paginatingState.nextPage === true && paginatingState.prevPage === false) || (paginatingState.nextPage === false && paginatingState.prevPage === false)) {
                console.log("inside condition first");
                setIsFirstPage(true);
                getEntries({
                    variables: {
                        first: amountOfElemsPerPage,
                        last: null,
                        after: null,
                        before: null
                    }
                });
            }
            if ((paginatingState.nextPage === true && paginatingState.prevPage === true) || (paginatingState.nextPage === false && paginatingState.prevPage === true)) {
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
        transportSchema,
        fieldsMessages
    );


    return (
        <SmallDialog title={pk ? "Изменить" : "Создать Тип транспорта"} isOpen={isOpen} close={handleClose}>
            <CustomInput value={state.name} name="name" label="Название транспорта" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.name.length ? true : false} />
            {
                validationMessages.name.length ? <ValidationMessage>{validationMessages.name}</ValidationMessage> : null
            }
            <CustomNumber value={state.customsDayCount} name="customsDayCount" label="Кол-во дней" stateChange={e => handleChange({ fElem: e })} fullWidth errorVal={validationMessages.name.length ? true : false} />
            {
                validationMessages.customsDayCount.length ? <ValidationMessage>{validationMessages.customsDayCount}</ValidationMessage> : null
            }
            <Button name={pk ? "сохранить" : "Добавить транспорт"} color="#5762B2" clickHandler={() => pk ? handleSubmit(state, pk) : handleSubmit(state)} loading={mutationLoading} />
        </SmallDialog>
    );
};

export default React.memo(TransportCreate, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen;
});