import styled from "styled-components";
import { Title } from "./Title";


export const InfoContainer = ({ title, children }) => {
    return (
        <Wrapper>
            <Title name={title} />
            <main>
                {children}
            </main>
        </Wrapper>
    )
}


const Wrapper = styled.div`
    box-shadow: 0px 10px 50px rgba(0, 0, 0, 0.1) !important;
    border-radius: 10px;
    padding: 50px;

    main {
        margin-top: 50px;
    }
`;