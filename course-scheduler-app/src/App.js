import './App.css'
import React, { useState, useEffect } from 'react'
import { Container, Navbar, Nav } from 'react-bootstrap'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import AvailableCourses from './pages/availableCourses'
import CreateSchedule from './pages/createSchedule'
// import { List } from 'react-bootstrap-icons'

function App () {
  // variable that stores the fetched courseData and its setter function, sets it to the current DOM state
  const [courseData, setCourseData] = useState([])
  // holds all chosen courses for schedule
  const [chosenCourses, setChosenCourses] = useState(() => {
    const saved = localStorage.getItem('chosenCourses')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  // information for redirecting search
  // const [search, setSearch] = useState([])
  // holds the 5 suggested courses
  const [suggestedCourses, setSuggestedCourses] = useState([])
  // holds course scheduling data
  const [scheduleData, setScheduleData] = useState(() => {
    const saved = localStorage.getItem('scheduleData')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  // holds conflict data
  const [conflictData, setConflictData] = useState(() => {
    const saved = localStorage.getItem('conflictData')
    const initialValue = JSON.parse(saved)
    return initialValue || []
  })

  // holds semester data
  const [currentSem, setCurrentSem] = useState(() => {
    const saved = localStorage.getItem('currentSem')
    const initialValue = JSON.parse(saved)
    return initialValue || 'Fall 2022'
  })

  // holds export data
  const [exportData, setExportData] = useState(() => {
    const saved = localStorage.getItem('exportData')
    const initialValue = saved
    return initialValue || ''
  })
  // need to figure out how to update the button to say added in this function
  const addCourse = (event) => {
    if (!chosenCourses.includes(event.target.value)) {
      setChosenCourses(chosenCourses => [...chosenCourses, event.target.value])
    }
  }
  const deleteCourse = (event) => {
    setChosenCourses((chosenCourses) =>
      chosenCourses.filter((chosenCourse) => chosenCourse !== event.target.value)
    )
    setScheduleData((scheduleData) =>
      scheduleData.filter((data) => data.full_title !== event.target.value)
    )
  }
  // need to figure out how to update the button to say added in this function
  const selectSemester = (event) => {
    setCurrentSem(event.currentTarget.value)
    setSuggestedCourses([])
    setChosenCourses([])
    setConflictData([])
    setScheduleData([])
    setExportData('')
  }

  // Exporting ics file
  const downloadIcs = () => {
    const element = document.createElement('a')
    const file = new Blob([exportData], { type: 'text/plain' })
    element.href = URL.createObjectURL(file)
    element.download = 'data.ics'
    document.body.appendChild(element) // Required for this to work in FireFox
    element.click()
  }

  useEffect(() => {
    // storing the data for schedule
    localStorage.setItem('scheduleData', JSON.stringify(scheduleData))
  }, [scheduleData])

  useEffect(() => {
    // storing the data for the chosen course
    localStorage.setItem('chosenCourses', JSON.stringify(chosenCourses))
  }, [chosenCourses])

  useEffect(() => {
    // storing the data for the conflicts
    localStorage.setItem('conflictData', JSON.stringify(conflictData))
  }, [conflictData])

  useEffect(() => {
    // storing the data for the schedule component
    localStorage.setItem('exportData', exportData)
  }, [exportData])
  return (
      <div>
               <nav className="navbar navbar-expand-lg navbar-dark shadow-5-strong">
              <div className="container-fluid">
                  <a className="navbar-brand" href="/"><img src="/assets/assets/img/logo6.png" height="60" alt="CIS3760 TEAM 104"/></a>
                  {/*
                  <div className="collapse navbar-collapse" id="navbarSupportedContent">
                      <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                          <li className="nav-item">
                              <a className="nav-link active" aria-current="page" href="/">Create Schedule</a>
                          </li>
                          <li className="nav-item">
                              <a className="nav-link" href="/availableCourses">Available Courses</a>
                          </li>
                      </ul>
                  </div>
                  */}
                  <Navbar expand="lg">
                      <Container>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <Navbar.Collapse id="basic-navbar-nav">
                              <Nav className="navbar-nav me-auto mb-2 mb-lg-0">
                                 <strong><Nav.Link className="nav-link active text-gradient" aria-current="page" href="/">Create Schedule</Nav.Link></strong>
                                  <strong><Nav.Link className="nav-link text-gradient" href="/availableCourses">Available Courses</Nav.Link></strong>
                              </Nav>
                          </Navbar.Collapse>
                      </Container>
                  </Navbar>

                  {/*
                  <Navbar>
                      <Container>
                          <Navbar.Brand href="/"> <img src="/assets/assets/img/logo4.png" height="60" alt="CIS3760 TEAM 104"/></Navbar.Brand>
                          <Navbar.Toggle aria-controls="basic-navbar-nav" />
                          <div className="dropdown navbar-right ms-6">
                              <button className="dropbtn"><List className="text-white" size={30}/></button>
                              <div className="dropdown-content on-top">
                                  <a href="/">Create Schedule</a>
                                  <a href="/availableCourses">Available Courses</a>
                              </div>
                          </div>
                      </Container>
                  </Navbar>
                  */}
              </div>
          </nav>
        <Router>
          <Routes>
            <Route
              path="/availableCourses"
              element={
              <AvailableCourses
                chosenCourses={chosenCourses}
                conflictData={conflictData}
                setScheduleData={setScheduleData}
                deleteCourse={deleteCourse}
                currentSem={currentSem}
                setCurrentSem={setCurrentSem}
                setChosenCourses={setChosenCourses}
                setConflictData={setConflictData}
                addCourse={addCourse}
                setExportData={setExportData}
                downloadIcs={downloadIcs}
              />}
            />
            <Route
              path="/"
              element={
              <CreateSchedule
                courseData={courseData}
                setCourseData={setCourseData}
                chosenCourses={chosenCourses}
                setChosenCourses={setChosenCourses}
                suggestedCourses={suggestedCourses}
                setSuggestedCourses={setSuggestedCourses}
                scheduleData={scheduleData}
                setScheduleData={setScheduleData}
                conflictData={conflictData}
                setConflictData={setConflictData}
                currentSem={currentSem}
                addCourse={addCourse}
                deleteCourse={deleteCourse}
                selectSemester={selectSemester}
                exportData={exportData}
                setExportData={setExportData}
                downloadIcs={downloadIcs}
              />
              } />
          </Routes>
        </Router>
      </div>
  )
}
export default App
