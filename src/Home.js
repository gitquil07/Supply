import styled from "styled-components"
import Logo from "./assets/logo.png"

export const Home = () => {
    return (
        <Wrapper>

            <div className="container">
                <div className="title">Supply System</div>
                <div className="company">Built by Cyberspace Development Center</div>
                <img alt="logoo" src={Logo} />
            </div>
        </Wrapper>
    );
};

const Wrapper = styled.div`
    width: 100%;
    height: calc(100vh - 180px); 
    display: flex;
    justify-content: center;
    align-items: center;

    .container {
        width: 600px;
        padding: 100px 0;
        text-align: center;
    }

    .title {
        font-size: 50px;
        font-family: 'Lobster', cursive;
        margin-bottom: 20px;
    }

    .company {
        font-size: 12px;
        font-style: italic;
        margin-bottom: 20px;
    }

    img {
        width: 120px;
    }

`;