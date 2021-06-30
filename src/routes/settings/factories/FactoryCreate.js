import React, { useEffect } from "react";

import { CREATE_FACTORY, UPDATE_FACTORY, GET_FIRMS } from "./gql";
import { Button } from "components/Buttons";
import SmallDialog from "components/SmallDialog";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomNumber } from "components/Inputs/CustomNumber";
import { CustomSelector } from "components/Inputs/CustomSelector";
import { ValidationMessage } from "components/ValidationMessage";
import { useLazyQuery } from "@apollo/client";
import { getList } from "utils/functions";
import { useCustomMutation, useFormData } from "hooks";
import { MenuItem } from "@material-ui/core";
import { factorySchema, fieldsMessages } from "./validation";

const initialState = {
    firm: "",
    name: "",
    code: "",
    position: ""
}

const FactoryCreate = ({ isOpen, close, entry, setMutateState, setIsFirstPage, getEntries, amountOfElemsPerPage, paginatingState }) => {

    let pk = entry?.pk;

    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

    const [getFirms, firmsRes] = useLazyQuery(GET_FIRMS);

    const firms = getList(firmsRes?.data) || [];

    useEffect(() => {
        getFirms();
    }, []);

    useEffect(() => {

        if (entry !== undefined) {

            setState({
                firm: entry.firm,
                name: entry.name,
                code: entry.code,
                position: entry.position
            });

        }

    }, [entry?.id]);



    const { handleSubmit, validationMessages, setValidationMessages, mutationLoading } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_FACTORY,
            queryUpdate: UPDATE_FACTORY,
        }
    },
        "Завод",
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
        factorySchema,
        fieldsMessages
    );

    const handleClose = () => {
        close();
        setState(initialState);
        setValidationMessages(fieldsMessages);
    }

    return (
        <SmallDialog title={pk ? "Изменить" : "Создать Завод"} isOpen={isOpen} close={handleClose}>
            <CustomSelector value={state.firm} label="фирма" name="firm" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.firm.length ? true : false}>
                {
                    firms.map(({ node }) =>
                        <MenuItem key={node.pk} value={node.pk} selected={node.pk == state.firm}>{node.name}</MenuItem>
                    )
                }
            </CustomSelector>
            {
                validationMessages.firm.length ? <ValidationMessage>{validationMessages.firm}</ValidationMessage> : null
            }
            <CustomInput value={state.name} name="name" label="Название" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.name.length ? true : false} />
            {
                validationMessages.name.length ? <ValidationMessage>{validationMessages.name}</ValidationMessage> : null
            }
            <CustomInput value={state.code} name="code" label="Код" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.code.length ? true : false} />
            {
                validationMessages.code.length ? <ValidationMessage>{validationMessages.code}</ValidationMessage> : null
            }
            <CustomNumber value={state.position} name="position" label="Позиция" stateChange={e => handleChange({ fElem: e })} fullWidth />
            <Button name={pk ? "сохранить" : "Добавить завод"} color="#5762B2" clickHandler={() => pk ? handleSubmit(state, pk) : handleSubmit(state)} loading={mutationLoading} />
        </SmallDialog>
    );
};

export default React.memo(FactoryCreate, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen;
});