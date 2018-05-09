import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { RestProvider } from '../../providers/rest/rest';

@Component({
  selector: 'page-process-chain-view',
  templateUrl: 'process-chain-view.html'
})

export class ProcessChainViewPage {
  descending: boolean = false;
  order: number;
  column: string = 'timestamp';

  blocks: string[];
  errorMessage: string;

  constructor(public navCtrl: NavController, public rest: RestProvider) {
  }
  
  ionViewDidLoad() {
    this.getBlocks();
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
