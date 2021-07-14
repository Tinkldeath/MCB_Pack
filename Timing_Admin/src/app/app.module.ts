import { DataTransferService } from './shared/services/data-transfer/data-transfer.service';
import { SpecialsService } from './shared/services/specials/specials.service';
import { SchedulesService } from './shared/services/schedules/schedules.service';
import { GroupsService } from './shared/services/groups/groups.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';


@NgModule({
  declarations: [AppComponent,],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [{ provide: RouteReuseStrategy, useClass: IonicRouteStrategy }, GroupsService, SchedulesService, SpecialsService, DataTransferService, HttpClientModule, HttpClient,],
  bootstrap: [AppComponent],
})
export class AppModule {}
