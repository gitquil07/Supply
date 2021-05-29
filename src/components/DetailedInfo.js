import styled from "styled-components";

export const DetailedInfo = ({children}) => {
    return (
        <Detailed>
            {children}
        </Detailed>
    );
}


const Detailed = styled.div`

    fieldset{
        border:none;
        background-color:#F1F1F6;
        margin-bottom:20px;
        border-radius:5px;
        border-bottom:1px solid #5762B2;
        border-left:1px solid #5762B2;

        legend{
            background-color:#5762B2;
            color:#fff;
            padding:5px 10px;
            border-radius:15px;
            margin-left:-5px;
        }

        span{
            display:block;
            margin:5px;
            text-transform:lowercase;
        }
    }
`