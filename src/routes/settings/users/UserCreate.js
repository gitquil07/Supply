import styled from "styled-components";
import AlertDialog from "../../../components/Dialog";
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';

const UserCreate = () => {
    const [state, setState] = useState({ first_name: "", last_name: "", username: "", password: "" });
    const [brand, setBrand] = useState([]);
    const [factory, setFactory] = useState([]);
    const [report, setReport] = useState([]);

    const inputs = [
        { label: "Имя", name: "first_name" },
        { label: "Фамилия", name: "last_name" },
        { label: "Имя Пользователя", name: "username" },
        { label: "Пароль", name: "password", type: "password" },
    ];

    const changeState = (target) => {
        setState({ ...state, [target.name]: target.value })
    }

    return (
        <AlertDialog dialogTitle="Создать пользователя">
            <Form>
                <div className="inputs">

                    {
                        inputs.map((e, i) =>
                            <TextField
                                key={i}
                                name={e.name}
                                label={e.label}
                                type={e.type ? e.type : "text"}
                                variant="filled"
                                onChange={({ target }) => changeState(target)}
                            />
                        )
                    }

                    <FormControl variant="filled">
                        <InputLabel id="demo-simple-select-filled-label">Бренд</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={({ target }) => setBrand(target.value)}
                            value={brand}
                            multiple
                        // renderValue={(selected) => joinPlease(selected)}
                        >
                            {/* {brands.map((item) => (
                                <MenuItem value={item}>
                                    <ListItemText primary={item.name}
                                    <Checkbox checked={checkId(item.id, brand)} color="primary" />
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>

                    <FormControl variant="filled">
                        <InputLabel id="demo-simple-select-filled-label">Завод</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(target) => setFactory(target.value)}
                            value={factory}
                            multiple
                        // renderValue={(selected) => joinPlease(selected)}
                        >
                            {/* {factories.map((item) => (
                                <MenuItem value={item}>
                                    <ListItemText primary={item.name} />
                                    <Checkbox checked={checkId(item.id, factory)} color="primary" />
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>

                    <FormControl variant="filled">
                        <InputLabel id="demo-simple-select-filled-label">Available Reports</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(target) => setReport(target.value)}
                            value={report}
                            multiple
                        // renderValue={(selected) => joinPlease(selected)}
                        >
                            {/* {reports.map((item) => (
                                <MenuItem value={item}>
                                    <ListItemText primary={item.name} />
                                    <Checkbox checked={checkId(item.id, available_reports)} color="primary" />
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>
                </div>
            </Form>
        </AlertDialog>
    )
}

export default UserCreate;


const Form = styled.div`
    width: 100%;  
    padding: 50px;
    box-sizing: border-box;
 
    .inputs { 
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr)); 
        gap: 20px;
    } 
`;