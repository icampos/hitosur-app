import dayjs from 'dayjs'


export const weekDays = (current) => {
    const week = [];
    // Starting M]onday not Sunday
    current.setDate((current.getDate() - current.getDay() + 1));
    for (var i = 0; i < 7; i++) {
        week.push(
            new Date(current)
        );
        current.setDate(current.getDate() + 1);
    }
    return week;
}

export const currentWeek = {
     firstDay : dayjs().startOf('week').format(),
     lastDay : dayjs().endOf('week').format()
}