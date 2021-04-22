
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import CustomPicker from "./DatePicker";
import styled from "styled-components";

const DatePickers = ({ fromDate, toDate, changeFrom, changeTo }) => {
    return (
        <Wrapper>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <CustomPicker label="От" date={fromDate} stateChange={date => changeFrom(date)} />
                <CustomPicker label="До" date={toDate} stateChange={date => changeTo(date)} />
            </MuiPickersUtilsProvider>
        </Wrapper>
    );
};

export default DatePickers;

const Wrapper = styled.div` 
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;