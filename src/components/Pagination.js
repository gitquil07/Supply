import styled from "styled-components";
import { SmallSelectForPagination } from "./Inputs/SmallSelectForPagination";
import Arrow from "../assets/icons/arrow-for-pagination.svg";


export const Pagination = () => {
    return (
        <Wrapper>
            <span>
                <p>Показывать по: </p> <SmallSelectForPagination />
            </span>

            <span>
                <span id="leftButton"><img src={Arrow} alt="arrow" /></span>
                <p>51-100 из 150</p>
                <span id="rightButton"><img src={Arrow} alt="arrow" /></span>
            </span>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: 70px;
    background: #FFFFFF;
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1);
    position: absolute;
    bottom: 0;
    left: 0;
    padding: 0 10px;
    box-sizing: border-box;
    margin-right: 20px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    span:first-child {
        display: flex;
        align-items: center;
    
        p { 
            margin: 0 10px 0 0;
        }
    }

    span:last-child{
        display: flex;
        align-items: center;

        p {
            margin: 0 10px;
        }

        #leftButton {
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            border-radius: 5px;
            padding: 10px;
            transform: rotate(-90deg);
        }

        #rightButton {
            border: 1px solid rgba(0, 0, 0, 0.1);
            box-sizing: border-box;
            border-radius: 5px;
            padding: 10px;
            transform: rotate(90deg);
        }
    }
`;