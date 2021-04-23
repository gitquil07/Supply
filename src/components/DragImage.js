import styled from "styled-components";
import { Button } from "./Buttons";

export const DragImage = () => {
    return (
        <Wrapper>
            <span>Перащите файл или выберите</span>
            <Button name="Выбрать файл" color="#5762B2" />
        </Wrapper>
    )
}

const Wrapper = styled.div`
    width: 100%;
    height: 150px;
    background: #F6F6FC;
    border: 1px dashed #5762B2;
    box-sizing: border-box;
    border-radius: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: #F6F6FC;

    span {
        font-size: 18px;
        color: rgba(0, 0, 0, 0.5);
        margin-right: 10px;
    }
`;