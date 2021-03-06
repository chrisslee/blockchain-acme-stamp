import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';
import { MyApp } from './app.component';
import { ProcessRunPage } from '../pages/process-run/process-run';
import { ProcessSettings } from '../pages/process-settings/process-settings';
import { ProcessChainViewPage } from '../pages/process-chain-view/process-chain-view';
import { TabsControllerPage } from '../pages/tabs-controller/tabs-controller';
import { HttpModule} from '@angular/http';
import { HttpClientModule } from '@angular/common/http';
import { SearchPipe } from '../pipes/search/search';
import { SortPipe } from '../pipes/sort/sort';
import { IonicStorageModule } from '@ionic/storage';

import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { RestProvider } from '../providers/rest/rest';

@NgModule({
  declarations: [
    MyApp,
    ProcessRunPage,
    ProcessChainViewPage,
    ProcessSettings,
    TabsControllerPage,
    SearchPipe,
    SortPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
    HttpModule
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    ProcessRunPage,
    ProcessChainViewPage,
    ProcessSettings,
    TabsControllerPage
  ],
  providers: [
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    RestProvider
  ]
})
export class AppModule {}