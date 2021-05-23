import { Helmet } from "react-helmet";
import { AddibleInput } from "components/Flex";
import { Form } from "components/Form";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomNumber } from "components/Inputs/CustomNumber"
import { CustomSelector } from "components/Inputs/CustomSelector";
import { useTitle } from "hooks";
import { Footer } from "components/Footer";
import { Button } from "components/Buttons";

import { useLazyQuery } from "@apollo/client";
import { UPDATE_CUSTOM, GET_CUSTOM } from "./gql";
import { useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { useCustomMutation, useFormData } from "hooks";
import { exceptKey } from "utils/functions";
import { statuses, modes, customModes } from "utils/static";
import { getValueOfProperty } from "utils/functions";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Checkbox from "@material-ui/core/Checkbox";


const initialState = {
    files: [],
    mode: "",
    post: "",
    sst: "",
    registrationAmount: "",
    status: [],
    declarantNote: "",
    contractorNote: "",
};

const CustomCreate = ({ match }) => {

    const title = useTitle("Создание новой таможни"),
          {id} = match.params,
          history = useHistory();

    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

    const { submitData } = useCustomMutation({
            graphQlQuery: {
                queryCreate: UPDATE_CUSTOM,
                queryUpdate: UPDATE_CUSTOM
            }
        },
        "Таможня",
        () => {
            history.push("/supply/customs");
        }
    );

    useEffect(() => {
        console.log("stare", state);
    }, [state])

    const [getCustom, customRes] = useLazyQuery(GET_CUSTOM),
          pk = getValueOfProperty(customRes?.data, "pk");

          console.log("pk", pk);

    useEffect(() => {
        if(id !== undefined){
            getCustom({
                variables: {
                    id
                }
            });
        }
    }, [id]);


    useEffect(() => {
        const custom = customRes.data?.custom?.custom;

        if(custom){
            setState(exceptKey(custom, ["__typename", "pk"]));
        }

    }, [customRes.data?.custom?.custom]);


    const handleSubmitData = () => {
        
        pk? submitData(state, pk) : submitData(state);
        
    }

    return (
        <>
            <Helmet title={title} />
            <Form>
                <p>Информация о таможне</p>
                <AddibleInput>
                    <CustomSelector name="mode" label="Режим" value={state.mode} stateChange={e => handleChange({fElem: e})}>
                        {
                            modes.map(mode => (
                                <MenuItem key={mode.value} value={mode.value}>{mode.label}</MenuItem>
                            ))
                        }
                    </CustomSelector>
                    <CustomInput name="post" label="Пост" value={state.post} stateChange={e => handleChange({fElem: e})} />
                    <CustomInput name="sst" label="Сст" value={state.sst} stateChange={e => handleChange({fElem: e})} />
                    <CustomNumber name="registrationAmount" label="Регистрациоый номер" value={state.registrationAmount} stateChange={e => handleChange({fElem: e})} />
                    <CustomSelector label="статус" value={state.status} name="status" stateChange={e => handleChange({fElem: e})} multiple>
                        {
                            customModes.map(mode => 
                                <MenuItem key={mode.value} value={mode.value}>
                                    <ListItemIcon>
                                        <Checkbox checked={state.status.indexOf(mode.value) > -1}/>
                                    </ListItemIcon>
                                    <ListItemText>{mode.label}</ListItemText>
                                </MenuItem>    
                            )
                        }
                    </CustomSelector>
                    <CustomInput name="declarantNote" label="Примечания декларанта" value={state.declarantNote} stateChange={e => handleChange({fElem: e})} />
                    <CustomInput name="contractorNote" label="Примечания подрядчика" value={state.contractorNote} stateChange={e => handleChange({fElem: e})} />
                </AddibleInput>
            </Form>
            <Footer justify="flex-end">
                    <Button name={pk? "Сохранить" : "Создать"} clickHandler={() => handleSubmitData()} /> 
            </Footer>
        </>
    )
}

export default CustomCreate;
