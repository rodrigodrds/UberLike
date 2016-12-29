import {Component} from "@angular/core";
import {NavController} from 'ionic-angular';

import { MapDirective } from './../../components/map/map';

@Component({
  templateUrl: 'build/pages/home/home.html',
  directives: [MapDirective]
})
export class HomePage {

  public isPickupRequested: boolean;

  constructor(private navController: NavController) {
    this.isPickupRequested = false;
  }

  confirmPickup(){
    this.isPickupRequested = true;
  }

  cancelPickup(){
    this.isPickupRequested = false;
  }
}
