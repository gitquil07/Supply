import styled from "styled-components";

export const Title = ({ name }) => <Wrapper>{name}</Wrapper>

const Wrapper = styled.div`
    color: #474747;
    font-size: 24px;
    font-weight: 500;
`;