
import { MuiPickersUtilsProvider } from "@material-ui/pickers";
import DateFnsUtils from '@date-io/date-fns';
import CustomPicker from "./DatePicker";
import styled from "styled-components";
import { Button } from "./Buttons";
import { CustomHeader } from "./CustomHeader";

const DatePickers = ({ fromDate, toDate, changeFrom, changeTo, buttonClicked }) => {
    return (
        <StyledCustomHeader>
            <Wrapper>
                <Pickers>
                    <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <CustomPicker label="От" date={fromDate} stateChange={date => changeFrom(date)} />
                        <CustomPicker label="До" date={toDate} stateChange={date => changeTo(date)} />
                    </MuiPickersUtilsProvider>
                </Pickers>
                <Button name="Применить" onClick={buttonClicked} />
            </Wrapper>
        </StyledCustomHeader>
    );
};

export default DatePickers;

const Wrapper = styled.div` 
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Pickers = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 20px;
`;

const StyledCustomHeader = styled(CustomHeader)`
    width: 100%;
    margin-right: 10px; 
`;