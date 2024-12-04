import { datetimeFormat, time } from "@/utils/constants/enums"
import { format } from "date-fns"

const getMilliseconds = ({ value, type }: { value: number; type: time }) => {
    switch (type) {
        case time.MILLISECONDS:
            return value
        case time.SECOND:
            return value * 1000
        case time.MINUTE:
            return value * 1000 * 60
        case time.HOUR:
            return value * 1000 * 60 * 60
        case time.DAY:
            return value * 1000 * 60 * 60 * 24
        default:
            return 0
    }
}

const formatTime = ({ init, type }: { init: string; type: datetimeFormat }) => {
    const date = new Date(init)

    if (isNaN(date.getTime())) {
        throw new Error("Invalid date format")
    }

    switch (type) {
        case datetimeFormat.YYYY_MM_DD:
            return format(date, "yyyy-MM-dd")
        case datetimeFormat.YYYY_MM_DD__HH_MM:
            return format(date, "yyyy-MM-dd HH:mm")
        default:
            throw new Error("Invalid datetime format type")
    }
}

export { getMilliseconds, formatTime }
