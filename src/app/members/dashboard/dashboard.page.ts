//import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/authentication.service';
import {AfterViewInit, Component, ElementRef, OnInit, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';


import { Geolocation } from '@ionic-native/geolocation/ngx';
declare var google;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit, AfterViewInit {

  currentLocation: any = {
    lat: 0,
    lng: 0
  };

  @ViewChild('mapElement', { static: false }) mapNativeElement: ElementRef;
  directionsService = new google.maps.DirectionsService;
  directionsDisplay = new google.maps.DirectionsRenderer;
  directionForm: FormGroup;
  map ;
  constructor(private authService: AuthenticationService, private geolocation: Geolocation, private fb: FormBuilder) {
    this.createDirectionForm();    
  }

  ngOnInit() {
  }

  createDirectionForm() {
    this.directionForm = this.fb.group({
      destination: ['', Validators.required]
    });
  }

  logout(){
    this.authService.logout();
  }

  ngAfterViewInit(): void {
    this.geolocation.getCurrentPosition().then((resp) => {
      this.currentLocation.lat = resp.coords.latitude;
      this.currentLocation.lng = resp.coords.longitude;

      this.map = new google.maps.Map(this.mapNativeElement.nativeElement, {
        center: {lat: this.currentLocation.lat, lng: this.currentLocation.lng },
        zoom: 15
      });
      this.directionsDisplay.setMap(this.map);      
      const pos = {
        lat: this.currentLocation.lat,
        lng: this.currentLocation.lng
      };

      const icon = {
        url: 'assets/icon/user.png', // image url
        scaledSize: new google.maps.Size(50, 50), // scaled size
      };
      const marker = new google.maps.Marker({
        position: pos,
        map: this.map,
        title: 'Hello World!',
        icon: icon
      });

    }).catch((error) => {
      console.log('Error getting location', error);
    });

  }


  calculateAndDisplayRoute(formValues) {
    //const infoWindow = new google.maps.InfoWindow;
    
    const that = this;
    this.directionsService.route({
      origin: this.currentLocation,
      destination: formValues.destination,
      travelMode: 'DRIVING'
    }, (response, status) => {
      if (status === 'OK') {
        that.directionsDisplay.setDirections(response);
      } else {
        window.alert('Directions request failed due to ' + status);
      }
    });

    const icon = {
      url: 'assets/icon/user.png', // image url
      scaledSize: new google.maps.Size(50, 50), // scaled size
    };
    console.log("i'm befor the marker");
    const marker = new google.maps.Marker({
      position: formValues.destination,
      map: this.map,
      title: 'Hello World!',
      icon: icon
    });

    const contentString = '<div id="content">' +
          '<div id="siteNotice">' +
          '</div>' +
          '<h1 id="firstHeading" class="firstHeading">Ramallah</h1>' +
          '<div id="bodyContent">' +
          '<img src="assets/icon/user.png" width="200">' +
          '<p><b>Uluru</b>, also referred to as '+
          'Heritage Site.</p>' +
          '<p>Attribution: Uluru, <a href="https://en.wikipedia.org/w/index.php?title=Uluru&oldid=297882194">' +
          'https://en.wikipedia.org/w/index.php?title=Uluru</a> ' +
          '(last visited June 22, 2009).</p>' +
          '</div>' +
          '</div>';
      console.log(contentString);
      const infowindow = new google.maps.InfoWindow({
        content: contentString,
        maxWidth: 400
      });
      marker.addListener('click', function() {
        infowindow.open(this.map, marker);
      });

  }

}
