import React, { useEffect } from "react";

import { CREATE_FIRM, UPDATE_FIRM } from "./gql";
import { Button } from "components/Buttons";
import SmallDialog from "components/SmallDialog";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomNumber } from "components/Inputs/CustomNumber";
import { ValidationMessage } from "components/ValidationMessage";
import { useCustomMutation, useFormData } from "hooks";
import { fieldsMessages, firmSchema } from "./validation"

const initialState = {
    name: "",
    inn: ""
}

const FirmCreate = ({ isOpen, close, entry, setMutateState, setIsFirstPage, getEntries, amountOfElemsPerPage, paginatingState }) => {

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
                inn: entry.inn
            });

        }

    }, [entry?.id]);

    const { handleSubmit, validationMessages, setValidationMessages, mutationLoading } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_FIRM,
            queryUpdate: UPDATE_FIRM,
        }
    },
        "Тип транспорта",
        () => {
            handleClose();
            if ((paginatingState.nextPage === true && paginatingState.prevPage === false) || (paginatingState.nextPage === false && paginatingState.prevPage === false)) {
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
        firmSchema,
        fieldsMessages
    );

    const handleClose = () => {
        close();
        setState(initialState);
        setValidationMessages(fieldsMessages);
    }

    return (
        <SmallDialog title={pk ? "Изменить" : "Создать фирму"} isOpen={isOpen} close={handleClose}>
            <CustomInput value={state.name} name="name" label="Название фирмы" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.name.length ? true : false} />
            {
                validationMessages.name.length ? <ValidationMessage>{validationMessages.name}</ValidationMessage> : null
            }
            <CustomNumber value={state.inn} name="inn" label="ИНН" stateChange={e => handleChange({ fElem: e })} fullWidth errorVal={validationMessages.inn.length ? true : false} />
            {
                validationMessages.inn.length ? <ValidationMessage>{validationMessages.inn}</ValidationMessage> : null
            }
            <Button name={pk ? "сохранить" : "Добавить фирму"} color="#5762B2" clickHandler={() => pk ? handleSubmit(state, pk) : handleSubmit(state)} loading={mutationLoading} />
        </SmallDialog>
    );
};

export default React.memo(FirmCreate, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen;
});