import { Table } from 'react-bootstrap'
import React from 'react'

const BasicExample = ({ data }) => {
  const courses = data

  return (
    <div className="App">

      <Table striped bordered hover variant="light" id="dataTable">
        <thead>
          <tr>
            <th>Term</th>
            <th>Section</th>
            <th>Status</th>
            <th>Capacity</th>
            <th>Faculty</th>
            <th>Credits</th>
          </tr>
        </thead>
        <tbody>
        {courses.map((val, key) => {
          return (
            <tr key={key}>
              <td>{val.Term}</td>
              <td>{val.Section}</td>
              <td>{val.Status}</td>
              <td>{val.Capacity}</td>
              <td>{val.Faculty}</td>
              <td>{val.Credits}</td>
            </tr>
          )
        })}
        </tbody>
      </Table>
    </div>
  )
}
export default (BasicExample)
