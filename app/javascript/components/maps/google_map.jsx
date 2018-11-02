import React, { Component } from 'react';
import {loadScript} from './google_loaders'
import axios from 'axios';
import SiteForm from '../sites/siteform'

const API_KEY =  require('./api_key').API_KEY
const map_src = `https://maps.googleapis.com/maps/api/js?libraries=drawing&key=${API_KEY}`
const cluster_src = `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/markerclusterer.js`

require('babel-polyfill');

export default class GoogleMap extends Component {
  constructor(props){
    super(props)
    this.state = {
      sites: {},
      site: {} || this.empty_site(),
      geocoder: undefined,
      markers: {},
      marker: {},
      map: undefined,
      infowindow: {},
      initial: true
    }
  }

  async componentDidMount(){
    await Promise.all(
        [loadScript(map_src),
        loadScript(cluster_src),
        this.fetchSites('/maps/all_sites_with_pos.json')],
      )
    let values = await Promise.all([
        this.initMap(),
        //this.initGeolator(),
      ])
    //values[0].panTo(values[1])
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
      zoom: 15,
    });
    let markers = this.create_markers(map);
    // Add a marker clusterer to manage the markers.
    let markerCluster = new MarkerClusterer(map, markers, {imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`});

    map.addListener('click', this.create_marker_event);

    this.setState({markerCluster, map})
    return map
  }

  initGeolator = async () => {
    let location = axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`,{})
      .then((response)=>{
        this.setState({pos: response['data']['location']})
        return response['data']['location']
      })
    return location
  }

  // guess_address = (response) => {
  //   // if($('#site_address').val() !== ''){
  //   //   return
  //   // }
  //   this.state.geocoder.geocode({'location': response['data']['location']}, (results, status) =>{
  //     console.log(results)
  //     if (status === 'OK') {
  //       if (results[0]) {
  //         this.setState({pos: results[0]['geometry']['location']})

  //         // $('#site_address').val(results[0]['formatted_address'])
  //         // set_latlng()
  //       } else {
  //         window.alert('No results found');
  //       }
  //     } else {
  //       window.alert('Geocoder failed due to: ' + status);
  //     }
  //   });
  // }


  empty_site = (pos) => {
    pos = this.pos_fmt(pos)
    return {
      id: '',
      first_name: '',
      last_name: '',
      address: '',
      emails: [], 
      phone: '',
      notes: '',
      icon_url: 'house_question.png',
      lat: pos.lat || 37.9036044480292,
      lng: pos.lng || -122.06859790227156,
    }
  }

  // pos needs to have {lat: float, lng: float}
  create_marker = (pos, map, site) => {
    map = map || this.state.map
    site = site || this.find_site_by_pos(pos) || this.empty_site(pos)
    let s = {...site}
    delete s.marker
    let marker = new google.maps.Marker({
      position: pos,
      map: this.state.map,
      animation: google.maps.Animation.DROP,
      icon: {url: `/assets/${s.icon_url}` || '/assets/house_question.png', scaledSize: new google.maps.Size(60,50)},
      site: s,
    });

    let listener = marker.addListener('click', ()=>{
      let ss = this.merge_site(this.find_site_by_pos({lat: site.lat, lng: site.lng}))
      this.open_info(marker, ss)
      this.setState({
        site: ss,
        marker: marker,
        initial: false,
      })
    });

    return marker
  }

  merge_site = (site)=> {
    return {...this.state.site,...site}
  }

  create_marker_and_submit = (pos) => {
    let marker = this.create_marker(pos)
    this.open_info(marker)
    let markers = {...this.state.markers}
    markers[`${marker.position.lat}${marker.position.lng}`] = marker
    let site = marker.site
    delete site.id //this is because NotNullViolation error when id is null
    let initial = false
    this.setState({site, markers, marker, initial})
    this.submit_form(`/sites.json`,'post',site)
  }

  create_markers = (map) => {
    let sites = {...this.state.sites}
    let infowindow = this.is_empty(this.state.infowindow)
      ? new google.maps.InfoWindow({content: ''})
      : this.state.infowindow;

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


  open_info = (marker,site) =>{
    let map = this.state.map
    let infowindow = this.state.infowindow
    marker = marker || this.state.marker
    site = site || this.state.site

    infowindow.open(map, marker);
    infowindow.setOptions({
      position: marker.position,
      content: this.infowindowcontent({
        first_name: site.first_name,
        last_name: site.last_name,
        address: site.address
      }),
    })
  }

  infowindowcontent = (attrs) => {
    let {first_name, last_name, address} = attrs
    return (`<div>
              <h4>${first_name} ${last_name}</h4>
              <p>${address}</p>
            </div>`
    )
  }

  create_marker_event = (e) =>{
    this.create_marker_and_submit(e.latLng)
  }


  find_site_by_pos = (pos) => {
    pos = this.pos_fmt(pos || this.pos_state())
    let site = {... this.state.sites[`${this.precise(pos.lat,15)}${this.precise(pos.lng,15)}`]}
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
    this.update_sites(e.target.name, e.target.value)
  }

  update_sites = (key, val) => {
    let site = {...this.state.site}
    site[key] = val

    let sites = {...this.state.sites}
    sites[`${site.lat}${site.lng}`] = site

    this.setState({site, sites})

    if(key === 'icon_url'){
      this.update_marker_icon(site.lat,site.lng,val)
    }
    this.state.infowindow.setOptions({
      content: this.infowindowcontent({first_name: site.first_name, last_name: site.last_name, address: site.address}),
    })
  }


  update_marker_icon = (lat, lng, icon_url) => {
    let marker = this.state.marker
    let markers = {...this.state.markers}
    marker.icon = {url: `/assets/${icon_url}`, scaledSize: new google.maps.Size(60,50)}
    marker.setMap(this.state.map)
    markers[`${lat}${lng}`] = marker
    this.setState({markers, marker})
  }


  render(){
    return (
      <div className='layer w-100' style={{height: '500px'}}>
        <div className='w-100 h-100 fixed-top' style={{maxHeight: '500px'}}>
          <div id='mappy' className='w-100 h-100'></div>
        </div>
        <div className='w-100 h-100' style={{maxHeight: '500px'}}></div>
        <div style={{height: '50px', margin: '10px'}} ></div>
        <SiteForm {...this.state} submit={this.submit_form_e} create_marker={this.create_marker} changeForm={this.onChange}/>
        <div className='w-100 h-100' style={{maxHeight: '300px'}}></div>
      </div>
    )
  }
}