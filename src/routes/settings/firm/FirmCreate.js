import React, { useEffect } from "react";

import { CREATE_FIRM, UPDATE_FIRM } from "./gql";
import { Button } from "../../../components/Buttons";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";

import { useCustomMutation, useFormData } from "../../../hooks";

const initialState = {
    name: "",
    inn: ""
}

const FirmCreate = ({ isOpen, close, entry, setMutateState, getEntries, amountOfElemsPerPage, paginatingState }) => {

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
                inn: entry.inn
            });

        }

    }, [entry?.id]);

    const handleClose = () => {
        close();
        setState(initialState);
    }

    const { submitData } = useCustomMutation({
            graphQlQuery: {
                queryCreate: CREATE_FIRM,
                queryUpdate: UPDATE_FIRM,
            }
        },
        "Тип транспорта",
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

        console.log("pk", pk);

    return (
        <SmallDialog title={pk? "Изменить" : "Создать фирму"} isOpen={isOpen} close={handleClose}>
            <CustomInput value={state.name} name="name" label="Название фирмы" stateChange={e => handleChange({fElem:e})} />
            <CustomNumber value={state.inn} name="inn" label="Кол-во дней" stateChange={e => handleChange({fElem:e})} fullWidth />
            <Button name={pk? "сохранить" : "Добавить фирму"} color="#5762B2" clickHandler={() => pk? submitData(state, pk) : submitData(state)}/>
        </SmallDialog>
    );
};

export default React.memo(FirmCreate, (prevProps, nextProps) => {
           return prevProps.isOpen === nextProps.isOpen;
});