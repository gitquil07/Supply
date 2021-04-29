import { useState, useEffect } from "react";

// import { useMutation } from "@apollo/client";
import { CREATE_FACTORY } from "./gql";
import { Button } from "../../../components/Buttons";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomNumber } from "../../../components/Inputs/CustomNumber";

import { useCreate } from "../../../hooks";

const initialState = {
    name: "",
    officialName: "",
    code: "",
    position: ""
}

const FactoryCreate = ({ isOpen, close }) => {

    const {
        state,
        handleClose,
        handleInputChange,
        handleSubmit
    } = useCreate(initialState, CREATE_FACTORY, close);

    // const [state, setState] = useState(initialState);

    // const [ create ] = useMutation(CREATE_FACTORY, {
    //     onError: (error) => console.log(error)
    // });

    // const handleInputChange = (e) => {
    //     setState({...state, [e.target.name] : e.target.value});
    // }

    // const handleClose = () => {
    //     close();
    //     setState(initialState);
    // }

    // const handleSubmit = () => {
    //     create({
    //         variables: {
    //             input: {
    //                 data : state
    //             }
    //         }
    //     })
    // }

    useEffect(() => {
        console.log(state);
    }, [state]);

    return (
        <SmallDialog title="Создать Заводы" isOpen={isOpen} close={handleClose}>
            <CustomInput value={state.name} name="name" label="Название завода" stateChange={handleInputChange} />
            <CustomInput value={state.officialName} name="officialName" label="Название завода" stateChange={handleInputChange} />
            <CustomInput value={state.code} name="code" label="Код" stateChange={handleInputChange} />
            <CustomNumber value={state.position} name="position" label="Позиция" stateChange={handleInputChange} fullWidth />
            <Button name="Добавить завод" color="#5762B2" clickHandler={handleSubmit}/>
        </SmallDialog>
    );
};

export default FactoryCreate;