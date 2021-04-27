import styled from "styled-components";
import { Arrows } from "./Arrows";
import { FlexForHeader } from "./Flex"

export const ExpandableContainer = ({ expand, index, title, children }) => {
    return (
        <Wrapper expand={expand}>
            <FlexForHeader p="0 0 30px 0">
                <Title>{title}</Title>
                <Expand onClick={() => expand(index)}><Arrows open={expand} /> Свернуть</Expand>
            </FlexForHeader>

            {children}
        </Wrapper>
    )
};

const Wrapper = styled.div`
    background: #F6F6FC;
    border: 1px solid rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    border-radius: 5px;
    padding: 20px;
    margin-bottom: 20px;
    overflow: hidden;
    max-height: ${({ expand }) => expand ? "1000px" : "72px"};
    transition:  max-height 0.3s ease-in;    
`;

const Expand = styled.div`
    color: #5762B2;
    cursor: pointer;
`;

const Title = styled.div`
    font-size:18px;

    span {
        color: rgba(0, 0, 0, 0.5);
    }
`;
