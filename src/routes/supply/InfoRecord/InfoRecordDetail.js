import styled from "styled-components";
import { Button } from "../../../components/Buttons";

import { Helmet } from "react-helmet";
import { useTitle } from "../../../hooks";
import { Form } from "../../../components/Form";
import { FlexForHeader } from "../../../components/Flex";


const InfoRecordDetail = ({match}) => {
    
    const { id } = match.params;

    const title = useTitle(`Материал (№${id})`)

    return (
        <>
            <Helmet>
                <title>
                    {title}
                </title>
            </Helmet>
            <Form>
                <FlexForHeader>
                    <Title>
                        Информация о материале
                    </Title>
                    <Button name="Добавить изменения" color="#5762B2"/>
                </FlexForHeader>
            </Form>
        </>
    );
}

const Title = styled.div`
    font-size:18px;

    span {
        color: rgba(0, 0, 0, 0.5);
    }
`;

export default InfoRecordDetail;