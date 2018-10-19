import React from 'react'

const CalendarEvent = (props)=>{
  const formatted_date = () =>{
    var datetime = props.cal_event['start']['dateTime']
    var date = props.cal_event['start']['date']
    return datetime ?
      moment(datetime).format('h:mm A ddd, MMM Do, YYYY') :
      moment(date).format('ddd, MMM Do, YYYY')
  } 

  return (
    <li className="bdB peers ai-c justify-content-between fxw-nw p-5">
      <a className="td-n p-20 peers fxw-nw mR-20 peer-greed c-grey-900" data-target="#calendar-edit" data-toggle="modal" href="javascript:void(0);" style={{'maxWidth': '20%'}}>
        <div className="peer mR-15">
          <i className="fa fa-fw fa-clock-o c-red-500"></i>
        </div>
      </a>
      <div className="peer mR-15">
        <span className="fw-600"> {props.cal_event['summary']}</span>
        <div className="c-grey-600">
          <div className="c-grey-700"> {formatted_date()}</div>
          <i> {props.cal_event['creator']['displayName']}</i>
        </div>
      </div>
      <div className="peers mR-15">
        <div className="peer">
          <a className="td-n c-deep-purple-500 cH-blue-500 fsz-md p-5">
            <i className="ti-pencil"></i>
          </a>
        </div>
        <div className="peer">
          <a className="td-n c-red-500 cH-blue-500 fsz-md p-5">
            <i className="ti-trash"></i>
          </a>
        </div>
      </div>
    </li>
  )
}

export default CalendarEvent