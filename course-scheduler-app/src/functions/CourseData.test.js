import CourseData from './CourseData'

test('CourseData passes for returning correct data for schedule', () => {
  const courseInfo = {
    appointments: [
      {
        title: 'CIS*3760*0101 LEC',
        full_title: 'CIS*3760*0101 (7263) Software Engineering',
        day: [],
        location: 'RICH, Room 2529',
        start_time: [],
        end_time: [],
        de: false,
        color: '#009688'
      },
      {
        title: 'CIS*3760*0101 LAB',
        full_title: 'CIS*3760*0101 (7263) Software Engineering',
        day: [],
        location: 'THRN, Room 2420',
        start_time: [],
        end_time: [],
        de: false,
        color: '#009688'
      }
    ],
    conflicts: []
  }
  // const date1 = new Date('2022-05-03T14:30:00.000Z')
  // const date2 = new Date('2022-05-03T12:30:00.000Z')
  // const expected = [{
  //   color: '#F88A71',
  //   endDate: date1,
  //   id: 0,
  //   location: 'TBA',
  //   startDate: date2,
  //   title: 'ACCT*1220*DE01 EXAM'
  // }]
  expect(CourseData(courseInfo)).toStrictEqual([])
})
