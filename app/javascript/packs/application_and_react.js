import './masonry';
import './charts';
import './popover';
import './scrollbar';
import './search';
import './sidebar';
import './skycons';
import './chat';
import './datatable';
import './datepicker';
import './email';
import './fullcalendar';
import './googleMaps';
import './utils';
import ReactOnRails from 'react-on-rails';
import ItineraryContainer from '../components/calendars/ItineraryContainer';
import GoogleMap from '../components/maps/google_map';
import GoogleGeolocation from '../components/maps/google_geolocation';
import {HouseBtn} from '../components/sites/house_btn'



// This is how react_on_rails can see the HelloWorld in the browser.
ReactOnRails.register({
  ItineraryContainer,
  GoogleMap,
  GoogleGeolocation,
  HouseBtn
});