import React from 'react'
import CalendarEvent from './CalendarEvent'

const AllCalendarEvents = (props) => {
  return (
    <div>
      {
        props['all_events'].map(
          (e)=>{
            return <CalendarEvent cal_event={e} key={e.id}/>
          }
        )
      }
    </div>
  )
}


export default AllCalendarEvents;