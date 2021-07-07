import styled from 'styled-components'

export const CustomizableInputs = styled.div`
    gap: 10px;
    display: grid;
    grid-template-columns: ${({ t }) => t};  

    @media(max-width: 1233px){
        grid-template-columns:1fr 1fr;
    }
`;