import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SchedulesPageRoutingModule } from './schedules-routing.module';

import { SchedulesPage } from './schedules.page';
import { ScheduleChislComponent } from '../components/schedule-chisl/schedule-chisl.component';
import { ScheduleZnamComponent } from '../components/schedule-znam/schedule-znam.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SchedulesPageRoutingModule
  ],
  declarations: [SchedulesPage,ScheduleChislComponent, ScheduleZnamComponent],
  entryComponents: [ScheduleChislComponent,ScheduleZnamComponent],
})
export class SchedulesPageModule {}
