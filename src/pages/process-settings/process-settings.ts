import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-settings',
  templateUrl: 'process-settings.html'
})

export class ProcessSettings {
  descending: boolean = false;
  order: number;
  column: string = 'timestamp';

  
  blocks: string[];
  errorMessage: string;

  channel: string;

  constructor(public navCtrl: NavController, public rest: RestProvider, public storage: Storage) {
    
  }
  
  ionViewWillEnter() {
    this.storage.get('channel').then((val) => {
      console.log('on channel', val);
      this.channel = val;
    });
  }

  channelChange(){
    this.storage.set("channel", this.channel);
    console.log("switching to " + this.channel)
  }

  getBlocks() {
    this.rest.getBlockChain()
       .subscribe(
         blocks => this.blocks = blocks,
         error =>  this.errorMessage = <any>error);
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
