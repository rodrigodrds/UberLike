import { Component, OnInit, Input } from '@angular/core';
import { Loading, NavController } from 'ionic-angular'
import { Geolocation } from 'ionic-native';
import { Observable } from 'rxjs/Observable';

declare var google: any;

@Component({
  selector: 'map',
  templateUrl: 'build/components/map/map.html'
})
export class MapDirective implements OnInit {

  @Input() isPickupRequested: boolean;

  public map;

  constructor(public nav: NavController) {
  }
  
  ngOnInit(){
    this.map = this.createMap();

    this.getCurrentLocation().subscribe(location => {
      this.centerLocation(location);
    });
  }

  getCurrentLocation(){

    let loading = Loading.create({
      content: 'Locating...'
    });

    this.nav.present(loading);

    let options = {timeout: 10000, enableHighAccuracy: true};

    let locationObs = Observable.create(observable => {
      Geolocation.getCurrentPosition(options)
        .then(resp => {
          let lat = resp.coords.latitude;
          let lng = resp.coords.longitude;

          let location = new google.maps.LatLng(lat, lng);

          observable.next(location);

          loading.dismiss();
        },
        (err)=>{
          console.log('Geolocation err: ' + err);
          loading.dismiss();
        })
    })

    return locationObs;
    
  }

  centerLocation(location){
    if(location){
      this.map.panTo(location);
    }else{
      this.getCurrentLocation().subscribe(currentLocation => {
        this.map.panTo(currentLocation);
      })
    }
  }

  createMap(location = new google.maps.LatLng(-23.609965, -46.927977)){
    let mapOption = {
      center: location,
      zoom: 15,
      mapTypeId: google.maps.MapTypeId.ROADMAP,
      disableDefaultUI: true
    }

    let mapEl = document.getElementById('map');
    let map = new google.maps.Map(mapEl, mapOption);

    return map;
  }
}
