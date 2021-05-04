import { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { GET_FACTORIES } from "./gql";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { Button } from "../../../components/Buttons";
import MenuItem from "@material-ui/core/MenuItem";
import { CREATE_USER, UPDATE_USER } from "./gql";
import { showNotification } from "../../../utils/functions";

import Checkbox from "@material-ui/core/Checkbox";
import ListItemText from "@material-ui/core/ListItemText";

import { useCreate } from "../../../hooks";
import { init } from "ramda";

const roles = [
    {
        id: 1,
        name: "админ"
    },
    {
        id: 2,
        name: "role_2"
    },
    {
        id: 3,
        name: "role_3"
    }
];

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

const UserCreate = ({ isOpen, close, entry}) => {

    let pk = entry?.pk;

    const [state, setState] = useState(initialState);

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

    // Test
    // useEffect(() => {
    //     console.log("state", state);
    // }, [state]);

    const { data } = useQuery(GET_FACTORIES);

    const inputs = [
        { label: "Имя", name: "firstName" },
        { label: "Фамилия", name: "lastName" },
        { label: "Email", name: "email"},
        { label: "Номер телефона", name: "phoneNumber"},
        { label: "Пароль", name: "password", type: "password" },
    ];

    const handleInputChange = (e) => {
        setState({...state, [e.target.name] : e.target.value});
    }

    const handleMultipleSelect = (e) => {
        setState({...state, factories: [...state.factories, e.target.value]});
    }

    const handleClose = () => {
        close();
        setState(initialState);
    }

    const [ create ] = useMutation(CREATE_USER, {
        onError: (error) => console.log(error),
        onCompleted: (data) => {
            showNotification(data, "account", "userCreate", "Пользователь создан");
            handleClose();
        }
    });

    const [ update ] = useMutation(UPDATE_USER, {
        onError: (error) => console.log(error),
        onCompleted: (data) => {
            showNotification(data, "account", "userUpdate", "Пользователь успешно изменен");
            handleClose();
        }
    });

    const handleSubmit = (pk) => {

        const body = {
            variables : {
                input: {
                    data : state
                }
            }
        };

        if(pk !== undefined){
            body.variables.input.pk = pk;
            update(body);
        }else{
            create(body);
        }

    }

    const factories = data?.factory?.factories?.edges;

    const getFactoryNames = (selects) => {
        let names = [];
        for(let selectPk of selects){
            names.push(factories.find(({node}) => node.pk === selectPk).node.name)
        }

        return names;
    }

    return (
        <SmallDialog title={pk? "Изменить пользователя" : "Создать пользователя"} isOpen={isOpen} close={handleClose}>
            {
                !pk && <CustomInput name="username" value={state.username} label="Username" stateChange={handleInputChange} />
            }
            {
                inputs.map((e, i) =>
                    <CustomInput
                        key={i}
                        value={state[e.name]}
                        name={e.name}
                        label={e.label}
                        stateChange={handleInputChange}
                    />
                )
            }
            
            <CustomSelector label="Роль" name="role" stateChange={(e) => handleInputChange(e)} value={state.role}>
                {
                    roles?.map(role => {
                        return <MenuItem value={role?.id} selected={role.name === role}>{role?.name}</MenuItem>
                    })
                }
            </CustomSelector>
            <CustomSelector 
                multiple 
                label="Завод" 
                name="factories"
                value={state.factories.join(", ")}
                renderValue={(selected) => selected.join(', ')}
                stateChange={(e) => handleMultipleSelect(e)} >
                {
                    factories?.map(factory => (
                        <MenuItem value={factory?.node?.pk}>
                            <Checkbox checked={state.factories?.find(pk => pk === factory?.node?.pk)} />
                            <ListItemText primary={factory.node.name} />
                        </MenuItem>
                    ))
                }
            </CustomSelector>
            {
                getFactoryNames(state.factories).join(", ")
            }
             {/* <Select
                multiple
                native
                value={factoryName}
                onChange={handleChangeMultiple}
                inputProps={{
                    id: 'select-multiple-native',
                }}
                >
                {factories?.map(({node}) => (
                    <option key={node.pk} value={node.pk}>
                        {node.name}
                    </option>
                ))}
                </Select> */}
            <Button name={pk? "Сохранить" :  "Добавить пользователя"} color="#5762B2" clickHandler={() => pk? handleSubmit(pk) : handleSubmit()}/>
        </SmallDialog>
    )
}

export default UserCreate;