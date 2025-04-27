export default function icsData (data, sem) {
  let counter = 0
  let until = ''
  let day = 0
  let next = 0
  const classEvents = []
  const classEvent = {}

  if (sem[0] === 2022) {
    until = 'UNTIL=20221130T000000Z'
    day = 5
    next = 3
  } else {
    until = 'UNTIL=20230406T000000Z'
    day = 2
    next = 6
  }

  for (let i = 0; i < data.length; i++) {
    if (!data[i].title.includes('EXAM')) {
      const days = data[i].day_string.split('=')[1].split(',')
      days[days.length - 1] = days[days.length - 1].substr(0, 2)
      for (let j = 0; j < days.length; j++) {
        if (days[j] === 'MO' && day === 2) {
          classEvent[counter] = {
            title: data[i].title,
            start: [sem[0], sem[1], sem[2], parseInt(data[i].start_time[0]), parseInt(data[i].start_time[1])],
            end: [sem[0], sem[1], sem[2], parseInt(data[i].end_time[0]), parseInt(data[i].end_time[1])]
          }
          classEvents.push(classEvent[counter++])
        }
        if (days[j] === 'TU' && day === 2) {
          classEvent[counter] = {
            title: data[i].title,
            start: [sem[0], sem[1], sem[2] + 1, parseInt(data[i].start_time[0]), parseInt(data[i].start_time[1])],
            end: [sem[0], sem[1], sem[2] + 1, parseInt(data[i].end_time[0]), parseInt(data[i].end_time[1])]
          }
          classEvents.push(classEvent[counter++])
        }
        if (days[j] === 'WE' && day === 2) {
          classEvent[counter] = {
            title: data[i].title,
            start: [sem[0], sem[1], sem[2] + 2, parseInt(data[i].start_time[0]), parseInt(data[i].start_time[1])],
            end: [sem[0], sem[1], sem[2] + 2, parseInt(data[i].end_time[0]), parseInt(data[i].end_time[1])]
          }
          classEvents.push(classEvent[counter++])
        }
        if (days[j] === 'TH' && day === 2) {
          classEvent[counter] = {
            title: data[i].title,
            start: [sem[0], sem[1], sem[2] + 3, parseInt(data[i].start_time[0]), parseInt(data[i].start_time[1])],
            end: [sem[0], sem[1], sem[2] + 3, parseInt(data[i].end_time[0]), parseInt(data[i].end_time[1])]
          }
          classEvents.push(classEvent[counter++])
        }
        if (days[j] === 'TH' && day === 5) {
          classEvent[counter] = {
            title: data[i].title,
            start: [sem[0], sem[1], sem[2], parseInt(data[i].start_time[0]), parseInt(data[i].start_time[1])],
            end: [sem[0], sem[1], sem[2], parseInt(data[i].end_time[0]), parseInt(data[i].end_time[1])]
          }
          classEvents.push(classEvent[counter++])
        }
        if (days[j] === 'FR' && day === 2) {
          classEvent[counter] = {
            title: data[i].title,
            start: [sem[0], sem[1], sem[2] + 4, parseInt(data[i].start_time[0]), parseInt(data[i].start_time[1])],
            end: [sem[0], sem[1], sem[2] + 4, parseInt(data[i].end_time[0]), parseInt(data[i].end_time[1])]
          }
          classEvents.push(classEvent[counter++])
        }
        if (days[j] === 'FR' && day === 5) {
          classEvent[counter] = {
            title: data[i].title,
            start: [sem[0], sem[1], sem[2] + 1, parseInt(data[i].start_time[0]), parseInt(data[i].start_time[1])],
            end: [sem[0], sem[1], sem[2] + 1, parseInt(data[i].end_time[0]), parseInt(data[i].end_time[1])]
          }
          classEvents.push(classEvent[counter++])
        }
      }
    }
  }

  for (let i = 0; i < data.length; i++) {
    if (!data[i].title.includes('EXAM')) {
      if (sem[0] === 2022) {
        next = 3
      } else {
        next = 6
      }
      const days = data[i].day_string.split('=')[1].split(',')
      days[days.length - 1] = days[days.length - 1].substr(0, 2)
      if (days.includes('MO')) {
        next += 1
      } else if (days.includes('TU')) {
        next += 2
      } else if (days.includes('WE')) {
        next += 3
      } else if (days.includes('TH')) {
        next += 4
      } else if (days.includes('FR')) {
        next += 5
      }
      classEvent[counter] = {
        title: data[i].title,
        start: [sem[0], sem[1], sem[2] + next, parseInt(data[i].start_time[0]), parseInt(data[i].start_time[1])],
        end: [sem[0], sem[1], sem[2] + next, parseInt(data[i].end_time[0]), parseInt(data[i].end_time[1])],
        startInputType: 'local',
        endInputType: 'local',
        startOutputType: 'local',
        endOutputType: 'local',
        recurrenceRule: 'FREQ=WEEKLY;' + data[i].day_string + 'INTERVAL=1;' + until
      }
      classEvents.push(classEvent[counter++])
    }
  }

  return (classEvents)
}
