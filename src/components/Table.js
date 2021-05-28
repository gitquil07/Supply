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

export const TableIII = ({dataset}) => {
    // return (
    //     <Wrapper>
    //         {
    //             dataset.map(({node}) => {
    //                 return <RowIII>
    //                     {
    //                         Object.keys(node).map(key => 
    //                             <div>
    //                                 <span>{node[key]}</span>
    //                             </div>   
    //                         )
    //                     }
    //                 </RowIII>
    //             })
    //         }
    //     </Wrapper>
    // );
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


const RowIII = styled.div`
    height: 40px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    display: grid;
    gap: 10px;
    grid-template-columns: 1fr 1fr 4fr;
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
        margin-left: 5px
    };
`;