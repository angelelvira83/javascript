import { parse, format, difference } from 'https://deno.land/std@0.141.0/datetime/mod.ts'

function getDate(date) {
    let result = new Date()
    //let now = Date.now()
    //now = now + a + b * 1000 + c * 60 * 1000 + d * 60 * 60 * 1000 + e * 24 * 60 * 60 * 1000 
    //let aa = new Date(now)
    if (date) {
      let { year } = date
      let { month } = date
      let { day } = date
      let { hour } = date
      let { minute } = date
      //result = new Date(`${year}/${month}/${day}/:${hour}:${minute}`)
      result.setFullYear(year)
      result.setMonth(month - 1)
      result.setDate(day)
      result.setHours(hour)
      result.setMinutes(minute)
    }
    return result
  }

  function getDiff({ start, end }) {
    let startDate = getDate(start)
    let endDate = getDate(end)
    let timeStartDate = startDate.getTime()
    let timeEndDate = endDate.getTime()
    return {
      startDate,
      endDate,
      diff: Math.round((timeEndDate - timeStartDate) / 1000),
    }
  }

function formatYMD({sep, date} = {}) {
    sep = sep || ''
    date = date || new Date()
    let y = String(date.getFullYear()).padStart(4, 0)
    let m = String(date.getMonth() + 1).padStart(2, 0)
    let d = String(date.getDate()).padStart(2, 0)
    let result = [y,m,d].join(sep)
    return result
}

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

function Time() {
  return {
    formatYMD,
    getDiff,
    getObjectTime,
  }
}

export default Time()