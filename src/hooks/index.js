import { useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

export const useDateRange = (query) => {

    const [fromDate, setFromDate] = useState(moment().startOf('month').toDate()),
        [toDate, setToDate] = useState(new Date());

    const [fetchData, { error, data }] = useLazyQuery(query);

    useEffect(() => {
        fetchData({ variables: { fromDate: moment(fromDate).format("YYYY-MM-DD"), toDate: moment(toDate).format("YYYY-MM-DD") } });
    }, []);

    const handleClick = () => {
        console.log("button clicked");
        fetchData({ variables: { fromDate: moment(fromDate).format("YYYY-MM-DD"), toDate: moment(toDate).format("YYYY-MM-DD") } });
    }

    return {
        fromDate,
        setFromDate,
        toDate,
        setToDate,
        handleClick,
        error,
        data
    }

}

export const useTitle = (title_to_set) => {

    const dispatch = useDispatch(),
        title_to_get = useSelector(state => state.title);

    useEffect(() => {
        dispatch({ type: "CHANGE_TITLE", payload: title_to_set })
    }, [dispatch]);

    return title_to_get;

}

export const useToggleDialog = () => {
    const [open, setOpen] = useState(false),

        handleOpen = () => setOpen(true),
        handleClose = () => setOpen(false);


    return [open, handleClose, handleOpen];

}

export const useCreate = (initialState, gql, close) => {
    const [state, setState] = useState(initialState);

    const [ create ] = useMutation(gql, {
              onError: error => console.log(error)
          });

    const handleClose = () => {
        close();
        setState(initialState);
    } 

    const handleInputChange = e => {
        setState({...state, [e.target.name] : e.target.value});
    }

    const handleSubmit = () => {
        create({
            variables: {
                input: {
                    data: state
                }
            }
        })
    }

    return {
        state,
        handleClose,
        handleInputChange,
        handleSubmit
    }

}
