import * as $ from 'jquery';
import 'fullcalendar/dist/fullcalendar.min.js';
import 'fullcalendar/dist/fullcalendar.min.css';

export default (function () {
  const date = new Date();
  const d    = date.getDate();
  const m    = date.getMonth();
  const y    = date.getFullYear();

  // const events = new Promise((resolve)=>{
  //   $.ajax({
  //     type: 'GET',
  //     url: 'https://www.googleapis.com/calendar/v3/calendars/0ebaddf129c7ars64fhihg9cv0@group.calendar.google.com/events',
  //     success: (events)=>resolve(events)
  //   })
  // })

  // events.then((events)=>{
  //   $('#full-calendar').fullCalendar({
  //     events,
  //     height   : 800,
  //     editable : true,
  //     header: {
  //       left   : 'month,agendaWeek,agendaDay',
  //       center : 'title',
  //       right  : 'today prev,next',
  //     },
  //   });
  // })
  //[{
  //   title  : 'All Day Event',
  //   start  : new Date(y, m, 1),
  //   desc   : 'Meetings',
  //   bullet : 'success',
  // }, {
  //   title  : 'Long Event',
  //   start  : new Date(y, m, d - 5),
  //   end    : new Date(y, m, d - 2),
  //   desc   : 'Hangouts',
  //   bullet : 'success',
  // }, {
  //   title  : 'Repeating Event',
  //   start  : new Date(y, m, d - 3, 16, 0),
  //   allDay : false,
  //   desc   : 'Product Checkup',
  //   bullet : 'warning',
  // }, {
  //   title  : 'Repeating Event',
  //   start  : new Date(y, m, d + 4, 16, 0),
  //   allDay : false,
  //   desc   : 'Conference',
  //   bullet : 'danger',
  // }, {
  //   title  : 'Birthday Party',
  //   start  : new Date(y, m, d + 1, 19, 0),
  //   end    : new Date(y, m, d + 1, 22, 30),
  //   allDay : false,
  //   desc   : 'Gathering',
  // }, {
  //   title  : 'Click for Google',
  //   start  : new Date(y, m, 28),
  //   end    : new Date(y, m, 29),
  //   url    : 'http ://google.com/',
  //   desc   : 'Google',
  //   bullet : 'success',
  // }];



  
}())
