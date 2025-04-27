import React from 'react'
import Paper from '@mui/material/Paper'
import { Container, Row } from 'react-bootstrap'
import { ViewState } from '@devexpress/dx-react-scheduler'
import {
  Scheduler,
  WeekView,
  Appointments,
  AppointmentTooltip
} from '@devexpress/dx-react-scheduler-material-ui'
// import { appointments } from '../demo-data/data'; // Used for testing purposes only
import { BsFillHouseFill, BsFillClockFill, BsFillCalendarCheckFill } from 'react-icons/bs'
import moment from 'moment'
import CourseData from '../functions/CourseData'
// import { styled } from '@mui/system'

// Used to format the date to only display the day of the week  (i.e Sunday, Monday, etc)
const formatDate = (date, options) => {
  const momentDate = moment(date)
  const { weekday } = options
  return momentDate.format(weekday ? 'dddd' : 'hh:mm a')
}

const AppointmentTooltipLayout = ({ style, ...restProps }) => {
  return (
    <AppointmentTooltip.Layout // Renders Appointment Tooltip Layout
      style={{
        ...style,
        color: '#ff8f00'
      }}
      {...restProps}
      formatDate={formatDate} // Specifies the format of the date
    />
  )
}

// A component that renders an element which indicates the appointment is divided.
const AppointmentContent = (props) => {
  // data: Object that specifies appointment data
  // style:  React.CSSProperties
  const { data, style } = props
  return (
    <Appointments.AppointmentContent

    style={{
      ...style,
      // background color for the upper half of the Appointment
      backgroundColor: data.color // Allows us to override the background color...
      // Each appointment has a color
    }}
      {...props}
    />
  )
}

//  A component that renders an appointment.
const Appointment = ({ children, style, data, ...restProps }) => (
  <Appointments.Appointment
    {...restProps}

    data={data} // Shows the appointment data in the Appoinment Tooltip

    style={{ //  React.CSSProperties
      ...style,
      // background color for the lower half of the Appointment
      backgroundColor: data.color //  Allows us to override the background color...
    }}
  >
    {children}
  </Appointments.Appointment>
)

// Used to format the date to only display the day of the week  (i.e Sunday, Monday, etc)
const formatDayScale = (date, options) => {
  const momentDate = moment(date)
  const { weekday } = options
  return momentDate.format(weekday ? ' ' : 'dd')
}

const DateScaleCell = ({ ...restProps }) => {
  return (
    <WeekView.DayScaleCell
      {...restProps}
      formatDate={formatDayScale}
    />
  )
}

const TimeTableCell = (style, ...restProps) => {
  return <WeekView.TimeTableCell {...restProps}
   style={{
     height: 100
   }}
  />
}
const TickCell = (style, ...restProps) => {
  return <WeekView.TimeScaleTickCell {...restProps}
   style={{
     height: 100,
     lineHeight: 98,
     '&:firstChild': {
       height: 50
     },
     '&:lastChild': {
       height: 50
     }
   }}
  />
}
const TimeLabel = (props) => {
  return <WeekView.TimeScaleLabel {...props}
  style={{
    height: 100
  }}

  />
}
const Content = ({ children, style, appointmentData, ...restProps }) => (
   <Container fluid className="pb-5">
     <Row className="pb-5">
      <h2 className='px-5'>{appointmentData.title}</h2>
     </Row>
     <Row>
      <h4 className='px-5'><BsFillHouseFill/> &nbsp; {appointmentData.location}</h4>
     </Row>
     <Row >
      <h4 className='px-5'> <BsFillCalendarCheckFill/> &nbsp; {moment(appointmentData.startDate).format('dddd')}</h4>
     </Row>
     <Row >
      <h4 className='px-5'> <BsFillClockFill/> &nbsp; {moment(appointmentData.startDate).format('hh:mm a')} - {moment(appointmentData.endDate).format('hh:mm a')} </h4>
     </Row>
   </Container>
)

const DevExpressSchedule = React.forwardRef(function DevExpressSchedule (props, componentRef) {
  // Converting course scheduling json data into a format so that the
  // Schedular component can use it to print the course in the calendar
  const apptData = CourseData(props.appointments)
  return (
    <>
    <Paper ref={componentRef}>
    <style type="text/css" media="print">{'@page {margin: 0cm;size: landscape;}'}</style>
      <Scheduler data={apptData} locale={'en-US'}>
        <ViewState currentDate="2022-05-01" />

        {/* Renders the Scheduler's week view... 8:00 am to 11:00 pm */ }
        <WeekView
          startDayHour={8}
          endDayHour={23}
          cellDuration={60}
          timeTableCellComponent={TimeTableCell}
          timeScaleLabelComponent={TimeLabel}
          timeScaleTickCellComponent={TickCell}
          dayScaleCellComponent={DateScaleCell}
          />

        {/* Renders the Appointments */}
        <Appointments
          appointmentComponent={Appointment}
          appointmentContentComponent={AppointmentContent}
          />

        {/* Allows you to display information about an appointment in a tooltip. */}
        <AppointmentTooltip
          showCloseButton
          layoutComponent={AppointmentTooltipLayout}
          contentComponent={Content}
          />

      </Scheduler>
    </Paper>
    </>
  )
})

export default DevExpressSchedule
