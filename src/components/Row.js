import styled from "styled-components";

export const Row = styled.p`
    margin:0;
`;

export const RowGray = styled(Row)`
    font-size:12px;
    color:rgba(0, 0, 0, 0.5);
`;

export const TwoRows = ({main, sub}) => {
    return (
        <>
            <Row>{main}</Row>
            <RowGray>{sub}</RowGray>
        </>
    );
}