import { DatePicker, MuiPickersUtilsProvider } from "@material-ui/pickers";
import moment from "moment";
import Calendar from "../assets/icons/calendar.svg";
import styled from "styled-components";


const CustomPicker = ({ date, stateChange, label }) => {
    return (
        <Wrapper>
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
        </Wrapper>
    )
}

export default CustomPicker;

const Wrapper = styled.div`
    position: relative; 

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