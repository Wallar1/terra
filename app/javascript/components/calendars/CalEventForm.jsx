import React from 'react'

export default class CalEventForm extends React.Component{
  constructor(props){
    super(props)
  }


  submit_new_event = () => {
    gapi.client.calendar.events.insert({
      'calendarId': '0ebaddf129c7ars64fhihg9cv0@group.calendar.google.com',
      'resource': this.added_event()
    }).then(()=>{
      this.props.listUpcomingEvents()
      this.props.closeModal()
    })
  }

  added_event = () => {
    return {
      'summary': $('input#event_title').val(),
      'description': $('textarea#event_summary').val(),
      'start': {
        'dateTime': moment($('input#start_date').val()).format(),
        'timeZone': 'America/Los_Angeles'
      },
      'end': {
        'dateTime': moment($('input#end_date').val()).format(),
        'timeZone': 'America/Los_Angeles'
      },
    }
  }

  render(){
    return (
      <div>
        <form>
          <div className="form-group">
            <label className="fw-500">Event Title</label>
            <input className="form-control bdc-grey-200" id="event_title"></input>
          </div>
          <div className="row">
            <div className="col-md-6">
              <label className="fw-500">Start</label>
              <div className="timepicker-input input-icon form-group">
                <div className="input-group">
                  <div className="input-group-addon bgc-white bd bdwR-0">
                    <i className="ti-calendar"></i>
                  </div>
                  <input className="form-control bdc-grey-200 start-date" data-provide="datepicker" id="start_date" placeholder="Datepicker" type="text"></input>
                </div>
              </div>
            </div>
            <div className="col-md-6">
              <label className="fw-500">End</label>
              <div className="timepicker-input input-icon form-group">
                <div className="input-group">
                  <div className="input-group-addon bgc-white bd bdwR-0">
                    <i className="ti-calendar"></i>
                  </div>
                  <input className="form-control bdc-grey-200 end-date" data-provide="datepicker" id="end_date" placeholder="Datepicker" type="text"></input>
                </div>
              </div>
            </div>
          </div>
          <div className="form-group">
            <label className="fw-500">Event Summary</label>
            <textarea className="form-control bdc-grey-200" id="event_summary" rows="5"></textarea>
          </div>
          <div className="text-right">
            <div className="btn btn-primary cur-p" onClick={this.submit_new_event}>Done</div>
          </div>
        </form>
      </div>
    )
  }
}
