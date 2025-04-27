import SuggestList from './SuggestList'
import renderer from 'react-test-renderer'
import React from 'react'

test('tests that the suggested list can be rendered', () => {
  const tree = renderer.create(<SuggestList suggestions={['ACCT*1220*0101 (6573) Intro Financial Accounting']} chosen={0} addCourse={[]}/>).toJSON()
  expect(tree).toMatchSnapshot()
})
