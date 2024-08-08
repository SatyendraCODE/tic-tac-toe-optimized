import moment from "moment";

export const getFormattedTime = (time: number, format?: string) => {
  return moment(time).format(format ? format : "hh:mm:ss a");
};
