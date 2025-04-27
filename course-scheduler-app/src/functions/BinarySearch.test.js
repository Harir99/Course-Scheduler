import BinarySearch from './BinarySearch'

test('BinarySearch passes for match found', () => {
  const courseData = ['ACCT*1220*0101 (6573) Intro Financial Accounting',
    'ACCT*1220*0102 (6574) Intro Financial Accounting',
    'ACCT*1220*0103 (6574) Intro Financial Accounting']

  const expected = 'ACCT*1220*0102 (6574) Intro Financial Accounting'
  expect(BinarySearch(courseData, 'ACCT*1220', 0, courseData.length - 1, ['ACCT*1220*0101 (6573) Intro Financial Accounting'])).toStrictEqual(expected)
})

test('BinarySearch passes for no match found', () => {
  const courseData = ['ACCT*1220*0101 (6573) Intro Financial Accounting',
    'ACCT*1220*0102 (6574) Intro Financial Accounting',
    'ACCT*1220*0103 (6574) Intro Financial Accounting']

  const expected = null
  expect(BinarySearch(courseData, 'ACCT*0000', 0, courseData.length - 1, ['ACCT*1220*0101 (6573) Intro Financial Accounting'])).toStrictEqual(expected)
})
