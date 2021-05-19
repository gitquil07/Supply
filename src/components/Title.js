import styled from "styled-components";

export const Title = styled.div`
    color: #474747;
    font-size: ${({ size }) => `${size}px`};
    font-weight: bold;
    margin: 10px 0;

    span {
        color: rgba(0, 0, 0, 0.5);
    }
`;