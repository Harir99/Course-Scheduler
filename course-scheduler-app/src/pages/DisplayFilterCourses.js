import React from 'react'
import { Card, Row, Container, Button } from 'react-bootstrap'
import { BsFillHouseFill, BsFillClockFill, BsFillCalendarCheckFill } from 'react-icons/bs'
// import { Filter, Search } from 'react-bootstrap-icons'

// import { Grid, Paper, styled } from '@mui/material'

// const Item = styled(Paper)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: theme.spacing(1),
//   textAlign: 'center',
//   color: theme.palette.text.secondary
// }))

function DisplayFilterCourses (props) {
  // const courses = props.courses
  // const semester = props.semester
  // Uncomment if you need to remove the spaces and replace Values "Lecture_Days" with "LectureDays"
  const courses = props.courses.map(item => {
    return Object
      .entries(item)
      .reduce((acc, [key, value]) => {
        return { [key.replace(/\s/g, '')]: value, ...acc }
      }, {})
  })
  return (
    <Container fluid>
          {/* <h3 className="mb-2 ms-4 py-5 color-info">{semester}</h3> */}
          {courses.map((val, key) => {
            return (
              <Row className="py-2" key={key}>
                {/* <Col xs={6}> */}
                  <Card border="dark" style={{ width: '300%', borderColor: '#5F3471' }}>
                    <Card.Body>
                      <div className="ms-4">
                        <Card.Title className="color-info text-purple">
                          {val.Section}{' '}
                        </Card.Title>
                        {val.LectureDays !== ' ' && (
                          <Card.Subtitle className="text-muted">
                            Lecture{' '}
                          </Card.Subtitle>
                        )}
                        {val.LectureDays !== ' ' && (
                          <Card.Text>
                            <BsFillCalendarCheckFill /> Day: {val.LectureDays}
                            <br></br>
                            <BsFillClockFill /> Time: {val.LectureTime}
                            <br></br>
                            <BsFillHouseFill /> Location: {val.LectureLocation}
                            <br></br>
                          </Card.Text>
                        )}
                        {val.SeminarDays !== ' ' && (
                          <Card.Subtitle className="mb-2 text-muted">
                            Seminar{' '}
                          </Card.Subtitle>
                        )}
                        {val.SeminarDays !== ' ' && (
                          <Card.Text>
                            <BsFillCalendarCheckFill /> Day(s):{val.SeminarDays}
                            <br></br>
                            <BsFillClockFill /> Time: {val.SeminarTime}
                            <br></br>
                            <BsFillHouseFill /> Location: {val.SeminarLocation}
                            <br></br>
                          </Card.Text>
                        )}
                        {val.LabDays !== ' ' && (
                          <Card.Subtitle className="mb-2 text-muted">
                            Lab{' '}
                          </Card.Subtitle>
                        )}
                        {val.LabDays !== ' ' && (
                          <Card.Text>
                            <BsFillCalendarCheckFill /> Day(s): {val.LabDays}
                            <br></br>
                            <BsFillClockFill /> Time: {val.LabTime}
                            <br></br>
                            <BsFillHouseFill /> Location: {val.LabLocation}
                            <br></br>
                          </Card.Text>
                        )}
                        {val.ExamDay !== ' ' && (
                          <Card.Subtitle className="mb-2 text-muted">
                            Exam{' '}
                          </Card.Subtitle>
                        )}
                        {val.ExamDay !== ' ' && (
                          <Card.Text>
                            <BsFillCalendarCheckFill /> Day(s): {val.ExamDay}
                            <br></br>
                            <BsFillClockFill /> Time: {val.ExamTime}
                            <br></br>
                            <BsFillHouseFill /> Location: {val.ExamLocation}
                            <br></br>
                          </Card.Text>
                        )}
                        <Card.Subtitle className="mb-2 text-muted">
                          Other Information{' '}
                        </Card.Subtitle>
                        <Card.Text>
                          Name: {val.Faculty}
                          <br></br>
                          Capacity: {val.Capacity}
                          <br></br>
                        </Card.Text>
                        <Button value={val.Section}
                                onClick={props.addCourse}
                                size="sm"
                                style={{
                                  backgroundColor: '#84428C',
                                  border: '#84428C'
                                }}>
                            Add Course
                        </Button>
                      </div>
                    </Card.Body>
                  </Card>
                {/* </Col> */}
              </Row>
            )
          })}
    </Container>
    // <div className="container position-relative">
    //     <div className="row py-5 pe-5 me-5">

  //   </div>
  // </div>
  )
}

export default DisplayFilterCourses
