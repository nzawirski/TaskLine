import moment from "moment";

export default function colorTask(dueDate) {
    let today = new Date();
    dueDate = new Date(dueDate)

    let fourDays = 1000 * 60 * 60 * 24 * 4;
    let month = 1000 * 60 * 60 * 24 * 28;

    let dD = moment(dueDate).fromNow();
    let timeUntil = dueDate - today;

    let timeNormalisedMonth = Math.round((timeUntil / month) * 510);
    let timeNormalisedFourDays = Math.round((timeUntil / fourDays) * 510);

    let red;
    let green;
    let blue;

    if (dueDate < today) {
        red = 0;
        green = 0;
        blue = 0;
    } else {
        if (timeUntil < fourDays) {
            red = 510 - timeNormalisedFourDays;
            green = 0;
            blue = (0 + timeNormalisedFourDays) / 2;
        } else {
            red = 0;
            green = 0 + timeNormalisedMonth;
            blue = 510 - timeNormalisedMonth;
        }
    }

    let colorCode =
        "rgb(" +
        red.toString() +
        ", " +
        green.toString() +
        ", " +
        blue.toString() +
        ")";

    return colorCode
}