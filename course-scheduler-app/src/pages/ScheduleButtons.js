import { React } from 'react'
import axios from 'axios'
import { Button } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import icsData from '../functions/icsData'
const ics = require('ics')

function ScheduleButtons (props) {
  // Ensuring no duplicate courses
  // (in case of multiple selection of a single section)
  const chosen = []
  props.chosen.forEach((title) => {
    if (!chosen.includes(title)) {
      chosen.push(title)
    }
  })
  const navigate = useNavigate()

  const postData = { courses_info: chosen, semester: props.Semester }
  // Post request to get scheduling data
  const sendSchedule = async () => {
    axios
      .post('/api/getCourseAppointments', postData)
      .then((response) => {
        const scheduleResponse = response.data.appointments

        // @Dipto response.data.conflicts is an array with course titles that have conflicts (all unique)
        const conflictResponse = response.data.conflicts

        // Create and store the ics data of the returned schedule
        const { error, value } = ics.createEvents(icsData(response.data.appointments, response.data.sem))
        console.log(error)

        props.setScheduleData(scheduleResponse)
        props.setConflictData(conflictResponse)
        props.setExportData(value)

        // console.log(scheduleResponse)
        // console.log(conflictResponse)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
    navigate('/')
  }

  const clearSchedule = () => {
    props.setConflictData([])
    props.setScheduleData([])
    props.setChosenCourses([])
  }

  return (
              <div className="pt-5 pb-2 mx-2 d-flex justify-content-between">
                  <Button
                      onClick={sendSchedule}
                      style={{
                        backgroundColor: '#5F3471',
                        border: '#5F3471'
                      }}
                  >
                      Create Schedule
                  </Button>
                  <Button
                      onClick={clearSchedule}
                      style={{
                        backgroundColor: '#D4456F',
                        border: '#D4456F'
                      }}
                  >
                      Clear Schedule
                  </Button>
              </div>
  )
}
export default ScheduleButtons
