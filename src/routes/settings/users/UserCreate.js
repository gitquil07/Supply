import React, { useEffect, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_FACTORIES, GET_ROLES } from "./gql";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { Button } from "../../../components/Buttons";
import MenuItem from "@material-ui/core/MenuItem";
import { CREATE_USER, UPDATE_USER } from "./gql";

import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useCustomMutation, useFormData } from "../../../hooks";
import { getList } from "../../../utils/functions";


const initialState = { 
    firstName: "",
    lastName: "",
    username: "",
    password: "",
    role: "",
    email: "",
    phoneNumber: "",
    factories: []
}

const UserCreate = ({ isOpen, close, entry, setMutateState, getEntries, amountOfElemsPerPage, paginatingState}) => {

    let pk = entry?.pk;

    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

    useEffect(() => {
        if(entry !== undefined){
            setState({
                firstName: entry.firstName,
                lastName: entry.lastName,
                password: "",
                role: entry.role,
                email: entry.email,
                phoneNumber: entry.phoneNumber,
                factories: [...entry.factories]
            });

        }
    }, [entry?.id]);


    const [getFactories, getFactoriesRes] = useLazyQuery(GET_FACTORIES),
          [getRoles, getRolesRes] = useLazyQuery(GET_ROLES);

    const factories = useMemo(() => getList(getFactoriesRes?.data), [getFactoriesRes?.data]),
          roles = useMemo(() => getList(getRolesRes?.data), [getRolesRes?.data]);

    const getFactoryNames = (selects) => {
        let names = [];
        for(let selectPk of selects){
            names.push(factories.find(({node}) => node.pk === selectPk)?.node?.name)
        }

        return names;
    }

    useEffect(() => {
        getFactories();
        getRoles();
    }, []);


    const inputs = [
        { label: "Имя", name: "firstName" },
        { label: "Фамилия", name: "lastName" },
        { label: "Email", name: "email"},
        { label: "Номер телефона", name: "phoneNumber"},
        { label: "Пароль", name: "password", type: "password" },
    ];

    const handleClose = () => {
        close();
        setState(initialState);
    }

    const { submitData } = useCustomMutation({
            graphQlQuery: {
                queryCreate: CREATE_USER,
                queryUpdate: UPDATE_USER
            }
        },
        "Пользователь",
        () => {
            handleClose();
            if((paginatingState.nextPage === true && paginatingState.prevPage === true) || (paginatingState.nextPage === false && paginatingState.prevPage === true)){
                setMutateState("createOrUpdate");
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
        <SmallDialog title={pk? "Изменить пользователя" : "Создать пользователя"} isOpen={isOpen} close={handleClose}>
            {
                !pk && <CustomInput name="username" value={state.username} label="Username" stateChange={e => handleChange({fElem: e})} />
            }
            {
                inputs.map((e, i) =>
                    <CustomInput
                        key={i}
                        value={state[e.name]}
                        name={e.name}
                        label={e.label}
                        stateChange={e => handleChange({fElem: e})}
                    />
                )
            }
            
            <CustomSelector label="Роль" name="role" stateChange={(e) => handleChange({fElem: e})} value={state.role}>
                {
                    roles?.map(({node}) => {
                        return <MenuItem value={node?.pk} selected={node.displayName == state.role}>{node?.displayName}</MenuItem>
                    })
                }
            </CustomSelector>
            <CustomSelector 
                multiple 
                label="Завод" 
                name="factories"
                value={state.factories}
                stateChange={e => handleChange({fElem: e})} >
                {
                    factories?.map(({node}) => (
                        <MenuItem value={node.pk}>
                            <ListItemIcon>
                                <Checkbox checked={state.factories.indexOf(node.pk) > -1}/>
                            </ListItemIcon>
                            <ListItemText primary={node.name} />
                        </MenuItem>
                    ))
                }
            </CustomSelector>
            {
                getFactoryNames(state.factories).join(", ")
            }
            <Button name={pk? "Сохранить" :  "Добавить пользователя"} color="#5762B2" clickHandler={() => pk? submitData(state, pk) : submitData(state)}/>
        </SmallDialog>
    )
}

export default React.memo(UserCreate, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen;
});
