import styled from "styled-components";

export const DisabledInput = ({ name, value }) => {
    return (
        <Wrapper>
            <span id="property">{name}</span>
            <span id="value">{value}</span>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    height: 56px;
    display: flex;
    flex-direction: column;
    width: 100%;
    justify-content: center;


    #value {
        color: rgba(0, 0, 0, 0.5);
        margin-top: 5px;
    }
`;