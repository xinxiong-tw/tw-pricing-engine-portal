function format(date, format = 'YYYY.MM.DD') {
    return dayjs(date).format(format);
}

export function formatDate(date) {
    return format(date);
}