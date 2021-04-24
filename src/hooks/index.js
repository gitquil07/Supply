import { useLazyQuery } from "@apollo/client";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import moment from "moment";

export const useDateRange = (query) => {

    const [fromDate, setFromDate] = useState(moment().startOf('month').toDate()),
          [toDate, setToDate] = useState(new Date());

    const [ fetchData, {error, data}] = useLazyQuery(query);

    useEffect(() => {
        fetchData({ variables: { fromDate: moment(fromDate).format("YYYY-MM-DD"), toDate: moment(toDate).format("YYYY-MM-DD")}});
      }, []);

    const handleClick = () => fetchData({ variables: { fromDate, toDate}})

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
        dispatch({type: "CHANGE_TITLE", payload: title_to_set})
    }, [dispatch]);

    return title_to_get;

} 

