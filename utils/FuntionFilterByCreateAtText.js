export function FunctionFilterByCreateAtText(text) {
    const date = new Date();
    const dateNow = date.getTime();
    const dateText = new Date(text);
    const dateTextTime = dateText.getTime();

    const number = Math.floor((dateNow - dateTextTime) / (1000 * 60 * 60 * 24));

    return number;
}