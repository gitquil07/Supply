import moment from "moment";
import { useMemo } from "react";
import { NotificationManager } from "react-notifications";

export const TimeParser = (time) => moment(time).format('YYYY-MM-DD');

export const setTitleWithDateRange = (name, fromDate, toDate, format) => {
    const dateFormat = format || "DD.MM.YYYY";

    const from = moment(fromDate).format(dateFormat),
        to = moment(toDate).format(dateFormat)

    return `Заявки на ${name} c ${from} по ${to}`;
}

// export const getObjectivesList = (data, ...objectives) => {
//     const objectivesList = {};

//     for(let i = 0; i < objectives.length; i++){

//         let pluralObjectiveName = (objectives[i].slice(-1) === "y")? objectives[i].slice(0, objectives[i].length -1) + "ies" : objectives[i] + "s";

//         objectivesList[pluralObjectiveName] = data?.[objectives[i]]?.[pluralObjectiveName]?.edges;
//     }

//     return objectivesList;

// } 

export const recursiveFetch = (data, mutateFunc) => {
    let i = 0;
    return function fetch() {
        if (i < data.length) {
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
        } else {
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

    if (data[name][action].ok) {
        NotificationManager.success(message);
    } else {
        data[name][action].errors.forEach((message) => {
            const msg = message.split(": ")[1];
            NotificationManager.error(msg);
        })
    }
}

export const onResponseComplete = (data, type, entityName, callback) => {
    const responseResult = getValueOfProperty(data, "ok");

    if (responseResult) {

        let message = entityName;
        if(type === "create") message += " создан";
        if(type === "update") message += " изменен";
        if(type === "auth") message += "Добро пожаловать"

        NotificationManager.success(message);

        callback();
    } else {
        const errors = getValueOfProperty(data, "errors");
        errors.forEach((errorMessage) => {
            const message = errorMessage.split(": ")[1];
            NotificationManager.error(message);
        })
    }
}

export const getList = (data) => {
    console.log("getList called");
    return getValueOfProperty(data, "edges");
}

export function getValueOfProperty(obj, propName) {
    if (typeof obj === "object" && obj !== null) {
        const keys = Object.keys(obj);

        const filteredKeys = keys.filter(key => key !== "__typename");

        const found = filteredKeys.find(key => key === propName);
        if (found !== undefined) {
            return obj[found];
        } else {
            return getValueOfProperty(obj[filteredKeys[0]], propName);
        }
    } else {
        return;
    }
}

export const exceptKey = (obj, keysToExcept) => {

    if(!obj) return undefined;

    const keys = Object.keys(obj),
        tmp = {};

    for (let key of keys) {
        if (keysToExcept.indexOf(key) === -1) {
            tmp[key] = obj[key]
        }
    }

    return tmp

}


export const findValue = (element, num) => {
    if (element[num]) {
        if (element[num].includes("\n")) {
            return element[num].split("\n").map((e, i) => <p key={i} style={{ margin: "0", lineHeight: "1.5", fontSize:"14px" }}>{e}</p>)
        }
        else if (element[num].length > 20 && !element[num].includes("\n")) {
            return element[num].substring(0, 25) + "..."
        } else {
            return element[num]
        }
    } else {
        return null
    }
}

export const goToNewLine = (element) => {
    return element.split("\n").map((e, i) => <p key={i} style={{margin: "0", lineHeight: "1.5"}}>{e}</p>);
}