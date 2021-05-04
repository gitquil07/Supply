import moment from "moment";
import { NotificationManager } from "react-notifications";

export const TimeParser = (time) => moment(time).format('YYYY-MM-DD');

export const setTitleWithDateRange = (name, fromDate, toDate, format) => {
    const dateFormat = format || "DD.MM.YYYY";

    const from = moment(fromDate).format(dateFormat),
          to = moment(toDate).format(dateFormat)

    return `Заявки на ${name} c ${from} по ${to}`;
}

export const getObjectivesList = (data, ...objectives) => {
    const objectivesList = {};

    for(let i = 0; i < objectives.length; i++){

        let pluralObjectiveName = (objectives[i].slice(-1) === "y")? objectives[i].slice(0, objectives[i].length -1) + "ies" : objectives[i] + "s";

        objectivesList[pluralObjectiveName] = data?.[objectives[i]]?.[pluralObjectiveName]?.edges;
    }

    return objectivesList;

} 

export const recursiveFetch = (data, mutateFunc) => {
    let i = 0;
    return function fetch(){
        if(i < data.length){
            console.log("i", i);
            mutateFunc({
                variables: {
                    input: {
                        data: data[i]
                    }
                }
            })
            i++;
           fetch(); 
        }else{
            return
        }
    }
}

export const addProp = (data, propName, val) => {
    const res = data.map(d => {
        return {
            ...d,
            [propName]: val
        }
    });

    return res;
}


export const showNotification = (data, name, action, message) => {

    console.log("name", name);
    console.log("action", action);

    if(data[name][action].ok){
        NotificationManager.success(message);
    }

    if(data[name][action].errors.length != 0){
        const {errors} = data.factor.factoryCreate;
        NotificationManager.error(errors[0]);
    }
}