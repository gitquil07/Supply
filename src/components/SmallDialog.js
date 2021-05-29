import styled from "styled-components";

import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import { default as CButton} from '@material-ui/core/Button';
import CloseIcon from "@material-ui/icons/Close";

 const SmallDialog = ({title, close, isOpen, children}) => {
    return (

            <StyledDialog onClose={close} open={isOpen} >
                <RequestTitle>
                    {title}
                    <CloseButton onClick={close}>
                        <CloseIconLight />
                    </CloseButton>
                </RequestTitle>
                    <Inputs>
                        { children }
                    </Inputs>
            </StyledDialog>

    );

 }

 export default SmallDialog;
 
 const StyledDialog = styled(Dialog)`
    .MuiDialog-paperWidthSm{
        width:400px !important;
        padding:10px;
        box-sizing:border-box;
        border-radius:10px;

        ::-webkit-scrollbar{
            width:10px;
        }   

        ::-webkit-scrollbar-thumb{
            border-radius:5px;
            background:#5762B2;
        }

        ::-webkit-scrollbar-track{
            background:#f1f1f1;
            border-top-right-radius:5px;
            border-bottom-right-radius:5px;
        }
        

        .MuiDialogTitle-root{
            padding: 0;
        }
    }

    .MuiBackdrop-root{
        background: rgba(0, 0, 0, 0.4);
        backdrop-filter: blur(10px);
    }
`;

const CloseButton = styled(CButton)`
    width:40px;
    height:40px;
    min-width:40px !important;
    background-color:#5762B2 !important;
`;

const RequestTitle = styled(DialogTitle)`
    h2{
        display:flex;
        align-items:center;
        justify-content:space-between;
        margin-bottom:10px;
    }
`;

const CloseIconLight = styled(CloseIcon)`
    color: white; 
`;


const Inputs = styled.div`
    display: flex;
    flex-direction: column;
    gap: 10px;
    padding: 10px 0 10px 0;
`;