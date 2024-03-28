import moment from 'moment';

export function convertTime(time) {
    // use moment
    return moment(time).format('HH:mm:ss');
}