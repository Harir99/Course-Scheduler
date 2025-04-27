import axios from 'axios'
import React, { useState, useEffect, useRef } from 'react'
import DisplayFilterCourses from './DisplayFilterCourses'
import { Row, Col, Container, Button, Card } from 'react-bootstrap'
import { TimePicker } from 'antd'
import moment from 'moment'
import MuiToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import { Switch, FormControlLabel } from '@mui/material'
import { styled } from '@mui/material/styles'
import ChosenList from './ChosenList'
import ScheduleButtons from './ScheduleButtons'
import { NavLink } from 'react-router-dom'
function range (start, end) {
  // From https://codepen.io/layaa963/pen/QPpRRQ
  const result = []
  for (let i = start; i < end; i++) {
    result.push(i)
  }
  return result
}
const ToggleButton = styled(MuiToggleButton)(({ selectedcolor }) => ({
  '&.Mui-selected, &.Mui-selected:hover': {
    color: 'white',
    backgroundColor: selectedcolor
  }
}))

function disabledRangeTime (_, type) {
  // From https://codepen.io/layaa963/pen/QPpRRQ
  if (type === 'start') {
    return {
      disabledHours: () => range(0, 8)
    }
  }
  return {
    disabledHours: () => range(0, 8)
  }
}

function AvailableCourses (props) {
  const ref1 = useRef(null)
  const ref2 = useRef(null)
  const [endTime, setEndTime] = useState('')
  const [startTime, setStartTime] = useState('')
  const formatTime = (time) => {
    setStartTime(moment(time[0].$d).format('hh:mm a'))
    setEndTime(moment(time[1].$d).format('hh:mm a'))
    console.log(startTime + ' ' + endTime)
  }

  const [value, setValue] = React.useState([])
  const [time, setTime] = useState(null)
  const [isDE, setIsDE] = useState(false)
  // all state variables passed into this child component
  const chosenCourses = props.chosenCourses
  const conflictData = props.conflictData
  const setScheduleData = props.setScheduleData
  const deleteCourse = props.deleteCourse
  const setChosenCourses = props.setChosenCourses
  const setConflictData = props.setConflictData
  const currentSem = props.currentSem
  const setSemester = props.setCurrentSem
  const setExportData = props.setExportData

  const handleDE = event => {
    if (event.target.checked) {
      console.log('True')
    } else {
      console.log('False')
    }
    setIsDE(current => !current)
  }

  const handleTimeChange = (time) => {
    console.log(time)
    setTime(time)

    if (time !== null) {
      formatTime(time)
    } else {
      console.log('HELLLO')
      setEndTime('')
      setStartTime('')
    }
  }

  const handleChange = (event, val) => {
    // console.log(val)
    setValue(val)
  }
  const [subject, setSubject] = useState({ value: '' })

  const handleSubject = (evt) => {
    setSubject({ value: evt.target.value })
    // console.log(subject)
  }
  const [professor, setProfessor] = useState({ value: '' })

  const handleProf = (evt) => {
    setProfessor({ value: evt.target.value })
    // console.log(professor)
  }

  const handleSemester = (event, semester) => {
    //  console.log(semester)
    setSemester(semester)
  }
  const clearFilter = (event) => {
    setValue([])
    setSemester('Fall 2022')
    setTime(null)
    setSubject({ value: '' })
    setProfessor({ value: '' })
    setIsDE(false)
    ref1.current.value = ''
    ref2.current.value = ''
  }

  const [courses, setCourses] = useState([])
  const fetchCoursesData = async () => {
    axios({
      method: 'POST',
      url: '/api/getCourseData',
      data: {
        chosenSem: currentSem
      }
    })
      .then((response) => {
        // sets the response variable to it's corresponding state variable
        const courseResponse = response.data
        setCourses(courseResponse)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }
  useEffect(() => {
    fetchCoursesData()
  }, [])
  const postData = {
    search: {
      semester: currentSem,
      subject: subject.value,
      days: value,
      prof: professor.value,
      start_time: startTime,
      end_time: endTime,
      de: isDE
    }
  }
  const sendFilters = async () => {
    console.log(postData)
    axios
      .post('/api/getFilteredCourses', postData)
      .then((response) => {
        const filterResponse = response.data
        console.log(filterResponse)
        setCourses(filterResponse)
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  }

  return (
      <Container fluid>
    <Row className="mb-2 ms-4 py-5">
    <Col xs={6} md={4}>
    <Row>
      <h3 className="justify-content-center center py-3 text-purple">Advanced Search</h3>
      <NavLink className="text-purple" to="/"> Quick Search</NavLink>
      <Card>
            <ToggleButtonGroup className="justify-content-center py-5" type="radio" name="options" value={currentSem} exclusive onChange={handleSemester} defaultValue={'Fall 2022'}>
              <ToggleButton id="sem-1" value={'Fall 2022'} selectedcolor="#5F3471">
                Fall 2022
              </ToggleButton>
              <ToggleButton id="sem-2" value={'Winter 2023'} selectedcolor="#5F3471">
                Winter 2023
              </ToggleButton>
            </ToggleButtonGroup>
            <ToggleButtonGroup className="justify-content-center" type="checkbox" value={value} onChange={handleChange}>
              {/* purple = #84428C, #BF3467, #D92949, #D92938, #b01f2c */}
              <ToggleButton id="Mon" value={'Mon'} selectedcolor="#5F3471">
                Mon
              </ToggleButton>
              <ToggleButton id="Tues" value={'Tues'} selectedcolor="#5F3471">
                Tues
              </ToggleButton>
              <ToggleButton id="Wed" value={'Wed'} selectedcolor="#5F3471">
                Wed
              </ToggleButton>
              <ToggleButton id="Thur" value={'Thur'} selectedcolor="#5F3471">
                Thur
              </ToggleButton>
              <ToggleButton id="Fri" value={'Fri'} selectedcolor="#5F3471">
                Fri
              </ToggleButton>
            </ToggleButtonGroup>
            <Row className="me-2 ms-4 py-5">
              <TimePicker.RangePicker
                  disabledTime={disabledRangeTime }
                  hideDisabledOptions
                  // allowClear
                  value={time}
                  onChange={handleTimeChange}
                  use12Hours
                  format={'hh: mm: a'}
                  minuteStep={15}
                  bordered />
            </Row>
            <hr />
            <Row className="ms-4">
              <div className="wrapper">
                <input ref={ref1} onChange={handleSubject} className="input form-control form-control-sm" type="text" placeholder="Subject (i.e CIS)" aria-label="Subject" />
              </div>
            </Row>
            <Row className="mb-2 ms-4 py-2">
              <div className="wrapper">
                <input ref={ref2} onChange={handleProf} className="input form-control form-control-sm" type="text" placeholder="Professor LastName" aria-label="Professor" />
              </div>
            </Row>
          <FormControlLabel
              value={isDE}
              onChange={handleDE}
              id="DE"
              name="DE"
              className="ms-4"
              control={
                <Switch color="secondary"/>
              } label="Distance Education"/>
      </Card>
      <Row className="ms-1 py-4 justify-content-center">
      < Col>
      <div className="d-grid gap-2">
      <Button onClick={sendFilters} className="bg-purple" size="sm">
          Search
        </Button>{' '}
      </div>
      </Col>
      <Col>
      <div className="d-grid gap-2">
        <Button onClick={() => {
          clearFilter()
          sendFilters()
        }}
        style={{
          backgroundColor: '#D4456F',
          border: '#D4456F'
        }} size="sm">
          Clear
        </Button>{' '}
      </div>
      </Col>
      </Row>
      <ChosenList chosen={chosenCourses} conflict={conflictData} setScheduleData={setScheduleData} setConflictData={setConflictData} deleteCourse={deleteCourse} Semester={currentSem} setChosenCourses={setChosenCourses}/>
      <ScheduleButtons chosen={chosenCourses} conflict={conflictData} setScheduleData={setScheduleData} setConflictData={setConflictData} deleteCourse={deleteCourse} Semester={currentSem} setChosenCourses={setChosenCourses}setExportData={setExportData}/>

    </Row>
      </Col>
      <Col xs={12} md={8}>
      {courses.length > 0 &&
       <DisplayFilterCourses courses={courses} semester={currentSem} addCourse={props.addCourse}/>
      }
      </Col>

    </Row>
  </Container>
  )
}
export default AvailableCourses
