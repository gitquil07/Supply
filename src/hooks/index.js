import { useLazyQuery, useMutation } from "@apollo/client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { NotificationManager } from "react-notifications";
import { onResponseComplete } from "../utils/functions";
import moment from "moment";
import { ValidationMessage } from "components/ValidationMessage";

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

export const useGetOne = (data, propName) => {
    const [uniqueVal, setUniqueVal] = useState(undefined);

    const one = data.find(d => d.node[propName] === uniqueVal);

    return {
        one,
        setUniqueVal
    }

}

export const usePagination = ({type, qraphQlQuery, singular, plural}) => {

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

    const [ getDataPagination, dataPaginationRes] = useLazyQuery(qraphQlQuery, {
        fetchPolicy: "no-cache"
    });

    const [amountOfElemsPerPage, setAmountOfElemsPerPage] = useState(30);
    
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

        if(type === "dateFilter"){
            vars.variables.fromDate = moment(fromDate).format("YYYY-MM-DD");
            vars.variables.toDate = moment(toDate).format("YYYY-MM-DD");
        }

        console.log("vars", vars);

        getDataPagination(vars);

    }, [fromDate, toDate]);

    console.log("---------------- component rendered --------------------");

    useEffect(() => {

        console.log("useEffect 1 called --------------------------------------------------------------");

        if(paginatingState.prevPage === null && paginatingState.nextPage === null && hasNextPage == true && hasPreviousPage == false){
            console.log("here first condition");
            setPaginatingState({
                ...paginatingState,
                direction: "forward",
                nextPage: true,
                prevPage: false,
                last: false,
                first: true
            });
        }

        if((hasNextPage === true && hasPreviousPage === false && paginatingState.prevPage === false) || (hasNextPage === false && hasPreviousPage == true && paginatingState.nextPage === false)){
            console.log("here second condition");
            setPaginatingState({
                ...paginatingState,
                prevPage: true,
                nextPage: true
            });
        }

        if(paginatingState.direction == "forward" && hasNextPage === false && hasPreviousPage === false){
            console.log("here third condition");
            setPaginatingState({
                ...paginatingState,
                prevPage: true,
                nextPage:  false,
                last: true,
                first: false
            });
        }

        if(paginatingState.direction === "backward" && hasNextPage === false && hasPreviousPage === false){
            console.log("here fourth condition");
            setPaginatingState({
                ...paginatingState,
                prevPage: false,
                nextPage: true,
                first: true,
                last: false
            });
        }

        if(paginatingState.direction === null && hasNextPage === false && hasPreviousPage === false){
            setPaginatingState({
                ...paginatingState,
                nextPage: false,
                prevPage: false,
                last: false,
                first: true
            });
        }

        console.log("useEffect 1 finished --------------------------------------------------");

    }, [hasNextPage, hasPreviousPage]);


    useEffect(() => {
        console.log("useEffect 2 called -----------------------------------------");
        console.log("paginatingState", paginatingState);
        console.log("useEffect 2 finished ---------------------------------------");
    }, [paginatingState]);

    useEffect(() => {
        console.log("useEffect 3 called --------------------------------------------");

        if(paginatingState.prevPage !== null && paginatingState.nextPage !== null){
            console.log("condition paginatingState");
            setPaginatingState({
                ...paginatingState,
                direction: null,
                nextPage: null,
                prevPage: null,
                first: null,
                last: null
            });
        }

        console.log("useEffect 3 finished ----------------------------------------")
    }, [amountOfElemsPerPage]);


    useEffect(() => {
        console.log("useEffect 4 called --------------------------------------------");
        console.log("hasNextPage", hasNextPage);
        console.log("hasPreviousPage", hasPreviousPage);
        console.log("mutate", mutate);
        if(mutate === "create" && ((hasNextPage === true && hasPreviousPage === false) || (hasNextPage === false && hasPreviousPage === false && paginatingState.direction === "forward"))){
            console.log("inside condition");
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
        console.log("useEffect 4 finished------------------------------------------------");
    }, [mutate, hasNextPage, hasPreviousPage]);

    useEffect(() => {
        if(isFirstPage && hasNextPage && hasPreviousPage == false){
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

        switch(type){
            case "choice":
                value = fElem.target.checked;
                break;    
        }

        if(!multiple){
            setState({...state, [fElem.target.name] : value});
        }else{
            setState({...state, [fElem.target.name] : [
                ...state[fElem.target.name],
                value
            ]})
        }
    }

    return {
        state,
        setState,
        handleChange
    }
}

export const useTemplate = (state, setState, template) => {

    const addTempl = () => {
        const temp = state.slice(0);
        temp.push({...template});
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

export const useCustomMutation = ({graphQlQuery: {queryCreate, queryUpdate}}, entityName, callback, validationSchema, fieldsMessages) => {

    const handleError = (error) => NotificationManager.error(error.message);
    const [validationMessages, setValidationMessages] = useState(fieldsMessages);

    const options = {};
          options.onError = handleError;

    const [create] = useMutation(queryCreate, {
        ...options,
        onCompleted: data => {
            onResponseComplete(data, "create", entityName, callback);
        }
    });


    const [update] = useMutation(queryUpdate, {
        ...options,
        onCompleted: data => {
            onResponseComplete(data, "update", entityName, callback);
        }
    }); 

    const submitData = (data, pk, id) => {
        console.log("submit data pk", pk);
        const options = {
            variables: {
                input: {
                    data
                }
            }
        }

        if(id){
            options.variables.id = id;
        }

        if(pk !== undefined){
            options.variables.input.pk = pk;
            update(options);
        }else{
            create(options);
        }

    }

    const handleSubmit = (data, pk, id) => {
        validationSchema.validate(data, {
            abortEarly: false
        })
        .then(val => {
            pk? submitData(val, pk, id) : submitData(val, id)
        })
        .catch(errObj => {
            const messages = {};
            for(let error of errObj.inner){
                console.log(error);
                messages[error.path] = error.message;
            }
            setValidationMessages({...validationMessages, ...messages});
        });
    }

    return {
        validationMessages,
        setValidationMessages,
        handleSubmit,
        submitData
    };

}
