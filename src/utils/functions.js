import moment from "moment";

export const TimeParser = (time) => moment(time).format('YYYY-MM-DD');

export const setTitleWithDateRange = (name, fromDate, toDate, format) => {
    const dateFormat = format || "DD.MM.YYYY";

    const from = moment(fromDate).format(dateFormat),
          to = moment(toDate).format(dateFormat)

    return `Заявки на ${name} c ${from} по ${to}`;
}