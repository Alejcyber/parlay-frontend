export const transformDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString()+" "+date.toLocaleTimeString();
    return formattedDate;
}

export const getCurrentDate = () => {
    const date = new Date();
    const formattedDate = date.toLocaleDateString()+" "+date.toLocaleTimeString();
    return formattedDate;
}