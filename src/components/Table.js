import styled from "styled-components";

export const Table = () => {
    return (
        <Wrapper>
            <Row>
                <span id="property">Завод:</span>
                <span id="value">Завод</span>
            </Row>

            <Row>
                <span id="property">Завод:</span>
                <span id="value">Завод</span>
            </Row>

            <Row>
                <span id="property">Завод:</span>
                <span id="value">Завод</span>
            </Row>
            <Row>
                <span id="property">Завод:</span>
                <span id="value">Завод</span>
            </Row>
            <Row>
                <span id="property">Завод:</span>
                <span id="value">Завод</span>
            </Row>
            <Row>
                <span id="property">Завод:</span>
                <span id="value">Завод</span>
            </Row>
        </Wrapper>
    );
};


const Wrapper = styled.div`
    width: 100%;
    height: 100%;
    background: #FFFFFF;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 0 5px;
`;

const Row = styled.div`
    height: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 10px;

    :last-child {
        border: none;
    }

    #property {
        color: rgba(0, 0, 0, 0.8);
    };

    #value {
        color: rgba(0, 0, 0, 0.5);
    };
`;
