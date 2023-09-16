export const findAttendanceDate = () => {
    const today = new Date();

    const dayOfWeek = today.getDay();
    const daysAgo = (dayOfWeek + 7) % 7;

    const lastSunday = new Date(today);
    lastSunday.setDate(today.getDate() - daysAgo);

    return `${lastSunday.getFullYear()}-${lastSunday.getMonth() + 1}-${lastSunday.getDate()}`;
};

export const getDateString = (date, separator = "-") => {
    if(!date) return "";
    return `${date.getFullYear()}${separator}${date.getMonth() + 1}${separator}${date.getDate()}`;
};
