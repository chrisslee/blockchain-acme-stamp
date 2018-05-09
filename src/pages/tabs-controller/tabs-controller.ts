import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProcessRunPage } from '../process-run/process-run';
import { ProcessChainViewPage } from '../process-chain-view/process-chain-view';

@Component({
  selector: 'page-tabs-controller',
  templateUrl: 'tabs-controller.html'
})
export class TabsControllerPage {
  // this tells the tabs component which Pages
  // should be each tab's root Page
  tab1Root: any = ProcessRunPage;
  tab2Root: any = ProcessChainViewPage;
  constructor(public navCtrl: NavController) {
  }
  
}
