import { parse, format, difference } from 'https://deno.land/std@0.141.0/datetime/mod.ts'

function getObjectTime(date) {
  date = date || new Date()
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    day: date.getDate(),
    hour: date.getHours(),
    minute: date.getMinutes(),
  }
}

function formatYMD({sep, date} = {}) {
  sep = sep || ''
  date = date || new Date()
  return format(date, `yyyy${sep}MM${sep}dd`);
}

function getDate(date) {
  let now = new Date()
  let result = now
  if (date) {
    let { year } = date
    let { month } = date
    let { day } = date
    let { hour } = date
    let { minute } = date
    year = year || now.getFullYear()
    month = (month || (now.getMonth() + 1))
    day = day || now.getDate()
    hour = hour || now.getHours()
    minute = minute || now.getMinutes()

    year = ("" + year).padStart(4, 0)
    month = ("" + month).padStart(2, 0)
    day = ("" + day).padStart(2, 0)
    hour = ("" + hour).padStart(2, 0)
    minute = ("" + minute).padStart(2, 0)

    let dateString = `${day}/${month}/${year} ${hour}:${minute}`
    result = parse(dateString, 'dd/MM/yyyy HH:mm')
  }
  return result
}

function getDiff({ start, end }) {
  let startDate = getDate(start)
  let endDate = getDate(end)
  let diff = difference(startDate, endDate, { units: ["seconds"] });
  return {
    startDate,
    endDate,
    diff: diff.seconds,
  }
}

function Time() {
  return {
    formatYMD,
    getDiff,
    getObjectTime
  }
}

export default Time()