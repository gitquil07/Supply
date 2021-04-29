import { useState } from "react";
import SmallDialog from "../../../components/SmallDialog";
import { CustomInput } from "../../../components/Inputs/CustomInput";
import { CustomSelector } from "../../../components/Inputs/CustomSelector";

const MaterialsCreate = ({ isOpen, close }) => {
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
        </SmallDialog>
    )
}

export default MaterialsCreate;