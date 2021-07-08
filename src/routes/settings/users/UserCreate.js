import React, { useEffect, useMemo } from "react";
import { useLazyQuery } from "@apollo/client";
import { GET_FACTORIES, GET_ROLES } from "./gql";
import SmallDialog from "components/SmallDialog";
import { CustomInput } from "components/Inputs/CustomInput";
import { CustomSelector } from "components/Inputs/CustomSelector";
import { Button } from "components/Buttons";
import MenuItem from "@material-ui/core/MenuItem";
import { CREATE_USER, UPDATE_USER } from "./gql";

import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import { useCustomMutation, useFormData } from "hooks";
import { exceptKey, getList } from "utils/functions";
import { ValidationMessage } from "components/ValidationMessage";
import { userSchema, userSchemaEdit, fieldsMessages } from "./validation";
import { Switch } from "@material-ui/core";


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


const UserCreate = ({ isOpen, close, entry, setMutateState, setIsFirstPage, getEntries, amountOfElemsPerPage, paginatingState }) => {

    let pk = entry?.pk;

    const {
        state,
        setState,
        handleChange
    } = useFormData(initialState);

    useEffect(() => {
        if (entry !== undefined) {
            setState({
                firstName: entry.firstName,
                lastName: entry.lastName,
                username: entry.username,
                password: "",
                role: entry.role,
                email: entry.email,
                phoneNumber: entry.phoneNumber,
                factories: [...entry.factories],
                isActive: entry.isActive
            });

        }
    }, [entry?.id]);


    const [getFactories, getFactoriesRes] = useLazyQuery(GET_FACTORIES),
          [getRoles, getRolesRes] = useLazyQuery(GET_ROLES);

    const factories = useMemo(() => getList(getFactoriesRes?.data), [getFactoriesRes?.data]),
        roles = useMemo(() => getList(getRolesRes?.data), [getRolesRes?.data]);


    useEffect(() => {
        getFactories();
        getRoles();
    }, []);


    const inputs = [
        { label: "Имя", name: "firstName" },
        { label: "Фамилия", name: "lastName" },
        { label: "Email", name: "email" },
        { label: "Номер телефона", name: "phoneNumber" },
        { label: "Пароль", name: "password", type: "password" },
    ];

    const handleClose = () => {
        close();
        setState(initialState);
        setValidationMessages(fieldsMessages);
    }

    const { handleSubmit, validationMessages, setValidationMessages, mutationLoading } = useCustomMutation({
        graphQlQuery: {
            queryCreate: CREATE_USER,
            queryUpdate: UPDATE_USER
        }
    },
        "Пользователь",
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
        pk ? userSchemaEdit : userSchema,
        fieldsMessages
    );

    const beforeSubmit = () => {

        let tmp = { ...state };

        const factoriesPks = [];
        state.factories.forEach(factory => {
            const pk = factories.find(({ node }) => node.name == factory)?.node?.pk;
            factoriesPks.push(pk);
        });

        tmp.factories = factoriesPks;

        tmp.role = roles.find(({ node }) => node.displayName == tmp.role)?.node?.pk;

        tmp = pk ? exceptKey(tmp, ["username"]) : tmp;

        pk ? handleSubmit(tmp, pk) : handleSubmit(tmp);
    }

    return (
        <SmallDialog title={pk ? "Изменить пользователя" : "Создать пользователя"} isOpen={isOpen} close={handleClose}>
            {
                !pk && (
                    <>
                        <CustomInput name="username" value={state.username} label="Username" stateChange={e => handleChange({ fElem: e })} errorVal={validationMessages.username.length ? true : false} />
                        {
                            validationMessages.username.length ? <ValidationMessage>{validationMessages.username}</ValidationMessage> : null
                        }
                    </>
                )
            }
            {
                inputs.map((e, i) => {
                    return <>
                        <CustomInput
                            key={i}
                            value={state[e.name]}
                            name={e.name}
                            label={e.label}
                            stateChange={e => handleChange({ fElem: e })}
                            errorVal={validationMessages[e.name].length ? true : false}
                        />
                        {
                            validationMessages[e.name].length ? <ValidationMessage>{validationMessages[e.name]}</ValidationMessage> : null
                        }
                    </>
                }

                )
            }

            <CustomSelector label="Роль" name="role" stateChange={(e) => handleChange({ fElem: e })} value={state.role}>
                {
                    roles?.map(({ node }) => {
                        return <MenuItem value={node?.displayName} selected={node.displayName == state.role}>{node?.displayName}</MenuItem>
                    })
                }
            </CustomSelector>
            {
                validationMessages.role.length ? <ValidationMessage>{validationMessages.role}</ValidationMessage> : null
            }
            <CustomSelector
                multiple
                label="Завод"
                name="factories"
                value={state.factories}
                stateChange={e => handleChange({ fElem: e })}
                renderValue={selected => {
                    let arr = [];

                    // selected.forEach(pk => {
                    //     arr.push(factories.find(({node}) => node.pk == pk)?.node?.name)
                    // })

                    return selected.join(", ");
                }}
            >
                {
                    factories?.map(({ node }) => (
                        <MenuItem value={node.name}>
                            <ListItemIcon>
                                <Checkbox checked={state.factories.indexOf(node.name) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={node.name} />
                        </MenuItem>
                    ))
                }
            </CustomSelector>
            {
                validationMessages.factories.length ? <ValidationMessage>{validationMessages.factories}</ValidationMessage> : null
            }
            {
                pk?  <label>
                        Активность: 
                        <Switch
                            name="isActive" 
                            checked={state.isActive} 
                            onChange={(e) => handleChange({fElem: e, type: "choice"})} />
                    </label> : null
            }
            <Button name={pk ? "Сохранить" : "Добавить пользователя"} color="#5762B2" clickHandler={beforeSubmit} loading={mutationLoading} />
        </SmallDialog>
    )
}

export default React.memo(UserCreate, (prevProps, nextProps) => {
    return prevProps.isOpen === nextProps.isOpen;
});
