import { Component, OnInit } from '@angular/core';

declare var google: any;

@Component({
  selector: 'map',
  templateUrl: 'build/components/map/map.html'
})
export class MapDirective implements OnInit {

  public map;

  constructor() {
  }
  
  ngOnInit(){
    this.map = this.createMap();
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
