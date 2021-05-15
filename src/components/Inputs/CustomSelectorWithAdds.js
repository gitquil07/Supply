import { useState, useEffect } from "react";
import styled from "styled-components";
import editIcon from "../../assets/icons/edit.svg";

const CustomSelectorWithAdds = ({ value, children, handleOpen }) => {

    const [openState, setOpenState] = useState(false);

    return (
        <SelectorWrapper>
            <SelectWithAdds>
                <legend>Номер заявки</legend>
                <span className="selected">{value}</span>
                <div className="actions">
                    <button className="dropOptionsBtn" onClick={() => setOpenState(!openState)}></button>
                    <button className="addOptionsBtn" onClick={() => handleOpen()}>
                        <span className="circle"></span>
                    </button>
                </div>
            </SelectWithAdds>
            {
                openState && <DropContainer>
                    {children}
            </DropContainer>
            }
        </SelectorWrapper>
    );
}

export const SelectorBody = ({ value, stateChange, selected }) => {
    return (
        <>
            <SelectOptions onClick={() => stateChange(value)}>
                {
                    selected?  <>
                        <span className="itemText itemText__selected">{value}</span>
                        <div className="selected">
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M16.25 5L7.5 15L3.75 11.25" stroke="#5762B2" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                                <path d="M9.16675 3.33325H3.33341C2.89139 3.33325 2.46746 3.50885 2.1549 3.82141C1.84234 4.13397 1.66675 4.55789 1.66675 4.99992V16.6666C1.66675 17.1086 1.84234 17.5325 2.1549 17.8451C2.46746 18.1577 2.89139 18.3333 3.33341 18.3333H15.0001C15.4421 18.3333 15.866 18.1577 16.1786 17.8451C16.4912 17.5325 16.6667 17.1086 16.6667 16.6666V10.8333" stroke="#808080" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                                <path d="M15.4167 2.08344C15.7483 1.75192 16.1979 1.56567 16.6667 1.56567C17.1356 1.56567 17.5852 1.75192 17.9167 2.08344C18.2483 2.41496 18.4345 2.8646 18.4345 3.33344C18.4345 3.80228 18.2483 4.25192 17.9167 4.58344L10.0001 12.5001L6.66675 13.3334L7.50008 10.0001L15.4167 2.08344Z" stroke="#808080" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            </svg>
                        </div>
                    </> : <>
                        <span className="itemText">{value}</span>
                        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M9.16675 3.33325H3.33341C2.89139 3.33325 2.46746 3.50885 2.1549 3.82141C1.84234 4.13397 1.66675 4.55789 1.66675 4.99992V16.6666C1.66675 17.1086 1.84234 17.5325 2.1549 17.8451C2.46746 18.1577 2.89139 18.3333 3.33341 18.3333H15.0001C15.4421 18.3333 15.866 18.1577 16.1786 17.8451C16.4912 17.5325 16.6667 17.1086 16.6667 16.6666V10.8333" stroke="#808080" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                            <path d="M15.4167 2.08344C15.7483 1.75192 16.1979 1.56567 16.6667 1.56567C17.1356 1.56567 17.5852 1.75192 17.9167 2.08344C18.2483 2.41496 18.4345 2.8646 18.4345 3.33344C18.4345 3.80228 18.2483 4.25192 17.9167 4.58344L10.0001 12.5001L6.66675 13.3334L7.50008 10.0001L15.4167 2.08344Z" stroke="#808080" stroke-opacity="0.8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </>
                }
            </SelectOptions>
        </>
    );

}

export default CustomSelectorWithAdds;


const SelectorWrapper = styled.div`
    max-width:357px;
    min-width:285px;
    height:52px;
    position:relative;
`;


const DropContainer = styled.div`
    background-color:#fff;
    border-radius:5px;
    padding:15px 10px;
    z-index:901;
    position:absolute;
    top:62px;
    width:100%;
    left:0;
    right:0;
    margin:0 auto;
    box-sizing:border-box;
    font-size:18px;
    color:rgba(0, 0, 0, 0.5);
    display:flex;
    flex-direction:column;
    gap:20px;
    box-shadow:0 2px 5px rgba(0, 0, 0, 0.2);
    max-height:300px;
    overflow-y:auto;

    ::-webkit-scrollbar {
        width: 10px;
    }

    /* Track */
    ::-webkit-scrollbar-track {
        background: #E5E5E5; 
        border-radius:5px;
    }
    
    /* Handle */
    ::-webkit-scrollbar-thumb {
        background: #9EA3CB; 
        border-radius:5px;
    }
`;


const SelectOptions = styled.div`
    display:flex;
    justify-content:space-between;
   
   .itemText,
    svg path{
        transition:all .2s linear;
    }
    
    &:hover .itemText{
        color:#000;
    }

    &:hover svg path:first-child{
        stroke:#000;
    }

    &:hover svg path:last-child{
        stroke:#000;
    }


    .selected{
        svg:first-child{
            margin-right:15px;
        }
        svg path{
            stroke:#5762B2;
        }
    }

    .itemText__selected{
        color:#5762B2;
    }

`;

const SelectWithAdds = styled.div`
    display:flex;
    padding:5px 8px 8px 8px;
    justify-content:space-between;
    align-items:center;
    border-radius:5px;
    border-color:#E6E6E6;
    border-style:solid;
    border-width:1px;
    border-radius:5px;
    box-sizing:border-box;
    background-color:#fff;
    margin:0;
    height:52px;

    legend{
        color: rgba(0, 0, 0, 0.5);
        font-size:12px;
    }

    .selected{
        font-size:18px;
    }

    .actions{
        display:flex;
        align-items:center;
    }

    .dropOptionsBtn,
    .addOptionsBtn{
        border:none;
    }

    .dropOptionsBtn:focus,
    .addOptionsBtn:focus{
        outline:none;
    }

    .dropOptionsBtn{
        width:25px;
        height:20px;
        position:relative;
        background:none;
        cursor:pointer;
        margin-right:5px;

        &::after,
        &::before{
            content:"";
            background-color:#5762B2;
            width:10px;
            height:1.5px;
            position:absolute;
        }


        &::after{
            top:6px;
            left:7px;
            transform-origin:0 0;
            transform: rotate(40deg);
        }

        &::before{
            top:8px;
            right:4px;
            transform-origin:7px 0;
            transform: rotate(-40deg);
        }

    }   

    .addOptionsBtn{
        background-color: rgba(87, 98, 178, 0.5);
        display:flex;
        justify-content:center;
        align-items:center;
        border-radius:5px;
        cursor:pointer;
        padding:5px;

        .circle{
            width:22px;
            height:22px;
            border-radius:50%;
            border:2px solid #fff;
            box-sizing:border-box;
            position:relative;

            &::after,
            &::before{
                content:"";
                background-color:#fff;
                position:absolute;
                margin:0 auto;
                left:0;
                right:0;
            }

            &::after{
                width:10px;
                height:2px;
                top:calc(50% - 1px);
            }

            &::before{
                width:2px;
                height:10px;
                top:calc(50% - 5px);
            }
        }
    }
`;



