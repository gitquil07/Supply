import moment from "moment";

export const TimeParser = (time) => moment(time).format('YYYY-MM-DD');