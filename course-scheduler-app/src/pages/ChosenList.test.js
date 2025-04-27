import ChosenList from './ChosenList'
import renderer from 'react-test-renderer'
import React from 'react'

test('tests that chosen list component can be rendered', () => {
  const tree = renderer.create(<ChosenList chosen={['ACCT*1220*0101 (6573) Intro Financial Accounting']} conflict= {[]} setScheduleData={[]} setConflictData={[]} deleteCourse={[]} Semester={'Fall 2022'} setChosenCourses={[]}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
