import { useState } from "react";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";
import { Button } from "../../../components/Buttons";
import MenuItem from "@material-ui/core/MenuItem";
import { CREATE_USER } from "./gql";

import { useCreate } from "../../../hooks";

const roles = [
    {
        id: 0,
        name: "role_1"
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
    first_name: "",
    last_name: "",
    username: "",
    password: "",
    role: "",
    email: "",
    phoneNumber: "",
    factory: ""
}

const UserCreate = ({ isOpen, close }) => {
    
    const {
        state,
        handleClose,
        handleInputChange,
        handleSubmit,
    } = useCreate(initialState, CREATE_USER, close);

    const factories = [];
    
    const inputs = [
        { label: "Имя", name: "first_name" },
        { label: "Фамилия", name: "last_name" },
        { label: "Username", name: "username" },
        { label: "Email", name: "email"},
        { label: "Номер телефона", name: "phoneNumber"},
        { label: "Пароль", name: "password", type: "password" },
    ];

    // const [ create ] = useMutation();

    // const [state, setState] = useState(initialState);

    // const handleClose = () => {
    //     close();
    //     setState(initialState);
    // }

    // const handleInputChange = (e) => {
    //     setState({...state, [e.target.name] : e.target.value});
    // }

    // const handleSubmit = () => {
    //     create({
    //         variables: {
    //             input: {
    //                 data: state
    //             }
    //         }
    //     });
    // }

    return (
        <SmallDialog title="Создать пользователя" isOpen={isOpen} close={handleClose}>
            {
                inputs.map((e, i) =>
                    <CustomInput
                        key={i}
                        name={e.name}
                        label={e.label}
                        onChange={handleInputChange}
                    />
                )
            }

            <CustomSelector label="Роль" stateChange={(e) => handleInputChange(e)} value={state.role}>
                {
                    roles.map(role => {
                        return <MenuItem value={role.id}>{role.name}</MenuItem>
                    })
                }
            </CustomSelector>
            <CustomSelector label="Завод" stateChange={(e) => handleInputChange(e)} value={state.factory}>
                {
                    factories.map(factory => {
                        return <MenuItem value={factory.pk}>{factory.name}</MenuItem>
                    })
                }
            </CustomSelector>
            <Button name="Добавить пользователя" color="#5762B2" clickHandler={handleSubmit}/>
        </SmallDialog>
    )
}

export default UserCreate;