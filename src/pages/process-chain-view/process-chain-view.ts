import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';

interface PayloadLayout {
  partid: string;
  length: number;
  width: number;
  height: number;
  scratched: boolean;
  suspect: string;
  blocktransaction: string;
  blockstamp: string;
  blockvalue: string;
}


@Component({
  selector: 'page-process-chain-view',
  templateUrl: 'process-chain-view.html'
})

export class ProcessChainViewPage {
  descending: boolean = false;
  order: number;
  column: string = 'blockstamp';
  channel: string;

  blocks: any = [];
  payloads: any =[];

  errorMessage: string;
  items: any = [];

  channelid: string;

  constructor(public navCtrl: NavController, public rest: RestProvider, public storage: Storage) {
  
    this.storage.get('channel').then((val) => {
      this.channelid = val;
    });

  }

  ionViewWillEnter() {

    this.storage.get('channel').then((val) => {
      this.channelid = val;
    });

    this.blocks=[];
    this.getBlocks();
    
  }

  getBlocks() {
    this.rest.getBlockChain()
       .subscribe(
         blocks => this.filterSubchain(blocks),
         error =>  this.errorMessage = <any>error);
  }

  filterSubchain(data){
    if(this.channelid != "Ford"){
      var self = this;
      this.blocks = data.filter(function (el) {
        return el.newValue.indexOf(self.channelid) > 0;
      });
      this.extractPayload(this.blocks);
    } else{
      this.blocks = data;
      this.extractPayload(data);
    }
  }

  extractPayload(data) {
    this.payloads=[];

    data.forEach(element => {
      //skipping the genisis block
      if (element.transactionId != 'd02cfb5a6d5a287adf345d7c52322eb6eaa01bdbb8e376ea4e00159aec68347e') {
        var obj: PayloadLayout = {
          partid: JSON.parse(element.newValue).partid,
          length: JSON.parse(element.newValue).length,
          width: JSON.parse(element.newValue).width,
          height: JSON.parse(element.newValue).height,
          scratched: JSON.parse(element.newValue).scratched,
          suspect: JSON.parse(element.newValue).suspect,
          blocktransaction: element.transactionId, 
          blockstamp: element.timestamp,
          blockvalue: JSON.stringify(JSON.parse(element.newValue))   
        };

        this.payloads.push(obj);
      }
    });
  }

  sort(){
    this.descending = !this.descending;
    this.order = this.descending ? 1 : -1;
  }

}
