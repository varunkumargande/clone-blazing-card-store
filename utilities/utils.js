export const stringFormatter = (string) =>  {
    return string ? (string.toLowerCase()).charAt(0).toUpperCase() + (string.toLowerCase()).slice(1) : '';
}