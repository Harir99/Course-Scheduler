import React, { useEffect, useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { Container, Row, Col, InputGroup, Form, Button, ButtonGroup } from 'react-bootstrap'
import DevExpressSchedule from './DevExpressSchedule'
import BinarySearch from '../functions/BinarySearch'
import SuggestList from './SuggestList'
import ChosenList from './ChosenList'
import axios from 'axios'
import ScheduleButtons from './ScheduleButtons'
import { GetApp } from '@mui/icons-material'
import { IconButton } from '@mui/material'
import { NavLink } from 'react-router-dom'

function CreateSchedule (props) {
  // all state variables passed into this child component
  const courseData = props.courseData
  const setCourseData = props.setCourseData
  const chosenCourses = props.chosenCourses
  const setChosenCourses = props.setChosenCourses
  const suggestedCourses = props.suggestedCourses
  const setSuggestedCourses = props.setSuggestedCourses
  const scheduleData = props.scheduleData
  const setScheduleData = props.setScheduleData
  const conflictData = props.conflictData
  const setConflictData = props.setConflictData
  const currentSem = props.currentSem
  const addCourse = props.addCourse
  const deleteCourse = props.deleteCourse
  const selectSemester = props.selectSemester
  const setExportData = props.setExportData
  const downloadIcs = props.downloadIcs

  // fetches courseData Titles on first load/page reload
  useEffect(() => {
    localStorage.setItem('currentSem', JSON.stringify(currentSem))
    fetchCourseData()
  }, [currentSem])

  const fetchCourseData = async () => {
    axios({
      method: 'POST',
      url: '/api/getCourseTitles',
      data: {
        chosenSem: currentSem
      }
    })
      .then((response) => {
        // sets the response variable to it's corresponding state variable
        const courseResponse = response.data
        setCourseData(courseResponse)
      }).catch((error) => {
        if (error.response) {
          console.log(error.response)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      })
  } // when you want this call to be updated, add the state varaible within the array that when they are changed, this data is updated

  // finds 5 courses for suggestions
  const autofillSuggestions = (event) => {
    let nextSuggestion = null
    let numSuggest = 0
    const suggestArray = Array(5)
    // don't suggest anything if there's no input
    if (event.target.value !== '') {
      while (numSuggest < 5) {
        nextSuggestion = BinarySearch(courseData, event.target.value.toUpperCase(), 0, courseData.length - 1, suggestArray)
        if (nextSuggestion != null) {
          suggestArray[numSuggest] = nextSuggestion
          numSuggest++
          nextSuggestion = null
        } else {
          numSuggest = 5
        }
      }
      setSuggestedCourses(suggestArray)
    } else {
      // user deleted the input, clear suggestions
      setSuggestedCourses([])
    }
  }
  const componentRef = useRef()
  return (
        <div>
            <br></br>
            {/* Navigation Bar */}
            <Container fluid>
                <Row>
                    <Col>
                        {/* Semester Choice */}
                        <ButtonGroup className="mb-2">
                            <Button
                                value='Fall 2022'
                                onClick={selectSemester}
                                style={{
                                  backgroundColor: (currentSem === 'Fall 2022') ? '#5F3471' : 'white',
                                  // borderColor: (currentSem === 'Fall 2022') ? '#84428C' : 'white',
                                  borderColor: '#84428C',
                                  color: (currentSem === 'Fall 2022') ? 'white' : 'black'
                                }}
                            >
                                Fall 2022
                            </Button>
                            <Button
                                value='Winter 2023'
                                onClick={selectSemester}
                                style={{
                                  backgroundColor: (currentSem === 'Winter 2023') ? '#5F3471' : 'white',
                                  // borderColor: (currentSem === 'Winter 2023') ? '#84428C' : 'white',
                                  borderColor: '#84428C',
                                  color: (currentSem === 'Winter 2023') ? 'white' : 'black'
                                }}
                            >
                                Winter 2023
                            </Button>
                        </ButtonGroup>
                        <br/>
                        {/*
                        <Button style={{ backgroundColor: 'white', borderColor: '#84428C', color: 'black' }}> {'Print ' + currentSem + ' Schedule'} </Button>
                        */}
                        <ReactToPrint
                            trigger={() => <IconButton color="primary" aria-label="upload picture" component="label">
                                <Button style={{ backgroundColor: 'white', borderColor: 'transparent', color: '#5F3471' }}>
                                    <GetApp className="me-2" size={20}/>
                                </Button>
                                <h6 className="text-purple" >{'Print ' + currentSem + ' Schedule'}</h6>
                            </IconButton>}
                            content={() => componentRef.current}
                        />
                        <IconButton color="primary" aria-label="upload picture" component="label">
                          <Button onClick={downloadIcs} style={{ backgroundColor: 'white', borderColor: 'transparent', color: '#5F3471' }}>
                            <GetApp className="me-2" size={20}/>
                          </Button>
                          <h6 className="text-purple" >{'Export ' + currentSem + ' Schedule to ICS'}</h6>
                        </IconButton>
                        <br/>
                        <br/>
                        {/* Search Course Input */}
                        <h4 className="text-purple">Search Courses</h4>
                        <NavLink className="text-purple" to="/availableCourses"> Advanced Search</NavLink>
                        <InputGroup>
                            <Form.Control
                                placeholder="CIS*3760*101"
                                aria-label="SearchCourse"
                                aria-describedby="basic-addon1"
                                style={{ borderColor: '#5F3471' }}
                                onChange={autofillSuggestions}
                            />
                        </InputGroup>
                        {/* Search Auto Suggestions */}
                        <SuggestList suggestions={suggestedCourses} chosen={chosenCourses.length} addCourse={addCourse}/>
                        {/* Chosen Courses Display */}
                        <ChosenList chosen={chosenCourses} conflict={conflictData} setScheduleData={setScheduleData} setConflictData={setConflictData} deleteCourse={deleteCourse} Semester={currentSem} setChosenCourses={setChosenCourses}/>
                        <ScheduleButtons chosen={chosenCourses} conflict={conflictData} setScheduleData={setScheduleData} setConflictData={setConflictData} deleteCourse={deleteCourse} Semester={currentSem} setChosenCourses={setChosenCourses} setExportData={setExportData} ref={componentRef}/>
                    </Col>
                    <Col md={9}>
                        <DevExpressSchedule ref={componentRef} appointments={scheduleData}/>
                    </Col>
                </Row>
            </Container>
        </div>
  )
}
export default CreateSchedule
