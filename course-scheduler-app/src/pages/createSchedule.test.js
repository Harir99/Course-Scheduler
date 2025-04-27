import CreateSchedule from './createSchedule'
import renderer from 'react-test-renderer'
import React from 'react'
import { BrowserRouter as Router } from 'react-router-dom'

test('tests that chosen list component can be rendered', () => {
  const tree = renderer.create(<Router>
    <CreateSchedule
    courseData={[]}
    setCourseData={[]}
    chosenCourses={[]}
    setChosenCourses={[]}
    suggestedCourses={[]}
    setSuggestedCourses={[]}
    scheduleData={[]}
    setScheduleData={[]}
    conflictData={[]}
    setConflictData={[]}
    currentSem={[]}
    addCourse={[]}
    deleteCourse={[]}
    selectSemester={'Fall 2022'}
    setExportData = {''}
    downloadIcs = {() => {}}
    />
    </Router>).toJSON()
  expect(tree).toMatchSnapshot()
})
