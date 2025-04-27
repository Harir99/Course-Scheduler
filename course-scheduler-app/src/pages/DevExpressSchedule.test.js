import DevExpressSchedule from './DevExpressSchedule'
import renderer from 'react-test-renderer'
import React from 'react'

test('tests that schedule component can be rendered', () => {
  const tree = renderer.create(<DevExpressSchedule appointments={{
    appointments: [
      {
        title: 'CIS*3760*0101 LEC',
        full_title: 'CIS*3760*0101 (7263) Software Engineering',
        day: [
          '3',
          '5'
        ],
        location: 'RICH, Room 2529',
        start_time: [
          '8',
          '30'
        ],
        end_time: [
          '9',
          '50'
        ],
        de: false,
        color: '#009688'
      },
      {
        title: 'CIS*3760*0101 LAB',
        full_title: 'CIS*3760*0101 (7263) Software Engineering',
        day: [
          '2'
        ],
        location: 'THRN, Room 2420',
        start_time: [
          '11',
          '30'
        ],
        end_time: [
          '13',
          '20'
        ],
        de: false,
        color: '#009688'
      }
    ],
    conflicts: []
  }}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
