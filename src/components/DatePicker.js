import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import DateFnsUtils from '@date-io/date-fns';
import Calendar from "../assets/icons/calendar.svg";
import styled from "styled-components";


const CustomPicker = ({ date, stateChange, label }) => {
    return (
        <Wrapper>
            <MuiPickersUtilsProvider utils={DateFnsUtils}>
                <img src={Calendar} alt="calendar" />
                <DatePicker
                    format={moment(date).format("DD.MM.YYYY")}
                    autoOk
                    variant="inline"
                    inputVariant="outlined"
                    label={label}
                    value={date}
                    onChange={date => stateChange(date)}
                />
            </MuiPickersUtilsProvider>
        </Wrapper>
    )
}

export default CustomPicker;

const Wrapper = styled.div`
    position: relative; 
    min-width: 160px;
    max-width: 160px;

    img {
        position: absolute;
        top: 50%;
        right: 20px;
        transform: translate(0, -50%);
    }

    .PrivateNotchedOutline-root-1 {
        border: 1px solid rgba(0, 0, 0, 0.1); 
    }

    /* 1px solid rgba(0, 0, 0, 0.1); */
`;