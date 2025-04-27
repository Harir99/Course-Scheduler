export default function CourseData (data) {
  let counter = 0
  const appointments = []
  const appointment = {}

  for (let i = 0; i < data.length; i++) {
    for (let j = 0; j < data[i].day.length; j++) {
      appointment[counter] = {
        title: data[i].title,
        startDate: new Date(2022, 4, data[i].day[j], data[i].start_time[0], data[i].start_time[1]),
        endDate: new Date(2022, 4, data[i].day[j], data[i].end_time[0], data[i].end_time[1]),
        id: counter,
        location: data[i].location,
        color: data[i].color
      }
      appointments.push(appointment[counter++])
    }
  }

  return (appointments)
}
