import moment from "moment";

export function dateFormat(value) {
    return moment(value).format("MM/DD/YYYY ");
}

export function timeFormat(value) {
    return moment(value).format(" HH:mm a");
}

export function lengthOfString(value) {
    if (value ? value.length > 48 : '') {
        return value.substring(0, 20) + '...'
    } else {
        return value
    }
}




