import styled from "styled-components";
import AlertDialog from "../../../components/Dialog";
import { useState } from "react";
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';

const UserCreate = () => {


    const [first_name, setName] = useState("");
    const [last_name, setSurname] = useState("");
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [brand, setBrand] = useState([]);
    const [factory, setFactory] = useState([]);
    const [available_reports, setReport] = useState([]);

    return (
        <AlertDialog dialogTitle="Создать пользователя">
            <Form>
                <div className="inputs">
                    <TextField
                        id="filled-required"
                        label="Имя"
                        variant="filled"
                        onChange={(e) => setName(e.target.value)}
                    />

                    <TextField
                        id="filled-required"
                        label="Фамилия"
                        variant="filled"
                        onChange={(e) => setSurname(e.target.value)}
                    />

                    <TextField
                        id="filled-required"
                        label="Имя Пользователя"
                        variant="filled"
                        onChange={(e) => setUsername(e.target.value)}
                    />

                    <TextField
                        type="password"
                        id="filled-required"
                        label="Пароль"
                        variant="filled"
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <FormControl variant="filled" style={{ width: "220px" }}>
                        <InputLabel id="demo-simple-select-filled-label">Бренд</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(e) => setBrand(e.target.value)}
                            value={brand}
                            multiple
                        // renderValue={(selected) => joinPlease(selected)}
                        >
                            {/* {brands.map((item) => (
                                <MenuItem value={item}>
                                    <ListItemText primary={item.name} />
                                    <Checkbox checked={checkId(item.id, brand)} color="primary" />
                                </MenuItem>
                            ))} */}
                        </Select>
                    </FormControl>

                    <FormControl variant="filled" style={{ width: "220px" }}>
                        <InputLabel id="demo-simple-select-filled-label">Завод</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(e) => setFactory(e.target.value)}
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

                    <FormControl variant="filled" style={{ width: "220px" }}>
                        <InputLabel id="demo-simple-select-filled-label">Available Reports</InputLabel>
                        <Select
                            labelId="demo-simple-select-filled-label"
                            id="demo-simple-select-filled"
                            onChange={(e) => setReport(e.target.value)}
                            value={available_reports}
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

 
    .inputs { 
        display: flex;
        align-items: center; 
        flex-wrap: wrap;
        justify-content: center;  
   
        .MuiFormControl-root {
            width: 220px; 
            margin: 15px 0 0 15px;  
        }
    } 
`;