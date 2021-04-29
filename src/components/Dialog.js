import React from 'react';
import styled from "styled-components";
import Slide from '@material-ui/core/Slide';
import { useHistory } from "react-router-dom";
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

const AlertDialog = ({ dialogTitle, children, clickYes, }) => {
    let history = useHistory();

    return (
        <StyledDialog
            open={true}
            TransitionComponent={Transition}
            keepMounted
            fullWidth={true}
            maxWidth={'md'}
        >
            <DialogTitle>{dialogTitle}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {children}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={() => history.goBack()} color="primary">Отмена</Button>
                <Button onClick={clickYes} color="primary" autoFocus>Создавать</Button>
            </DialogActions>
        </StyledDialog>
    );
};

export default AlertDialog;

const StyledDialog = styled(Dialog)``;
