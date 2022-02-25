export const getTime = (value: string) => {
    if (!value) return null;
    const date = new Date(new Date(value));
    return `${zeroPrefix(date.getHours())}:${zeroPrefix(date.getMinutes())}`;
};

export const getDate = (value: string) => {
    if (!value) return null;
    const date = new Date(value);
    return `${zeroPrefix(date.getDate())}.${zeroPrefix(date.getMonth())}.${date.getFullYear()}.`;
};

const zeroPrefix = (num: number) => {
    if (num < 10) return `0${num}`;
    else return num;
};
