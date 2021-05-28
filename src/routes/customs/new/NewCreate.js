import { Helmet } from "react-helmet";
import { Form } from "components/Form";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomNumber } from "components/Inputs/CustomNumber"
import { CustomSelector } from "components/Inputs/CustomSelector";
import { useTitle } from "hooks";
import { Footer } from "components/Footer";
import { Button } from "components/Buttons";

import { useLazyQuery } from "@apollo/client";
import { UPDATE_CUSTOM, GET_CUSTOM, GET_PLAN } from "./gql";
import { useEffect } from "react";
import MenuItem from "@material-ui/core/MenuItem";
import { useHistory } from "react-router-dom";
import { useCustomMutation, useFormData } from "hooks";
import { exceptKey } from "utils/functions";
import { customModes, modes } from "utils/static";
import { getValueOfProperty } from "utils/functions";
import styled, { css } from "styled-components";
import arrow from "assets/icons/checkmark.svg"
import { BulkUpload } from "components/BulkUpload";

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

const NewCreate = ({ match }) => {

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
            history.push("/customs/new");
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

    useEffect(() => {
        console.log("state", state);
    }, [state]);

    const handleCheckBoxChange = e => {
        let checkedStatuses = state.status.slice(0),
              { value } = e.target;

        if(checkedStatuses.indexOf(value) === -1){
            checkedStatuses.push(value);
        }else{
            let elemAtPosition = checkedStatuses.indexOf(value);
            checkedStatuses.splice(elemAtPosition, 1);
        }

        handleChange({
            fElem: {
                target: {
                    value: checkedStatuses,
                    name: "status" 
                }
            }
        })
    }

    return (
        <>
            <Helmet title={title} />
            <Form>
                <p>Информация о таможне</p>
                <Block>
                    <Row>
                        <CustomInput name="sst" label="Сст" value={state.sst} stateChange={e => handleChange({fElem: e})} width="120px" />
                        <CustomNumber name="registrationAmount" label="Регистрациоый номер" value={state.registrationAmount} stateChange={e => handleChange({fElem: e})}  fullWidth />
                        <CustomSelector name="mode" label="Режим" value={state.mode} stateChange={e => handleChange({fElem: e})}>
                            {
                                modes.map(mode => (
                                    <MenuItem key={mode.value} value={mode.value}>{mode.label}</MenuItem>
                                ))
                            }
                        </CustomSelector>
                    </Row>
                    <Row>
                        <CustomInput name="post" label="Пост" value={state.post} stateChange={e => handleChange({fElem: e})} width="120px"/>
                        <CustomInput name="declarantNote" label="Примечания декларанта" value={state.declarantNote} stateChange={e => handleChange({fElem: e})} />
                        <CustomInput name="contractorNote" label="Примечания подрядчика" value={state.contractorNote} stateChange={e => handleChange({fElem: e})} />
                    </Row>
                </Block>
                <Block flex>
                    {
                        customModes.map(customMode => 
                            <VioletCheckbox key={customMode.label}>
                                <label htmlFor={customMode.label}>{customMode.value}</label><input type="checkbox" id={customMode.label} name="status" value={customMode.value} onChange={e => handleCheckBoxChange(e)} checked={state.status.indexOf(customMode.value) > -1} />
                            </VioletCheckbox>
                        )
                    }
                </Block>
                <BulkUpload query={GET_PLAN} key="planProductTemplate"/>
            </Form>
            <Footer justify="flex-end">
                    <Button name={pk? "Сохранить" : "Создать"} clickHandler={() => handleSubmitData()} /> 
            </Footer>
        </>
    )
}

export default NewCreate;


const Block = styled.div`
    width:100%;
    padding:10px;
    border:1px solid rgba(0, 0, 0, 0.1);
    background:#F6F6FC;
    box-sizing:border-box;
    border-radius:10px;
    margin:20px 0;

    ${({flex}) => {
        return flex? 
        css`
            display:flex;
            column-gap:10px;
        `
        : 
        ""

    }}

    &>div:first-child{
        margin-bottom:10px;
    }
`;

const Row = styled.div`
    display:grid;
    grid-template-columns: 120px 463px auto;
    column-gap:10px;
`;

const VioletCheckbox = styled.span`
    padding:6px;
    background-color:rgba(87, 98, 178, 0.5);
    border-radius:5px;
    color:#fff;
    font-size:14px;
    font-weight:bold;
    display:flex;
    justify-content:space-between;
    width:100%;

    label{
        cursor:pointer;
    }

    input[type="checkbox"]{
        position:relative;
        cursor:pointer;
    }

    input[type="checkbox"]:not(:checked)::before,
    input[type="checkbox"]:checked::before{
      content:"";
      display:inline-block;
      width:13px;
      height:13px;
      border-radius:3px;
      position:absolute;
      top:-2px;
      left:-2px;
      z-index:1;
      border:2px solid #fff;
    }

    input[type="checkbox"]:not(:checked)::before{
      background-color:#A7ACD7;
    }

    input[type="checkbox"]:checked::before{
      background-color:#fff;
      background-image:url(${arrow});
      background-repeat:no-repeat;
      background-position:center;
      background-size:13px;
    }
`;