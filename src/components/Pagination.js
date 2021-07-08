import React from "react";
import styled from "styled-components";
import { SmallSelectForPagination } from "./Inputs/SmallSelectForPagination";
import Arrow from "../assets/icons/arrow-for-pagination.svg";
import moment from "moment";

const isEqualPaginationProps = (prevProps, nextProps) => {
    return (
        prevProps.toDate === nextProps.toDate &&
        prevProps.fromDate === nextProps.fromDate &&
        prevProps.nextPageCursor === nextProps.nextPageCursor &&
        prevProps.prevPageCursor === nextProps.prevPageCursor &&
        prevProps.paginatingState === nextProps.paginatingState &&
        prevProps.setPaginatingState === nextProps.setPaginatingState &&
        prevProps.amountOfElemsPerPage === nextProps.amountOfElemsPerPage &&
        prevProps.type === nextProps.type
    );
}

export const Pagination = React.memo((props) => {
    const {
        toDate,
        fromDate,
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setAmountOfElemsPerPage,
        type
    } = props;


    const nextPage = () => {
        setPaginatingState({
            ...paginatingState,
            direction: "forward"
        });

        const vars = {
            variables: {
                first: amountOfElemsPerPage,
                last: null,
                after: nextPageCursor,
                before: null
            }
        }

        if(type === "dateFilter"){
            vars.variables.fromDate = moment(fromDate).format("YYYY-MM-DD");
            vars.variables.toDate = moment(toDate).format("YYYY-MM-DD");
        }

        getDataPagination(vars);
    }

    const prevPage = () => {
        setPaginatingState({
            ...paginatingState,
            direction: "backward"
        });

        const vars = {
            variables: {
                first: null,
                last: amountOfElemsPerPage,
                after: null,
                before: prevPageCursor
            }
        }


        if(type === "dateFilter"){
            vars.variables.fromDate = moment(fromDate).format("YYYY-MM-DD");
            vars.variables.toDate = moment(toDate).format("YYYY-MM-DD")
        }

        getDataPagination(vars);
    }


    const handleElemsAmountChange = (amount) => {

        setAmountOfElemsPerPage(amount);

            getDataPagination({
                variables: {
                    fromDate: moment().startOf("month").format("YYYY-MM-DD"),
                    toDate: moment(new Date()).format("YYYY-MM-DD"),
                    first: amount,
                    last: null,
                    after: null,
                    before: null
                }
            });
    
    }

    return (
        <Wrapper>
            <span>
                <p>Показывать по: </p> <SmallSelectForPagination value={amountOfElemsPerPage} stateChange={e => handleElemsAmountChange(e.target.value)}/>
            </span>

            <span>
                <button id="leftButton" disabled={!paginatingState.prevPage} onClick={prevPage}><img src={Arrow} alt="arrow" /></button>
                <button id="rightButton" disabled={!paginatingState.nextPage} onClick={nextPage}><img src={Arrow} alt="arrow" /></button>
            </span>
        </Wrapper>
    );
}, isEqualPaginationProps);

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

        button{
            cursor:pointer;
        }

        button[disabled]{
            cursor:auto;
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