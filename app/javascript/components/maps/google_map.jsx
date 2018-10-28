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
      sites_details: [],
      geocoder: undefined,
      markers: [],
      map: undefined,
      site_id: '',
      first_name: '',
      last_name: '',
      address: '',
      emails: [], 
      phone: '',
      notes: '',
      icon_url: '',
      current_position: {'lat': 120, 'lng': 30},
      infowindow: '',
    }
  }

  async componentDidMount(){
    await Promise.all(
        [loadScript(map_src),
        loadScript(cluster_src),
        this.fetchSites('/maps/all_sites_details.json')],
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
        sites_details: response.data
      })
    })
    .catch(error => console.log(error))
  }

  initGeolator = async () => {
    let location = axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`,{})
      .then((response)=>{
        this.setState({current_position: response['data']['location']})
        return response['data']['location']
      })
    return location
  }

  initGeocoder = () => {
    this.setState({geocoder: new google.maps.Geocoder})

    axios.post(`https://www.googleapis.com/geolocation/v1/geolocate?key=${API_KEY}`,{})
      .then(this.guess_address)
    //update_latlng_on_focusout()
  }

  guess_address = (response) => {
    // if($('#site_address').val() !== ''){
    //   return
    // }
    this.state.geocoder.geocode({'location': response['data']['location']}, (results, status) =>{
      console.log(results)
      if (status === 'OK') {
        if (results[0]) {
          this.setState({current_position: results[0]['geometry']['location']})

          // $('#site_address').val(results[0]['formatted_address'])
          // set_latlng()
        } else {
          window.alert('No results found');
        }
      } else {
        window.alert('Geocoder failed due to: ' + status);
      }
    });
  }

  create_markers = (map, sites_details) => {
    sites_details = sites_details || [...this.state.sites_details]
    let infowindow = this.state.infowindow !== '' ? this.state.infowindow : new google.maps.InfoWindow({
      content: ''
    });

    this.state.markers.forEach((m)=>{
      m.setMap(null)
    })
    let markers = sites_details.map((site)=>{
      let marker = new google.maps.Marker({
        position: site.latlng || this.state.current_position,
        map: map,
        icon: {url: `/assets/${site.icon_url}`, scaledSize: new google.maps.Size(60,50)},
        id: site.id,
      });
      marker.addListener('click', ()=>{
        this.open_info(marker,map,infowindow,site)
        this.setState({
          current_position: site.latlng || this.state.current_position,
          site_id: site.id || this.state.site_id,
          first_name: site.first_name,
          last_name: site.last_name,
          address: site.address,
          email: site.email, 
          phone: site.phone,
          notes: site.notes,
          icon_url: site.icon_url,
        })
      });
      $("[site_id='"+site.id+"']").click(()=>{
        map.panTo(site.latlng)
        this.open_info(marker,map,infowindow,site)
      })
      return marker
    });
    this.setState({markers, infowindow})
    return markers
  }

  rnd = (num, decimal_places) =>{
    let dec = Math.pow(10,decimal_places)
    return Math.round(num * dec)/dec
  }

  update_marker_icon = (latlng, val)=> {
    let rnd = (num, decimal_places) =>{
      let dec = Math.pow(10,decimal_places)
      return Math.round(num * dec)/dec
    }

    let markers = [...this.state.markers]
    let marker = markers.filter((m)=>{
      return rnd(m.position.lat(),12) === rnd(latlng.lat,12) && rnd(m.position.lng(),12) === rnd(latlng.lng,12)
    })[0]
    markers = markers.filter((m)=>{
      return rnd(m.position.lat(),12) !== rnd(latlng.lat,12) || rnd(m.position.lng(),12) !== rnd(latlng.lng,12)
    })
    marker.icon = {url: `/assets/${val}`, scaledSize: new google.maps.Size(60,50)}
    marker.setMap(this.state.map)
    this.setState({markers: [...markers, marker]})
  }

  infowindowcontent = (attrs) => {
    let {first_name, last_name, address} = attrs
    return (`<div>
              <h4>${first_name} ${last_name}</h4>
              <p>${address}</p>
            </div>`
    )
  }

  open_info = (marker,map,infowindow,site) =>{
    infowindow = infowindow || this.state.infowindow
    infowindow.open(map, marker);
    infowindow.setOptions({
      position: site.latlng,
      content: this.infowindowcontent({first_name: site.first_name, last_name: site.last_name, address: site.address}),
    })
  }

  create_marker_event = (e) =>{
    this.create_marker(e.latLng)
  }


  //TODO: fix this because latLng.lat() might not always be a function
  create_marker = (latLng) => {
    let marker = new google.maps.Marker({
      position: latLng,
      map: this.state.map,
      animation: google.maps.Animation.DROP,
      draggable:true,
      icon: {url: '/assets/house_question.png', scaledSize: new google.maps.Size(60,50)},
    });
    // document.getElementById('turnred').addEventListener('click', function(){
    //   marker.setIcon({fillColor: 'red',fillOpacity: 1,path: "M 0 -15 L 5 -10 L 5 -15 L 10 -15 L 10 -8 L 15 -5 L 12 -3 L 10 -5 L 10 10 L -10 10 L -10 -5 L -12 -3 L -15 -5 z"})
    // })
    this.state.map.panTo(latLng)
    //this.state.markerCluster.addMarker(marker)
    let markers = [...this.state.markers, marker]

    this.setState({
      current_position: {lat: latLng.lat(), lng: latLng.lng()},
      markers: markers,
      site_id: '',
      first_name: '',
      last_name: '',
      address: '',
      email: '', 
      phone: '',
      notes: '',
      icon_url: 'house_question.png',
    })
    this.submit_form(`/sites.json`,'post')
  }

  get_start_pos = () => {
    if(this.state.sites_details.length > 0){
      return this.state.sites_details[this.state.sites_details.length - 1].latlng
    }else{
      return this.state.current_position
    }
  }
  

  initMap = async () => {
    let map = new window.google.maps.Map(document.getElementById('mappy'), {
      center: this.get_start_pos(),
      zoom: 20
    });
    let markers = {...this.create_markers(map)};
    // Add a marker clusterer to manage the markers.
    let markerCluster = new MarkerClusterer(map, markers, {imagePath: `https://developers.google.com/maps/documentation/javascript/examples/markerclusterer/m`});

    map.addListener('click', this.create_marker_event);

    this.setState({markerCluster,map})
    return map
  }

  submit_form_e = (e) => {
    e.preventDefault()
    this.submit_form(`/sites/${this.state.site_id}.json`,'patch')
  }

  submit_form = (url, method) => {
    axios({
      url: url,
      method: method,
      responseType:'json',
      data: {
        site: {
          lat: this.state.current_position.lat,
          long: this.state.current_position.lng,
          first_name: this.state.first_name,
          last_name: this.state.last_name,
          emails: [this.state.email],
          phone: this.state.phone,
          notes: this.state.notes,
          icon_url: this.state.icon_url,
          address: this.state.address,
        }
      }
    }).then((response)=>{
      this.setState({site_id: response.data.site.id, sites_details: response.data.sites_details})
      //this.update_marker_icon(response.data.site.id, response.data.site.icon_url)
      //this.create_markers(this.state.map, response.data.sites_details)
    })
  }

  onChange = (e) => {
    this.setState({[e.target.name]: e.target.value})
    this.change_site_details(e.target.name, e.target.value)
  } 

  change_site_details = (key, val, id) => {
    id = id || this.state.site_id
    let sites_details = [...this.state.sites_details]
    let site = Object.assign({}, sites_details.filter((site)=>{
      return site.id === id
    })[0])
    site[key] = val
    sites_details = [...sites_details.filter((s)=>{return s.id !== site.id}),site]
    this.setState({sites_details})
    if(key === 'icon_url'){
      this.update_marker_icon(site.latlng,val)
      //this.create_markers(this.state.map,sites_details)
    }
    this.state.infowindow.setOptions({
      content: this.infowindowcontent({first_name: site.first_name, last_name: site.last_name, address: site.address}),
      position: this.state.current_position,
    })
  }

  render() {
    return (
      <div className='layer w-100' style={{height: '500px'}}>
        <div id='mappy' className='w-100 h-100'></div>
        <div style={{height: '50px', margin: '10px'}} ></div>
        <SiteForm {...this.state} submit={this.submit_form_e} create_marker={this.create_marker} changeForm={this.onChange}/>
      </div>
    );
  }
}
