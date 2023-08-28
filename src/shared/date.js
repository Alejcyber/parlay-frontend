export const transformDate = (dateString) => {
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString()+" "+date.toLocaleTimeString();
    return formattedDate;
}