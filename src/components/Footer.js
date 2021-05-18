import styled from "styled-components";

export const Footer = ({ children, justify }) => {
    return (
        justify? 
        <Wrapper justify={justify}>
            {children}
        </Wrapper> : <Wrapper>
            {children}
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
    /* justify-content: space-between; */
    justify-content: ${({justify}) => justify? `${justify}` : "space-between"};
    align-items: center;
`;