import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-process-run',
  templateUrl: 'process-run.html'
})

export class ProcessRunPage {
  data: any = {};

  constructor(public navCtrl: NavController, public restProvider: RestProvider) {
    this.data.partid = '';
    this.data.length = '';
    this.data.width = '';
    this.data.height = '';
    this.data.scratched = '';
    this.data.response = '';

  }

  write() {

    let assetid = 1525635630772;

    let suspect = "no";
    if (this.data.length < 1096 || this.data.length > 2004) { suspect = "yes"; }
    if (this.data.height < 496 || this.data.height > 504) { suspect = "yes"; }
    if (this.data.width < 996 || this.data.width > 1004) { suspect = "yes"; }

    let datablock = {
      "type": "PPAP Stamp",
      "partid": this.data.partid,
      "length": this.data.length,
      "width": this.data.width,
      "height": this.data.height,
      "scratched": this.data.scratched,
      "suspect": suspect
    }

    let transaction = {
      "$class": "org.example.biznet.SampleTransaction",
      "asset": "org.example.biznet.SampleAsset#" + assetid.toString(),
      "newValue": JSON.stringify(datablock)
    }

    let data = JSON.stringify(transaction);

    let res = this.restProvider.addStamp(data).then((result) => {
      console.log(result);
      this.data.response = result;
    }, (err) => {
      console.log(err);
    });

    console.log(res);
  }
}
