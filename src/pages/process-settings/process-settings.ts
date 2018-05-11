import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';
import { Storage } from '@ionic/storage';


@Component({
  selector: 'page-settings',
  templateUrl: 'process-settings.html'
})

export class ProcessSettings {
  data: any = {};
  blocks: any = [];
  errorMessage: string;


  channellist: string[] = [];
  public channelName: string;
  public newChannel: string = '';
  isenabled:boolean=false;

  constructor(public navCtrl: NavController, public rest: RestProvider, public storage: Storage) {
    this.getChannels();
  }

  ionViewWillEnter() {
    this.storage.get('channel').then((val) => {
      console.log('on channel', val);
      this.channelName = val;
    });
  }

  channelChange() {
    this.storage.set("channel", this.channelName);
    console.log("switching to " + this.channelName)
  }
  
  addChannel() {
    if (this.newChannel != '') {
      let assetid = 1525635630772;

      let datablock = {
        "type": "channel",
        "channelid": this.newChannel
      }

      let transaction = {
        "$class": "org.example.biznet.SampleTransaction",
        "asset": "org.example.biznet.SampleAsset#" + assetid.toString(),
        "newValue": JSON.stringify(datablock)
      }

      let data = JSON.stringify(transaction);

      let res = this.rest.addStamp(data).then((result) => {
        console.log(result);
        this.getChannels();
      }, (err) => {
        console.log(err);
      });

      console.log(res);
    } else {
      console.log("no subchain name");
    }
  }

  getChannels() {
    this.rest.getBlockChain()
      .subscribe(
        blocks => this.filterChannels(blocks),
        error => this.errorMessage = <any>error);
  }

  filterChannels(data) {
    this.blocks = data.filter(function (el) {
      return el.newValue.indexOf("channelid") > 0;
    });;
    this.extractPayload(this.blocks);
  }

  extractPayload(data) {
    data.forEach(element => {
      this.channellist.push(JSON.parse(element.newValue).channelid);
    });
  }
}
