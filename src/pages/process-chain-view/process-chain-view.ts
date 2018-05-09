import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'page-process-chain-view',
  templateUrl: 'process-chain-view.html'
})

export class ProcessChainViewPage {
  descending: boolean = false;
  order: number;
  column: string = 'timestamp';
  channel: string;

  blocks: string[];
  errorMessage: string;
  items: any = [];

  channelid: string;

  constructor(public navCtrl: NavController, public rest: RestProvider, public storage: Storage) {
  
    this.storage.get('channel').then((val) => {
      this.channelid = val;
    });

  }

  ionViewDidEnter() {
    this.storage.get('channel').then((val) => {
      this.channelid = val;
    });

    this.getBlocks();
  }

  getBlocks() {
    this.rest.getBlockChain()
       .subscribe(
         blocks => this.items = blocks,
         error =>  this.errorMessage = <any>error);
    
    var self = this;
    this.blocks = this.items.filter(function (el) {
      return el.newValue.indexOf(self.channelid) > 0;
    });

  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
