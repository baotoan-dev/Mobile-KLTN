export function FunctionFilterByCreateAtText(text) {
    const numberPattern = /\d+/; 
    const matches = text.match(numberPattern); 
    const number = matches ? parseInt(matches[0]) : null; 

    return number;
}