import moment from "moment";
import { useMemo } from "react";
import { NotificationManager } from "react-notifications";

import { TableRow } from '@material-ui/core';
import { TableCell } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import { Row, RowGray } from "components/Row";



export const setTitleWithDateRange = (name, fromDate, toDate, format) => {
    const dateFormat = format || "DD.MM.YYYY";

    const from = moment(fromDate).format(dateFormat),
        to = moment(toDate).format(dateFormat)

    return `Заявки на ${name} c ${from} по ${to}`;
}

export const recursiveFetch = (amount, mutateFunc) => {
    let i = 0;
    return function fetch() {
        if (i < amount) {
            mutateFunc(i)
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
            const msgObj = JSON.parse(message);
            const [key, value] = Object.entries(message);

            NotificationManager.error(`${value}`);
        })
    }
}

export const onResponseComplete = (data, type, entityName, callback) => {
    const responseResult = getValueOfProperty(data, "ok");

    if (responseResult) {

        let message = entityName;
        if (type === "create") message += " создан";
        if (type === "update") message += " изменен";
        if (type === "auth") message += "Добро пожаловать"

        NotificationManager.success(message);

        callback();
    } else {
        const errors = getValueOfProperty(data, "errors");
        errors.forEach((errorMessage) => {
            NotificationManager.error(errorMessage);
        })
    }
}

export const getList = (data) => {
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

    if (!obj) return undefined;

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
            return element[num].split("\n").map((e, i) => <p key={i} style={{ margin: "0", lineHeight: "1.5", fontSize: "14px" }}>{e}</p>)
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
    return element.split("\n").map((e, i) => <p key={i} style={{ margin: "0", lineHeight: "1.5" }}>
        { element }
    </p>);
}

export const CustomRowGenerator = (url) => {
    let history = useHistory();

    return {
        onRowClick: (rowData) => {
            history.push(`${url}/edit/${rowData[0]}`);
        }
    }
};


export const CustomRowGeneratorForModal = (openDialog) => {
    return {
        onRowClick: (rowData) => {
            openDialog(rowData[0]);
        }
    }
};

export const setHeading = columnMeta => {
    const parts = columnMeta.label.split("\n");
    return (
        <th className="MuiTableCell-root MuiTableCell-head" scope="col" data-colindex={columnMeta.index}>
            <div>
                <Row>{parts[0]}</Row>
                <RowGray>{parts[1]}</RowGray>
            </div>
        </th>
    );
};

export const downloadFile = (url) => {
    const a = window.document.createElement("a");
    a.href = url;
    a.setAttribute("download", true);
    a.click();
}

export const toCamelCase = (word) => {
    let trWord = word.toLowerCase();

    if (trWord.indexOf("_") > -1) {
        const parts = trWord.split("_");
        let i = 0;
        for (let part of parts) {
            if (i > 0) trWord += part[0].toUpperCase() + part.slice(1);
            else trWord = part;
            i++;
        }
    }

    return trWord;
}


export const formatPrice = (price) => {

    if(!isNaN(price) && price.length > 0 || (price.length == 1 && price == "-")){
        
        const separator = (price.indexOf(".") > -1)? price.indexOf(".") : false,
              step = 3,
              isNegative = price.indexOf("-") > -1;
    
        let fractionalPart = undefined,
            wholePart = price.slice(isNegative? 1 : 0);
            
        if(separator){
            fractionalPart = price.slice(separator + 1);
            wholePart = price.slice(isNegative? 1 : 0, separator);
        }
        
        const pLength = wholePart.length;
    
        const remaining = pLength % 3;
    
        let iterationCount = Math.floor(pLength / 3);
        
        (remaining > 0) && ++iterationCount;
     
        let formatedPrice = "",
            pointer = 0;

        for(let i = 0; i < iterationCount; i++){

            if(i == 0 && remaining > 0){
                formatedPrice += wholePart.slice(0, remaining);
                pointer += remaining;
            }else{
                formatedPrice += " " + wholePart.slice(pointer, pointer + step);
                pointer += step;
            }

        }

        formatedPrice = formatedPrice.trim();
        formatedPrice = fractionalPart? formatedPrice + "." + fractionalPart : formatedPrice;
        formatedPrice = (!fractionalPart && separator)? formatedPrice + "." : formatedPrice;
        formatedPrice = isNegative? "-" + formatedPrice : formatedPrice;

        return formatedPrice;
    }else if(isNaN(price)){

       return price;
    
    }

    return price;

}

export const formatInputPrice = (input) => {

    const cleanedInput = resetPriceFormat(input);

    return  formatPrice(cleanedInput);

}


export const resetPriceFormat = (input) => {
    const iLength = input.length;

    let cleanedInput = "";
    
    if(iLength == 1 && input == ".") cleanedInput = "0.";

    for(let i = 0; i < iLength; i++){
        
        if(input[i] == "-" || input[i] == "." || (!isNaN(input[i]) && (input[i] != " ") && (input[i] != ""))){

            if((cleanedInput.indexOf("-") == -1) && (input[i] == "-") && cleanedInput.length == 0){
                cleanedInput += input[i];
            }

            if((cleanedInput.indexOf(".") == -1) && (input[i] == ".")){
                cleanedInput += input[i];
            }

            if(input[i] != "-" && input[i] != "."){
                cleanedInput += input[i];
            }

        }

    }

    return cleanedInput;
}


export const fullscreen = (id) => {
    var elem;
    if (!id) elem = document.documentElement;
    else elem = document.getElementById(id);

    if (
        document.fullscreenElement ||
        document.webkitFullscreenElement ||
        document.msFullscreenElement
    ) {
        if (document.exitFullscreen) {
            document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
        } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
        }
    } else {
        if (elem.requestFullscreen) {
            elem.requestFullscreen();
        } else if (elem.webkitRequestFullscreen) {
            elem.webkitRequestFullscreen();
        } else if (elem.msRequestFullscreen) {
            elem.msRequestFullscreen();
        }
    }
};


export const calculateDaysOnTheWay = (shippingDate) => {
    const dayInMilliseconds = 24 * 60 * 60 * 1000,
          hourInMilliseconds = 60 * 60 * 1000,
          minuteInMilliseconds = 60 * 1000;

    const shippingDateInMSeconds = new Date(shippingDate).getTime(),
          currentTimeMSeconds = Date.now();

    const onTheWay = currentTimeMSeconds - shippingDateInMSeconds;

    let amountOfDays = Math.floor(onTheWay / dayInMilliseconds),

        hoursInMilliseconds = onTheWay % dayInMilliseconds,
        hours = Math.floor(hoursInMilliseconds / hourInMilliseconds),

        minutesInMilliseconds = hoursInMilliseconds % hourInMilliseconds,
        minutes = Math.floor(minutesInMilliseconds / minuteInMilliseconds);

    
    const r = amountOfDays % 10;

    return addDays(r);
}

export const addDays = (dayAmount) => {
    let days = "";

    switch(dayAmount){
        case 1:
            days = "день";
            break;
        case 2:
        case 3:
        case 4:
            days = "дня";
            break;
        case 5:
        case 6:
        case 7:
        case 8:
        case 9:
        case 0:
            days = "дней";
            break;

    }

    return dayAmount + " " + days;
}

export const cutTextLength = (text) => {
    if(typeof text === "string"){
        return (text.length >= 20)? text.slice(0, 20) + "..." : text;
    }
    return text;
}