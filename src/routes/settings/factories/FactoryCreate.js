import React from "react";

import { CREATE_FACTORY, UPDATE_FACTORY } from "./gql";
import { Button } from "../../../components/Buttons";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";

import { useEffect } from "react";
import { useCustomMutation, useFormData } from "../../../hooks";

const initialState = {
    name: "",
    officialName: "",
    code: "",
    position: ""
}

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

    const handleClose = () => {
        close();
        setState(initialState);
    }

    const { submitData } = useCustomMutation({
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
        }
    );

    return (
        <SmallDialog title={pk? "Изменить" : "Создать Завод"} isOpen={isOpen} close={handleClose}>
            <CustomInput value={state.name} name="name" label="Название завода" stateChange={e => handleChange(e)} />
            <CustomInput value={state.officialName} name="officialName" label="Название завода" stateChange={e => handleChange(e)} />
            <CustomInput value={state.code} name="code" label="Код" stateChange={e => handleChange(e)} />
            <CustomNumber value={state.position} name="position" label="Позиция" stateChange={e => handleChange(e)} fullWidth />
            <Button name={pk? "сохранить" : "Добавить завод"} color="#5762B2" clickHandler={() => pk? submitData(state, pk) : submitData(state)}/>
        </SmallDialog>
    );
};

export default React.memo(FactoryCreate, (prevProps, nextProps) => {
           return prevProps.isOpen === nextProps.isOpen;
});