import React,{Component} from 'react';
//import ReactDOM from 'react-dom';
import Itinerary from './Itinerary.jsx';
// import AllCalendarEvents from './AllCalendarEvents'

export default class CalAPICont extends Component{
  constructor(props){
    super(props)

    this.state = {
      all_events: [],
      listUpcomingEvents: this.listUpcomingEvents
    }
    this.API_KEY='AIzaSyAumnE5AAGlwEN3upr12zjMLKPw7Z1BPDU'
    this.CLIENT_ID='524281801147-7p3q0uvbt5pq3ptddsfrc6lfrrd7efh5.apps.googleusercontent.com'
    this.DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];
    this.SCOPES = "https://www.googleapis.com/auth/calendar";
  }

  componentDidMount = ()=>{
    this.load_google_api()
  }

  load_google_api = () => {
    const script = document.createElement("script");
    script.src = "https://apis.google.com/js/api.js";
    document.body.appendChild(script);

    script.addEventListener("load",() => {
      window.gapi.load('client:auth2', this.initClient);
    })
  }


  initClient = () => {
    //let listUpcomingEvents = this.listUpcomingEvents
    gapi.client.init({
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      discoveryDocs: this.DISCOVERY_DOCS,
      scope: this.SCOPES
    }).then(()=>{
      if(gapi.auth2.getAuthInstance().isSignedIn.get()){
        this.listUpcomingEvents()
      }
    });
  }

  listUpcomingEvents =()=>{
    gapi.client.calendar.events.list({
      'calendarId': '0ebaddf129c7ars64fhihg9cv0@group.calendar.google.com',
      'timeMin': (new Date()).toISOString(),
      'showDeleted': false,
      'singleEvents': true,
      'maxResults': 10,
      'orderBy': 'startTime'
    }).then((response)=>{
      // var container = document.getElementById('itineraryItems')
      //ReactDOM.render(<AllCalendarEvents all_events={response['result']['items']}/>, container)
      this.setState({
        all_events: response['result']['items']
      })
    })
  }


  
  render(){
    return <Itinerary {...this.state} />
  }
}