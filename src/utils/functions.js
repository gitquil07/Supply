import moment from "moment";
import { NotificationManager } from "react-notifications";
import { useHistory } from 'react-router-dom';
import { Row, RowGray } from "components/Row";
import XLSX from "sheetjs-style";
import { ifElse } from "ramda";


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


export const convertDataIntoExcelSpreadSheet = (data, columnNames) => {


    // Create workbook using (.book_new) method which weill return workbook
    // object with following properties:
    //  - SheetNames property which contains list (array of elements) 
    // Eaach element of array is string representing worksheet object
    //  - Sheets property contains object which property's name are equal to
    // to names listen in SheetNames array.

    // We don't have to pass any configuration as argument to this method
    // we will configure our workbook object later. 

    const wb = XLSX.utils.book_new();
    
    // After creating workbook out next step is add necessary
    // configurations to this workbook  
    // To set this configurations we will use 
    // workbook (.Props) rpoeprty this property name
    // is reserved. (.Props) property contains 
    // object.
    
    // (.Props) object contains set of configuration properties 
    // to configure our workbook
    // Configuration options described in sheetjs github doc
    // All configuration options written with capital letter.
    
    wb.Props = {
        Title: "Слежение",
        Subject: "Слежение",
        Author: "Слеженец",
        CreatedDate: new Date()
    }
    
    
    // Push worksheet name into (.SheetNames) property
    wb.SheetNames.push("trackingWorkbook");
    
    
    // Next step after creating workbook we should create
    // work sheet. As base for worksheet will be array of array
    // So we will use (.aoa_to_sheet) method of (XLSX.utils)
    // which will return value.
    
    const arrayOfArray = transformToArrayOfArrayFormat(data);

    // After transforming data we have to concat
    // columns with entries. For that we will use 
    // (.unshift) method. This method will
    // concatonate.
    
    arrayOfArray.unshift(columnNames);


    const ws = XLSX.utils.aoa_to_sheet(arrayOfArray);
    // Lets apply border for cages.


    let address = Object.keys(ws);

    address.pop();

    for(let i = 0; i < address.length; i++){
    
        ws[address[i]].s = {
            border: {
                top: { style: "medium", color: {rgb: "000000"} },
                bottom: { style: "medium", color: {rgb: "000000"} },
                left: { style: "medium", color: {rgb: "000000"} },
                right: { style: "medium", color: {rgb: "000000"} }
            },
            alignment: {
                vertical: "center",
                horizontal: "center",
                wrapText: true,
            },
        }

    }
    
    // Lets style just headers
    for(let i = 0; i < address.length; i++){

        if(i >= 0 && i <= 17){
            ws[address[i]].s = {
                ...ws[address[i]].s,
                font: {
                    sz: "16",
                    color: {rgb: "FF0000"}
                }
            }
        }
    }


    // Lets set width for columns
    // This width will be applied for 
    // each cage under this column

    ws["!cols"] = [{wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}, {wch: 30}];
    ws["!autofilter"] = {ref: "A1:R1"};

    // Letse set height for headers:
    ws["!rows"] = [{hpt: 40}];


    const lengthes = data.map(d => d.factories.length);

    let points = [];
    let start = 0, end = 0;
    for(let i = 0; i < lengthes.length; i++){

        end += lengthes[i];

        points.push(
            {s: {c:0, r: start+1}, e: {c:0, r: end}},
            {s: {c:1, r: start+1}, e: {c:1, r: end}},
            {s: {c:7, r: start+1}, e: {c:7, r: end}},
            {s: {c:8, r: start+1}, e: {c:8, r: end}},
            {s: {c:9, r: start+1}, e: {c:9, r: end}},
            {s: {c:10, r: start+1}, e: {c:10, r: end}},
            {s: {c:11, r: start+1}, e: {c:11, r: end}},
            {s: {c:12, r: start+1}, e: {c:12, r: end}},
            {s: {c:13, r: start+1}, e: {c:13, r: end}},
        );

        start = end;

    }


    ws["!merges"] = points;


    // After creating worksheet we hould add it into
    // To (.Sheets) property  of workbook object.
    
    wb.Sheets["trackingWorkbook"] = ws;
    
    // Lets thing that we have already transformed out data to array of array type
    // Next step will be styling of  cages.
    // So we need add borders to our excel table and 
    // Set background for columns' headers and then add 
    // bold for their text.
    
    // But before we start to style lets main part.
    // Export data without any styling:
    //  1) Complete steps with (wb) and (ws)
    //  2) Transform incoming data to (array of array).
    
    
    // Next step convert our workbook into XLSX binary
    // To transform workbook into (XLSX binary) we will use 
    // (.write) method of (XLSX) object
    // (.write) method has two parameters. 
    // - ws
    // - options

    // Now its time for stylig 
    // We will add borders to table
    

    
    const wbBinary = XLSX.write(wb, {bookType: "xlsx", type: "binary"});

    // Now we have created a XLSX binary
    // but this is not valid format for 
    // excel file. Valid format is 
    // octet sequence. For this we 
    // will use custom function 
    
    function s2ab(binary) {
        const bf = new ArrayBuffer(binary.length);
        const octet = new Uint8Array(bf);
        for(let i = 0; i < binary.length; i++){
            octet[i] = binary.charCodeAt(i) & 0xFF; 
        }

        return bf;
    }


    // Than our aim is to create (Blob) instance.
    // Blob instance will be used to create link
    // for Blob object using (FileReader) instance.

    // Blob constructor function take two arguments
    // - blobParts - array where we pass ArrayBuffer, ArrayBufferView
    // - options object.

    const bf = s2ab(wbBinary);
    const blob = new Blob([bf], {type: "application/octet-stream"});


    // Last step is creating link and adding autoclick
    // behaviour for it

    const link = document.createElement("a");
          link.download = `Слежение_${moment(new Date()).format("YYYY-MM-DD")}.xlsx`; 

        // Create instance of FileReader object
        const reader = new FileReader();

        // As you cann see File reader does not take any arguments
        // FileReader have several methods which will transform
        // our blob into different values.

        // Proper (method) for us (.readDataAsURL) which
        // will take our Blob object as  argument
            reader.readAsDataURL(blob); 

        // (.readDataAsURL) method is asynchronus.
        // So code below will execute earlier than
        // (.readDataAsURL) method.

        // So to know that (.readDataAsURL) method
        // returns result, we can attach handler 
        // for (load) event. (Load) event triggers 
        // when (.readDataAsURL) method returns
        // result. To attach handler we can use
        // (.addEventListener) method or assign
        // function to event property  (.onload)
        // This event property is available inside
        // (reader) object
        
        reader.onload = () => {

            // To get an access to result returned
            // by (.readDataAsURL) method is 
            // we can use (.result) property
            // of (.reader) object.        
            const base64URL = reader.result;
            link.href = base64URL; 
            link.click();

        }

}


// Now we will write helper function which will transform
// our data (array) into (array of array) format because
// Now incoming data is (array of objects type).
// We will use (Object.entries) method posseed by (Object) function
// I don't know in advance where else we need this function
// So we have just two approach to different use case
// Let consider both of them:
// First case when we won't export current function. 
// So we don't make visible for other modules.
// We will just call it inside (convertDataIntoExcelSpreadSheet)
// function. Why we do this?
// Because there is just one user of function, and (transformFunction)
// is in scope of user function. That's why we don't need to use 
// export.
// Second case we want to export current function and than
// call this function inside components where we call our
// (convertDataIntoExcelSpreadSheet) before passing data
// we will call this function convert data into necessary
// format. 

// Second case has disadvantages .These disadvantages is related 
// for that we have to write more code because of we have 
// to import transform function. Than we have to call it 
// in each component.

const transformToArrayOfArrayFormat = (data) => {


        // Retrieve all values with Object.entries() method
        // Also we can use Object.keys() method. That method
        // will return (array) each element of that array is
        // property name. Than we can loop through this array
        // of (keys). But in second we did two. We loose
        // time because of we definde loop. 
        // But i'm hurrying to make conclusion. Because
        // even in that case we have to loop through array.
        // and get values. But with keys we have to specify them
        // Like (obj.keyname). This is additional action.
        // Object entries don't do that.
        // Last one which is not compared is speed of execution.

        // Object.etries method will return array of array format
        // result. 

    const transformed = [];

    for(let i = 0; i < data.length; i++){
        
        const amount = data[i].invoices.length,
              arr = Object.entries(data[i]).map(entry => entry[1]);


        let tmp = [];
        for(let l = 0; l < amount; l++){
            let tmpIn = [];

            if(l === 0){
                for(let k = 0; k < arr.length; k++){
                    if(typeof arr[k] === "object"){
                        tmpIn.push(arr[k]?.[0]);
                    }else{
                        tmpIn.push(arr[k]);
                    }
                }
            }else{
                tmpIn.push(
                    "",
                    "",
                    arr[2][l],
                    arr[3][l],
                    arr[4][l],
                    arr[5][l],
                    arr[6][l],
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    "",
                    arr[14][l],
                    arr[15][l],
                    arr[16][l],
                    arr[17][l],
                );
            }
    
            tmp.push(tmpIn);
        }

        transformed.push(...tmp);
        
    }

    return transformed;
    
}










