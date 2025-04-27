import { React } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import '../index.css'

function ChosenList (props) {
  // Ensuring no duplicate courses
  // (in case of multiple selection of a single section)
  const chosen = []
  props.chosen.forEach((title) => {
    if (!chosen.includes(title)) {
      chosen.push(title)
    }
  })

  // Creating button
  let title
  if (chosen.length > 0) {
    title = (
            <div>
                <hr /> <h4 className="text-purple"> Selected Courses</h4>
            </div>
    )
  } else {
    title = null
  }

  // Function to check if the course is conflicting and changing background color
  function checkConflict (item) {
    let conFlag = 0
    for (let j = 0; j < props.conflict.length; j++) {
      if (item.includes(props.conflict[j].split(' ')[0])) {
        conFlag = 1
      }
    }

    if (conFlag === 1) {
      return (
                <ListGroup.Item key={item} style={{ backgroundColor: 'red', color: 'white' }}>
                    <Card.Body>
                        <Card.Text>
                            {item}
                        </Card.Text>
                            <Button
                                value={item}
                                onClick={props.deleteCourse}
                                size="sm"
                                style={{
                                  backgroundColor: '#84428C',
                                  border: '#84428C'
                                }}
                            >
                                Delete Course
                            </Button>
                    </Card.Body>
                </ListGroup.Item>
      )
    } else {
      return (
                <ListGroup.Item key={item}>
                    <Card.Body>
                        <Card.Text>
                            {item}
                        </Card.Text>
                        <Button
                            value={item}
                            onClick={props.deleteCourse}
                            size="sm"
                            style={{
                              backgroundColor: '#84428C',
                              border: '#84428C'
                            }}
                        >
                            Delete Course
                        </Button>
                    </Card.Body>
                </ListGroup.Item>
      )
    }
  }

  return (
        <div>
            {title}
            <Card className={`text-center ${(props.chosen.length !== 0) ? 'scrollable' : ''}`}>
                <ListGroup variant="flush">
                    {chosen.map((item) => (
                      checkConflict(item)
                    )
                    )}
                </ListGroup>
            </Card>
        </div>

  )
}

export default ChosenList
