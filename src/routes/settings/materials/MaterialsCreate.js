import { useState } from "react";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";

import { useCreate } from "../../../hooks";
import MenuItem from "@material-ui/core/MenuItem";
import { CREATE_MATERIAL } from "./gql";
import { Button } from "../../../components/Buttons";

const initialState = {};

const MaterialsCreate = ({ isOpen, close }) => {

    // const {
    //     state,
    //     handleClose,
    //     handleDataChange,
    //     handleSubmit
    // } = useCreate(initialState, CREATE_MATERIAL, close);

    const [state, setState] = useState({ first_name: "", last_name: "", username: "", password: "" });
    const [brand, setBrand] = useState([]);
    const [factory, setFactory] = useState([]);
    const [report, setReport] = useState([]);

    const inputs = [
        { label: "Имя", name: "first_name" },
        { label: "Фамилия", name: "last_name" },
        { label: "Username", name: "username" },
        { label: "Пароль", name: "password", type: "password" },
    ];

    const changeState = (target) => {
        setState({ ...state, [target.name]: target.value })
    }

    return (
        <SmallDialog title="Создать Материалы" isOpen={isOpen} close={close}>
            {
                inputs.map((e, i) =>
                    <CustomInput
                        key={i}
                        name={e.name}
                        label={e.label}
                        onChange={(e) => changeState(e.target.value)}
                    />
                )
            }

            <CustomSelector label="Бренд" onChange={(value) => setBrand(value)} value={brand} />
            <CustomSelector label="Завод" onChange={(value) => setFactory(value)} value={factory} />
            <CustomSelector label="Отчеты" onChange={(value) => setReport(value)} value={report} />
            {/* <Button label="Добавить материал" color="#5762B2" stateChange={handleSubmit} /> */}
            <Button label="Добавить материал" color="#5762B2" />
        </SmallDialog>
    )
}

export default MaterialsCreate;