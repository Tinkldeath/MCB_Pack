import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { UserdataService } from './shared/services/userdata.service';
import { GroupsService } from './shared/services/groups.service';
import { DataTransferService } from './shared/services/data-transfer.service';
import { SpecialsService } from './shared/services/specials.service';
import { HttpClient, HttpClientModule} from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicStorageModule.forRoot(), IonicModule.forRoot(), AppRoutingModule, HttpClientModule,],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    EmailComposer,
    HttpClient,
    HttpClientModule,
    SpecialsService,
    DataTransferService,
    GroupsService,
    UserdataService,
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
