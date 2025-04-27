import { React } from 'react'
import { Button, Card, ListGroup } from 'react-bootstrap'
import '../index.css'

function SuggestList (props) {
  if (props.chosen < 5) {
    return (
            <Card className={`text-left ${(props.suggestions.length !== 0) ? 'scrollable' : ''}`}>
                <ListGroup variant="flush">
                    {props.suggestions.map((item) => (
                        <ListGroup.Item key={item}>
                                <Card.Body>
                                    <Card.Text>
                                        {item}
                                    </Card.Text>
                                        <Button value={item}
                                                onClick={props.addCourse}
                                                size="sm"
                                                style={{
                                                  backgroundColor: '#84428C',
                                                  border: '#84428C'
                                                }}>
                                            Add Course
                                        </Button>
                                </Card.Body>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Card>
    )
  }
}

export default SuggestList
