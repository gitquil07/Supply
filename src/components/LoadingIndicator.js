import styled from "styled-components";

export const Loading = styled.div`
    padding: 0 13px 0 10px;

    :after {
        content: '.';
        font-size: ${({ fs }) => fs + "px"};
        animation: dots 1s steps(5, end) infinite;
    }

    @keyframes dots {
        20% {
            color: rgba(0,0,0,0);
            text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);}
        40% {
            color: white;
            text-shadow: .25em 0 0 rgba(0,0,0,0), .5em 0 0 rgba(0,0,0,0);}
        60% {
            text-shadow: .25em 0 0 white, .5em 0 0 rgba(0,0,0,0);}
        100% {
            text-shadow: .25em 0 0 white, .5em 0 0 white;}
        }
`;