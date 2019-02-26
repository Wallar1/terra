import React, { Component } from 'react';
import {loadScript} from './google_loaders'
import axios from 'axios';
import SiteForm from '../sites/siteform'

require('babel-polyfill');

export default class GoogleMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      sites: {},
      site: this.empty_site(),
      markers: {},
      marker: {},
      map: undefined,
      form_is_opened: false,
      infowindow: {},
      center: {},
      address_guess: '',
    }
    this.API_KEY = props.API_KEY
    this.CLIENT_ID = props.CLIENT_ID
    this.map_src = `https://maps.googleapis.com/maps/api/js?libraries=drawing&key=${this.API_KEY}`
    this.cluster_src = `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js`
    this.people_src = "https://apis.google.com/js/api.js"
  }

  async componentDidMount(){
    await Promise.all(
        [loadScript(this.map_src),
        loadScript(this.cluster_src),
        loadScript(this.people_src),
        this.fetchSites('/maps/all_sites_with_pos.json'),
        ],
      )
    let values = await Promise.all([
        this.initMap(),
        this.geolocate(),
        gapi.load('client:auth2', this.init_people_api)
      ])
    values[0].panTo(values[1])
    this.create_current_pos_marker(values[1],values[0])
    this.guess_address(values[1])
  }

  fetchSites = async (url) => {
    await axios.get(url)
    .then(response => {
      this.setState({
        sites: response.data
      })
    })
    .catch(error => console.log(error))
  }

  initMap = async () => {
    let map = new window.google.maps.Map(document.getElementById('mappy'), {
      center: this.get_start_pos(),
      zoom: 19,
    });
    let markers = this.create_markers(map);
    // Add a marker clusterer to manage the markers.
    let markerCluster = new MarkerClusterer(map, markers, {imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`});

    map.addListener('click', this.create_marker_event);

    this.setState({markerCluster, map})
    return map
  }

  geolocate = async () => {
    if(navigator.geolocation){
      let pos = navigator.geolocation.getCurrentPosition((pos)=>{return pos})
      return pos ? pos : this.geolocate_fallback()
    }
    // else{
    //   return this.geolocate_fallback()
    // }
  }
  
  geolocate_fallback = async () => {
    return axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${this.API_KEY}`,{})
      .then((response)=>{
        this.setState({center: response['data']['location']})
        return response['data']['location']
      })
  }


  // init_people_api = async () => {
  //   return axios.get(`https://people.googleapis.com/v1/people/me/connections?pageSize=10&personFields=names%2CemailAddresses&key=${this.API_KEY}`)
  //     .then(res => console.log(res))
  // }

  init_people_api = async () => {
    await gapi.client.init({
      apiKey: this.API_KEY,
      clientId: this.CLIENT_ID,
      scope: "https://www.googleapis.com/auth/contacts",
    })
    console.log(gapi.client)
    await gapi.client.people.people.connections.list({
      'resourceName': 'people/me',
      'pageSize': 10,
      'personFields': 'names,emailAddresses',
    }).then(function(response) {
      console.log(response)
    })
  }

  // list_contacts = async () => {
  //   window.gapi.client.people.people.connections.list({
  //     'resourceName': 'people/me',
  //     'pageSize': 10,
  //     'personFields': 'names,emailAddresses',
  //   }).then(function(response) {
  //     console.log(response)
  //   })
  // }

  guess_address = async (pos) => {
    return axios.get(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${pos.lat},${pos.lng}&key=${this.API_KEY}`)
      .then((response)=>{
        if(response && response['data']){
          this.setState({address_guess: response['data']['results'][0]['formatted_address']})
        }
        return response
      })
  }


  empty_site = (pos) => {
    pos = pos ? this.pos_fmt(pos) : {lat: 37.9036044480292, lng: -122.06859790227156}
    return {
      id: '',
      first_name: '',
      last_name: '',
      address: '',
      email: '',
      phone: '',
      notes: '',
      icon_url: 'house_question.png',
      lat: pos.lat,
      lng: pos.lng,
    }
  }

  create_current_pos_marker = (pos, map) => {
    map = map || this.state.map

    let marker = new google.maps.Marker({
      position: pos,
      map: this.state.map,
      animation: google.maps.Animation.BOUNCE,
      icon: {url: '/assets/current_location.png', scaledSize: new google.maps.Size(120,100)},
    });
  } 

  create_marker = (pos, map, site) => {
    map = map || this.state.map
    site = site || this.find_site_by_pos(pos) || this.empty_site(pos)
    let s = {...site}
    delete s.marker
    let marker = new google.maps.Marker({
      position: pos,
      map: this.state.map,
      animation: google.maps.Animation.DROP,
      icon: {url: `/assets/${s.icon_url}` || '/assets/house_question.png', scaledSize: new google.maps.Size(120,100)},
      site: s,
    });

    let listener = marker.addListener('click', ()=>{
      let ss = this.merge_site(this.find_site_by_pos(pos))
      map.setOptions({zoom: 19, center: {...pos, lat: pos.lat - .001}}) // on mobile, the form moves the house out of the frame
      this.open_info(marker,ss)
      this.guess_address(pos)
      this.setState({
        site: ss,
        marker: marker,
        form_is_opened: true,
      })
    });

    return marker
  }

  merge_site = (site)=> {
    return {...this.state.site,...site}
  }

  change_selected_input = (e) => {
    this.setState({selected_input: e.target.id})
  }

  create_marker_and_submit = (pos) => {
    let marker = this.create_marker(pos)
    let markers = {...this.state.markers}
    markers[`${marker.position.lat}${marker.position.lng}`] = marker
    let site = marker.site
    this.open_info(marker,site)
    delete site.id //this is because NotNullViolation error when id is null
    this.setState({site, markers, marker, form_is_opened: true})
    this.submit_form(`/sites.json`,'post',site)
  }

  create_markers = (map) => {
    let sites = {...this.state.sites}

    let infowindow = this.is_empty(this.state.infowindow)
      ? new google.maps.InfoWindow({content: this.infowindowcontent()})
      : this.state.infowindow 


    //We start from scratch with this function
    Object.keys(this.state.markers).forEach(
      (key)=>{this.state.markers[key].setMap(null)
    })

    let markers = {}
    Object.keys(sites).forEach(
      (key) => {
        let site = sites[key]
        let pos = {lat: site.lat, lng: site.lng}
        markers[`${site.lat}${site.lng}`] = this.create_marker(pos,map,site)
      }
    );
    this.setState({markers, infowindow})
    return markers
  }

  rnd = (num, decimal_places) =>{
    let dec = Math.pow(10,decimal_places)
    return Math.round(num * dec)/dec
  }
  
  precise = (num, sigfigs) => {
    return Number.parseFloat(num).toPrecision(sigfigs);
  }

  create_marker_event = (e) =>{
    this.create_marker_and_submit(e.latLng)
  }


  find_site_by_pos = (pos) => {
    pos = this.pos_fmt(pos || this.pos_state())
    let site = {... this.state.sites[`${pos.lat}${pos.lng}`]}
    //let site = {... this.state.sites[`${this.precise(pos.lat,15)}${this.precise(pos.lng,15)}`]}
    return this.is_empty(site) ? undefined : site
  }

  pos_state = () => {
    return {
      lat: this.state.site.lat || this.state.site.pos.lat,
      lng: this.state.site.lng || this.state.site.pos.lat,
    }
  }


  // the lat and lng from google are functions, so I just call them to get the values
  pos_fmt = (pos) => {
    return this.is_func(pos.lat) ?
              {lat: pos.lat(),lng: pos.lng(),} :
              pos
              
  }


  is_func = (obj) => {
    return !!(obj && obj.constructor && obj.call && obj.apply);
  };

  is_empty = (obj) => {
    for(var key in obj) {
        if(obj.hasOwnProperty(key))
            return false;
    }
    return true;
  }


  get_start_pos = () => {
    let len = this.state.sites.length

    let start_pos = this.state.sites[len - 1] ?
      this.state.sites[len - 1].pos :
      {lat: 37.9036044480292, lng: -122.06859790227156}
      //this.initGeolator()
    return start_pos
  }


  open_info = (marker,site) => {
    let map = this.state.map;
    let infowindow = this.state.infowindow;
    marker = marker || this.state.marker
    site = site || this.state.site

    infowindow.open(map,marker)
    infowindow.setOptions({
      position: marker.position,
      content: this.infowindowcontent(site)
    })
  }

  infowindowcontent = (site) => {
    site = site || this.state.site
    return (
      `<div class="card">
        <h5 class="card-header">${site.first_name} ${site.last_name}</h5>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">${site.address}</li>
          <li class="list-group-item">${site.phone}</li>
          <li class="list-group-item">${site.email}</li>
        </ul>
        <div class="card-body">
          <p class="card-text">${site.notes}</p>
        </div>
      </div>`
    )
  }
  

  submit_form_e = (e) => {
    e.preventDefault()
    this.submit_form(`/sites/${this.state.site.id}.json`,'patch')
  }

  submit_form = (url, method,site) => {
    site = site || this.state.site
    axios({
      url: url,
      method: method,
      responseType:'json',
      data: {site: site}
    }).then((response)=>{
      site.id = response.data.site.id
      this.setState({
        site: site,
        sites: response.data.sites
      })
      //this.update_marker_icon(response.data.site.id, response.data.site.icon_url)
    })
  }

  onChange = (e) => {
    this.update_sites(e.target.name, e.target.value, e)
  }

  update_sites = (key, val, e) => {
    let site = {...this.state.site}
    site[key] = val

    let sites = {...this.state.sites}
    sites[`${site.lat}${site.lng}`] = site

    this.setState({site, sites, selected_input: e.target.id})

    if(key === 'icon_url'){
      this.update_marker_icon(site.lat,site.lng,val)
    }

    this.state.infowindow.setOptions({
      content: this.infowindowcontent(site)
    })

    e.target.focus()
  }


  update_marker_icon = (lat, lng, icon_url) => {
    let marker = this.state.marker
    let markers = {...this.state.markers}
    marker.icon = {url: `/assets/${icon_url}`, scaledSize: new google.maps.Size(120,100)}
    marker.setMap(this.state.map)
    markers[`${lat}${lng}`] = marker
    this.setState({markers, marker})
  }


  render(){
    return (
      <div className='layer w-100 h-100'>
        <div className='w-100 h-100'>
          <SiteForm {...this.state} 
                    submit={this.submit_form_e}
                    create_marker={this.create_marker}
                    changeForm={this.onChange}
                    change_selected_input={this.change_selected_input}
                    close_form={()=>{this.setState({form_is_opened: false})}}
          />
          <div id='mappy' className='w-100 h-100' style={{minHeight: '100vh'}}></div>
        </div>
      </div>
    )
  }
}