export default function BinarySearch (courseData, x, start, end, suggestArray) {
  // console.log(arr[0]);
  // Base Condition
  if (start > end) {
    return null
  }

  // Find the middle index
  const mid = Math.floor((start + end) / 2)

  // Compare mid with given key x
  if ((courseData[mid].toUpperCase()).includes(x) && (suggestArray.indexOf(courseData[mid]) === -1)) {
    return courseData[mid]
  }

  // If element at mid is greater than x,
  // search in the left half of mid
  if ((courseData[mid].toUpperCase()) > x) {
    return BinarySearch(courseData, x, start, mid - 1, suggestArray)
  } else {
    // If element at mid is smaller than x,
    // search in the right half of mid
    return BinarySearch(courseData, x, mid + 1, end, suggestArray)
  }
}
