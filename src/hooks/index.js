import { useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { onResponseComplete } from "../utils/functions";
import moment from "moment";
import { formatInputPrice } from "utils/functions";

export const useDateRange = (query) => {

    const [fromDate, setFromDate] = useState(moment().startOf('month').toDate()),
        [toDate, setToDate] = useState(new Date());

    const [fetchData, { error, data }] = useLazyQuery(query);

    useEffect(() => {
        fetchData({ variables: { fromDate: moment(fromDate).format("YYYY-MM-DD"), toDate: moment(toDate).format("YYYY-MM-DD") } });
    }, []);

    const handleClick = () => {
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

        handleOpen = () => {
            setOpen(true)
        },
        handleClose = () => setOpen(false);


    return [open, handleClose, handleOpen];

}

export const useGetOne = (data, propName) => {
    const [uniqueVal, setUniqueVal] = useState(undefined);

    const one = data.find(d => d.node[propName] === uniqueVal);

    return {
        one,
        setUniqueVal
    }

}

export const usePagination = ({ type, qraphQlQuery, singular, plural }) => {

    const [fromDateChange, setFromDateChange] = useState(moment().startOf("month").toDate()),
        [toDateChange, setToDateChange] = useState(new Date());

    const [fromDate, setFromDate] = useState(moment().startOf("month").toDate()),
        [toDate, setToDate] = useState(new Date());


    const handleDateApply = () => {
        setFromDate(fromDateChange);
        setToDate(toDateChange);
    }

    const [paginatingState, setPaginatingState] = useState({
        prevPage: null,
        nextPage: null,
        direction: null,
        first: null,
        last: null
    });

    const [mutate, setMutateState] = useState("");
    const [isFirstPage, setIsFirstPage] = useState("");

    const [getDataPagination, dataPaginationRes] = useLazyQuery(qraphQlQuery, {
        fetchPolicy: "no-cache"
    });

    const [amountOfElemsPerPage, setAmountOfElemsPerPage] = useState(100);

    const nextPageCursor = dataPaginationRes?.data?.[singular]?.[plural]?.pageInfo?.endCursor,
        hasNextPage = dataPaginationRes?.data?.[singular]?.[plural]?.pageInfo?.hasNextPage;

    const prevPageCursor = dataPaginationRes?.data?.[singular]?.[plural]?.pageInfo?.startCursor,
        hasPreviousPage = dataPaginationRes?.data?.[singular]?.[plural]?.pageInfo?.hasPreviousPage;



    useEffect(() => {
        const vars = {
            variables: {
                first: amountOfElemsPerPage,
                last: null,
                after: null,
                before: null
            }
        }

        if (type === "dateFilter") {
            vars.variables.fromDate = moment(fromDate).format("YYYY-MM-DD");
            vars.variables.toDate = moment(toDate).format("YYYY-MM-DD");
        }

        getDataPagination(vars);

    }, [fromDate, toDate]);


    useEffect(() => {

        if (paginatingState.prevPage === null && paginatingState.nextPage === null && hasNextPage === true && hasPreviousPage === false) {
            setPaginatingState({
                ...paginatingState,
                direction: "forward",
                nextPage: true,
                prevPage: false,
                last: false,
                first: true
            });
        }

        if ((hasNextPage === true && hasPreviousPage === false && paginatingState.prevPage === false) || (hasNextPage === false && hasPreviousPage === true && paginatingState.nextPage === false)) {
            setPaginatingState({
                ...paginatingState,
                prevPage: true,
                nextPage: true
            });
        }

        if (paginatingState.direction === "forward" && hasNextPage === false && hasPreviousPage === false) {
            setPaginatingState({
                ...paginatingState,
                prevPage: true,
                nextPage: false,
                last: true,
                first: false
            });
        }

        if (paginatingState.direction === "backward" && hasNextPage === false && hasPreviousPage === false) {
            setPaginatingState({
                ...paginatingState,
                prevPage: false,
                nextPage: true,
                first: true,
                last: false
            });
        }

        if (paginatingState.direction === null && hasNextPage === false && hasPreviousPage === false) {
            setPaginatingState({
                ...paginatingState,
                nextPage: false,
                prevPage: false,
                last: false,
                first: true
            });
        }


    }, [hasNextPage, hasPreviousPage]);

    useEffect(() => {
        if (paginatingState.prevPage !== null && paginatingState.nextPage !== null) {
            setPaginatingState({
                ...paginatingState,
                direction: null,
                nextPage: null,
                prevPage: null,
                first: null,
                last: null
            });
        }

    }, [amountOfElemsPerPage]);


    useEffect(() => {
        if (mutate === "create" && ((hasNextPage === true && hasPreviousPage === false) || (hasNextPage === false && hasPreviousPage === false && paginatingState.direction === "forward"))) {
            setPaginatingState({
                ...paginatingState,
                direction: null,
                nextPage: null,
                prevPage: null,
                first: null,
                last: null
            });

            setMutateState("");
        }
    }, [mutate, hasNextPage, hasPreviousPage]);

    useEffect(() => {
        if (isFirstPage && hasNextPage && hasPreviousPage == false) {
            setPaginatingState({
                ...paginatingState,
                direction: null,
                nextPage: null,
                prevPage: null,
                first: null,
                last: null
            });
            setIsFirstPage(false);
        }
    }, [isFirstPage, hasNextPage, hasPreviousPage]);


    return {
        nextPageCursor,
        prevPageCursor,
        paginatingState,
        setPaginatingState,
        amountOfElemsPerPage,
        getDataPagination,
        setMutateState,
        setAmountOfElemsPerPage,
        setIsFirstPage,
        dataPaginationRes,


        // For pages which has date filter
        toDate,
        fromDate,
        fromDateChange,
        setFromDateChange,
        toDateChange,
        setToDateChange,
        handleDateApply
    };

}

export const useFormData = (initialState = {}) => {
    const [state, setState] = useState(initialState);

    const handleChange = ({
        fElem,
        type,
        multiple
    }) => {

        type = type || "input";
        multiple = multiple || false;

        let value = (type == "input") && fElem.target.value;

        switch (type) {
            case "choice":
                value = fElem.target.checked;
                break;
        }

        if (!multiple) {
            setState({ ...state, [fElem.target.name]: value });
        } else {
            setState({
                ...state, [fElem.target.name]: [
                    ...state[fElem.target.name],
                    value
                ]
            })
        }
    }

    const handlePriceChange = (e, name) => {
        setState({
            ...state,
            [name || "price"]: formatInputPrice(e.target.value)
        })
    }

    return {
        state,
        setState,
        handleChange,
        handlePriceChange
    }
}

export const useTemplate = (state, setState, template) => {

    const addTempl = () => {
        const temp = state.slice(0);
        const withId = {id: state.length, ...template}
        temp.push({ ...withId });
        setState(temp);
    }

    const removeTempl = (index) => {
        setState(state.filter((e, idx) => idx !== index))
    }

    return {
        addTempl,
        removeTempl
    }

}

export const useCustomMutation = ({ graphQlQuery: { queryCreate, queryUpdate } }, entityName, callback, validationSchema, fieldsMessages) => {

    const handleError = (error) => NotificationManager.error(error.message);
    const [validationMessages, setValidationMessages] = useState(fieldsMessages);

    const options = {};
    options.onError = handleError;

    const [create, { loading: mutationLoading }] = useMutation(queryCreate, {
        ...options,
        onCompleted: data => {
            onResponseComplete(data, "create", entityName, callback);
        },
    });


    const [update] = useMutation(queryUpdate, {
        ...options,
        onCompleted: data => {
            onResponseComplete(data, "update", entityName, callback);
        }
    });

    const submitData = (data, pk, id) => {
        const options = {
            variables: {
                input: {
                    data
                }
            }
        }

        if (id) {
            options.variables.id = id;
        }

        if (pk !== undefined) {
            options.variables.input.pk = pk;
            update(options);
        } else {
            create(options);
        }

    }

    const handleSubmit = (data, pk, id) => {
        validationSchema.validate(data, {
            abortEarly: false
        })
            .then(val => {
                pk ? submitData(val, pk, id) : submitData(val, id)
            })
            .catch(errObj => {
                const messages = {};
                for (let error of errObj.inner) {
                    messages[error.path] = error.message;
                }
                setValidationMessages({ ...validationMessages, ...messages });
            });
    }

    return {
        validationMessages,
        setValidationMessages,
        handleSubmit,
        submitData,
        mutationLoading
    };

}

export const useSwitchState = (graghQlQuery) => {
    const [ update ] = useMutation(graghQlQuery, {
        onCompleted : data => onResponseComplete(data, "update", "Активность", () => {}),
        onError: error => NotificationManager.error(error.message)
    });
    
    return {
        update
    }
}
