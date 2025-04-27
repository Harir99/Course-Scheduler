import DisplayFilterCourses from './DisplayFilterCourses'
import renderer from 'react-test-renderer'
import React from 'react'

test('tests that chosen list component can be rendered', () => {
  const courses = [
    {
      Term: 'Winter 2023',
      Status: 'Open',
      Section: 'ACCT*1220*0101 (1067) Intro Financial Accounting',
      Location: 'Guelph',
      Lecture_Days: 'Fri',
      Lecture_Time: '08:30AM - 10:20AM',
      Lecture_Location: 'ROZH, Room 104',
      Seminar_Days: 'Thur',
      Seminar_Time: '11:30AM - 12:20PM',
      Seminar_Location: 'MCKN, Room 232',
      Lab_Days: ' ',
      Lab_Time: ' ',
      Lab_Location: ' ',
      Distance_Education: 'FALSE',
      Electronic: 'FALSE',
      Independent_Study: 'FALSE',
      Exam_Day: ' ',
      Exam_Time: ' ',
      Exam_Location: ' ',
      Faculty: 'S. Dhaliwal',
      Capacity: ' 25 / 25',
      Credits: '0.5',
      Academic_Level: 'Undergraduate'
    },
    {
      Term: 'Winter 2023',
      Status: 'Open',
      Section: 'ACCT*1220*0102 (1067) Intro Financial Accounting',
      Location: 'Guelph',
      Lecture_Days: ' ',
      Lecture_Time: '08:30AM - 10:20AM',
      Lecture_Location: 'ROZH, Room 104',
      Seminar_Days: 'Thur',
      Seminar_Time: '11:30AM - 12:20PM',
      Seminar_Location: 'MCKN, Room 232',
      Lab_Days: ' ',
      Lab_Time: ' ',
      Lab_Location: ' ',
      Distance_Education: 'FALSE',
      Electronic: 'FALSE',
      Independent_Study: 'FALSE',
      Exam_Day: ' ',
      Exam_Time: ' ',
      Exam_Location: ' ',
      Faculty: 'S. Dhaliwal',
      Capacity: ' 25 / 25',
      Credits: '0.5',
      Academic_Level: 'Undergraduate'
    },
    {
      Term: 'Winter 2023',
      Status: 'Open',
      Section: 'ACCT*1220*0103 (1067) Intro Financial Accounting',
      Location: 'Guelph',
      Lecture_Days: 'Fri',
      Lecture_Time: '08:30AM - 10:20AM',
      Lecture_Location: 'ROZH, Room 104',
      Seminar_Days: 'Thur',
      Seminar_Time: '11:30AM - 12:20PM',
      Seminar_Location: 'MCKN, Room 232',
      Lab_Days: ' ',
      Lab_Time: ' ',
      Lab_Location: ' ',
      Distance_Education: 'FALSE',
      Electronic: 'FALSE',
      Independent_Study: 'FALSE',
      Exam_Day: ' ',
      Exam_Time: ' ',
      Exam_Location: ' ',
      Faculty: 'S. Dhaliwal',
      Capacity: ' 25 / 25',
      Credits: '0.5',
      Academic_Level: 'Undergraduate'
    }]
  const semester = 'Winter 2023'
  const tree = renderer.create(<DisplayFilterCourses courses={courses} semester={semester}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
