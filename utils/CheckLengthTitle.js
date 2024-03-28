export function CheckLengthTitle(title) {

    if (title && title.length > 20) {
        return title.slice(0, 20) + "...";
    }
    return title;
}