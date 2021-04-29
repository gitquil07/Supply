import moment from "moment";

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