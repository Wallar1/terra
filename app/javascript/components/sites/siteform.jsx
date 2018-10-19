import React,{Component, Fragment} from 'react'
import {HouseBtn} from './house_btn'


export default class SiteForm extends Component{

  constructor(props){
    super(props)
  }

  render_delete = () => {
    if(this.props.id){
      return <a data-confirm="Are you sure you want to delete this site?" class="text-white btn btn-danger" rel="nofollow" data-method="delete" href={`/sites/${this.props.id}`}>Delete</a>
    }
    return
  }

  // change_stage = (e)=>{
  //   this.setState({stage: e.target.value})
  // }

  render(){
    return (
      <Fragment>
        <div className="row gap-20 masonry pos-r"></div>
        <div className="masonry-item col-md-12">
          <div className="bgc-white p-20 bd">
            <h6 className="c-grey-900">
              <p> New Customer </p>
            </h6>
            <div className="mT-30">
              <form key={this.props.current_position.lat} id="site_form" acceptCharset="UTF-8" method="patch">
                <input name="utf8" type="hidden" value="✓" onChange={this.props.changeForm}/>
                <input type="hidden" name="lat" id="site_lat" value={this.props.current_position.lat} onChange={this.props.changeForm}/>
                <input type="hidden" name="long" id="site_long" value={this.props.current_position.lng} onChange={this.props.changeForm}/>
                <div className="form-row">
                  <div className="form-group">
                    <label>Stage</label>
                    <div className='d-flex'>
                      <HouseBtn stage='call_back' name="icon_url" changeForm={this.props.changeForm}/>
                      <HouseBtn stage='go_back' name="icon_url" changeForm={this.props.changeForm}/>
                      <HouseBtn stage='not_home' name="icon_url" changeForm={this.props.changeForm}/>
                      <HouseBtn stage='not_interested' name="icon_url" changeForm={this.props.changeForm}/>
                      <HouseBtn stage='renter' name="icon_url" changeForm={this.props.changeForm}/>
                      <HouseBtn stage='not_qualified' name="icon_url" changeForm={this.props.changeForm}/>
                      <HouseBtn stage='under_contract' name="icon_url" changeForm={this.props.changeForm}/>
                    </div>
                  </div>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>First Name</label>
                    <input className="form-control" type="text" name="first_name" id="site_first_name" value={this.props.first_name} onChange={this.props.changeForm}/>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Last Name</label>
                    <input className="form-control" type="text" name="last_name" id="site_last_name" value={this.props.last_name} onChange={this.props.changeForm}/>
                  </div>
                </div>
                <div className="form-group">
                  <label>Full Address</label>
                  <input className="form-control" placeholder="ex: 1234 Main St, San Fransisco, CA, USA" type="text" name="address" id="site_address" value={this.props.address} onChange={this.props.changeForm}/>
                </div>
                <div className="form-row">
                  <div className="form-group col-md-6">
                    <label>Email</label>
                    <input name="emails[]" type="hidden" value={this.props.emails} onChange={this.props.changeForm}/>
                    {/*
                    <div className="bootstrap-tagsinput">
                      <MyInput type="text" placeholder="" />
                    </div>
                  */}
                    <select multiple="multiple" data-role="tagsinput" name="emails[]" id="site_emails" style={{display: 'none'}}></select>
                  </div>
                  <div className="form-group col-md-6">
                    <label>Phone</label>
                    <input className="form-control" type="text" name="phone" id="site_phone" value={this.props.phone} onChange={this.props.changeForm}/>
                  </div>
                </div>
                <div className="form-group">
                  <label>Notes</label>
                  <textarea className="form-control" rows="5" name="notes" id="site_notes" value={this.props.notes} onChange={this.props.changeForm}/>
                </div>





                {/*
                  <MySelect label="Stage" options={{call_back: 'Call Back', go_back: 'Go Back'}} value='go_back' />
                <div className="form-group">
                  <label>Stage Change</label>
                  <select className="form-control" onChange={this.change_stage} value={this.props.stage}>
                      - CB Call Back - phone
                      - GB Go Back - refresh
                      - APPT Appointment set - calendar
                      - NH Not Home - ?
                      - NI Not Interested - X
                      - RENT Renter - X
                      - NQ Not Qualified - X
                      - UC Under Contract - Document
                      - CL Closed Business  - check mark
                      - SOL Sold - sun
                      - INS Installed already - smiley
                    <option value=""></option>
                    <option value="call_back">Call Back</option>
                    <option value="go_back">Go Back</option>
                    <option value="appointment_set">Appointment Set</option>
                    <option value="not_home">Not Home</option>
                    <option value="not_interested">not_interested</option>
                    <option value="renter">Renter</option>
                    <option value="not_qualified">Not Qualified</option>
                    <option value="under_contract">Under Contract</option>
                    <option value="closed_business">closed_business</option>
                    <option value="sold">Sold</option>
                    <option value="installed_already">Installed Already</option>
                  </select>
                </div>*/}
                <div className="d-flex justify-content-around">
                  <button name="commit" className="btn btn-primary" onClick={this.props.submit}> Save Customer </button>
                  {this.render_delete()}
                  {/*<a data-confirm="Are you sure you want to delete this site?" class="text-white btn btn-danger" rel="nofollow" data-method="delete" href="/sites/1">Delete</a>*/}
                </div>
              </form>
            </div>
          </div>
        </div>
      </Fragment>
    )
  }
}