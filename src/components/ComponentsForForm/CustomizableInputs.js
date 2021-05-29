import styled from 'styled-components'

export const CustomizableInputs = styled.div`
    gap: 10px;
    display: grid;
    grid-template-columns: ${({ t }) => t};  
`;