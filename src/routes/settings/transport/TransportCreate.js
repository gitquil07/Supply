import React, { useEffect } from "react";

import { CREATE_TRANSPORT_TYPE, UPDATE_TRANSPORT_TYPE } from "./gql";
import { Button } from "../../../components/Buttons";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";

import { useCustomMutation, useFormData } from "../../../hooks";

const initialState = {
    name: "",
    customDayCount: ""
}

const TransportCreate = ({ isOpen, close, entry, setMutateState, getEntries, amountOfElemsPerPage, paginatingState }) => {

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
                customDayCount: entry.customDayCount
            });

        }

    }, [entry?.id]);

    const handleClose = () => {
        close();
        setState(initialState);
    }

    const { submitData } = useCustomMutation({
            graphQlQuery: {
                queryCreate: CREATE_TRANSPORT_TYPE,
                queryUpdate: UPDATE_TRANSPORT_TYPE,
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
        <SmallDialog title={pk? "Изменить" : "Создать Тип транспорта"} isOpen={isOpen} close={handleClose}>
            <CustomInput value={state.name} name="name" label="Название транспорта" stateChange={e => handleChange({fElem:e})} />
            <CustomNumber value={state.customDayCount} name="customDayCount" label="Кол-во дней" stateChange={e => handleChange({fElem:e})} fullWidth />
            <Button name={pk? "сохранить" : "Добавить транспорт"} color="#5762B2" clickHandler={() => pk? submitData(state, pk) : submitData(state)}/>
        </SmallDialog>
    );
};

export default React.memo(TransportCreate, (prevProps, nextProps) => {
           return prevProps.isOpen === nextProps.isOpen;
});