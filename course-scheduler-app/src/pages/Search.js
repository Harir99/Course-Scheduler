import { React } from 'react/react-in-jsx-scope'
import TextField from '@mui/material/TextField'
import List from './List'
import '../App.css'

function SearchCourse () {
  return (
    <div className="main text-center text-white">
      <h1>Search Course</h1>
      <div className="search text-white">
      <TextField sx={{ input: { color: 'white', fontSize: 25 } }} fullWidth label="Search" color="secondary" focused />
      </div>
      <List />
    </div>
  )
}

export default SearchCourse
