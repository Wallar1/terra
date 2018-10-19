import React from 'react';
import CalendarEvent from './CalendarEvent'
import SimpleModal from './SimpleModal'


export default class Itinerary extends React.Component{
  constructor(props){
    super(props)
    this.state={
      modal_open: false
    }
  }

  toggle_modal = () => {
    let modal_open = !this.state.modal_open
    this.setState({modal_open})
  }

  close_modal = () => {
    this.setState({modal_open: false})
  }


  render(){
    return (
      <div>
        <div className="bdrs-3 ov-h bgc-white bd">
          <div className="bgc-deep-purple-500 ta-c p-30">
            <h1 className="fw-300 mB-5 lh-1 c-white">
              01
              <span className="fsz-def">st</span>
            </h1>
            <h3 className="c-white">Monday</h3>
          </div>
          <div className="pos-r">
            <button className="mT-nv-50 pos-a r-10 t-2 btn cur-p bdrs-50p p-0 w-3r h-3r btn-warning" onClick={this.toggle_modal} type="button">
              <i className="ti-plus"></i>
            </button>
            <ul className="m-0 p-0 mT-20" id="itineraryItems">
              {this.props.all_events.map((e)=>{
                return <CalendarEvent cal_event={e} key={e.id} />
              })}
            </ul>
          </div>
        </div>
        <SimpleModal modal_open={this.state.modal_open}
                    close_modal={this.close_modal}
                    listUpcomingEvents={this.props.listUpcomingEvents}
        />
      </div>
    )
  }
}