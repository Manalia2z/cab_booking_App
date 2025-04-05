import { Component, OnInit,ViewChild, ElementRef, AfterViewInit  } from '@angular/core';

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
  standalone:false
})
export class MapPage implements OnInit {
  @ViewChild('map', { static: false }) mapElement!: ElementRef;
  map!: any;
  currentLocation: any;
  destination = { lat: 19.1053687, lng: 74.7303281 }; // Example: Mumbai
  userMarker: any;
  watchId: any;
  directionsRenderer: any;
  directionsService: any;
  carIcon = "https://maps.google.com/mapfiles/kml/shapes/cabs.png"; // Car Icon

  constructor() { }

  ngOnInit() {
    this.getUserLocation();
  }
  ngAfterViewInit() {
    this.getUserLocation();
    
  }

  // Get User's Live Location using HTML5 Geolocation API
  getUserLocation() {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.currentLocation = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          console.log("position.coords.latitude",position.coords.latitude,"position.coords.longitude",position.coords.longitude);
          console.log('User Location:', this.currentLocation);
          this.loadMap();
        },
        (error) => {
          console.error('Error fetching location:', error);
        }
      );
    } else {
      console.error('Geolocation is not supported by this browser.');
    }
  }

  // Load Google Map
  loadMap() {
    const mapOptions = {
      center: this.currentLocation,
      zoom: 12,
      mapTypeId: google.maps.MapTypeId.ROADMAP, // Shows all roads
    };

    this.map = new google.maps.Map(this.mapElement.nativeElement, mapOptions);

    // Add Marker for Current Location
    new google.maps.Marker({
      position: this.currentLocation,
      map: this.map,
      title: 'You are here',
      icon: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png', // Blue marker for user
    });

    // Add Marker for Destination
    new google.maps.Marker({
      position: this.destination,
      map: this.map,
      title: 'Destination',
    });

    // Call function to draw route
    this.calculateRoute();
  }

  // Fetch & Display Route on Map
  calculateRoute() {
    const directionsService = new google.maps.DirectionsService();
    const directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: false, // Show markers at both ends
      polylineOptions: { strokeColor: '#0f0', strokeWeight: 5 }, // Green path
    });

    directionsRenderer.setMap(this.map);

    const request = {
      origin: this.currentLocation,
      destination: this.destination,
      travelMode: google.maps.TravelMode.DRIVING, // Options: DRIVING, WALKING, BICYCLING, TRANSIT
      provideRouteAlternatives: true, // Shows all alternative roads
    };

    directionsService.route(request, (result: any, status: any) => {
      if (status === google.maps.DirectionsStatus.OK) {
        directionsRenderer.setDirections(result);
      } else {
        console.error('Error fetching directions', status);
      }
    });
  }

}
