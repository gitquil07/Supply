import { useQuery } from "@apollo/client";
import { columns } from "./TableData";
import { GET_TRACKING_ARRIVINGS } from "./gql";
import { StyledMUIDataTable } from "../../../components/StyledMUIDataTable";
import { IButton } from "../../../components/IButton";
import { Title } from "../../../compoenents/Title";
import styled from "styled-components";

const TrackingArrivedList = () => {
    const { data } = useQuery(GET_TRACKING_ARRIVINGS);

    const options = {};

    const list = [];

    return (
        <>
            <Header>
                <Title name=""></Title>
                <IButton name=""></IButton>
            </Header>
            <StyledMUIDataTable
                title=""
                data={list}
                columns={columns}
                options={options}/>
        </>
    );

}

export default TrackingArrivedList;
