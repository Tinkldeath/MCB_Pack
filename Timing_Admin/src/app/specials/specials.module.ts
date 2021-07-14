import { GroupsModalComponent } from '../components/groups-modal/groups-modal.component';
import { UpdateSpecModalComponent } from '../components/update-spec-modal/update-spec-modal.component';
import { AddSpecModalComponent } from '../components/add-spec-modal/add-spec-modal.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { SpecialsPageRoutingModule } from './specials-routing.module';

import { SpecialsPage } from './specials.page';
import { UpdateGroupModalComponent } from '../components/update-group-modal/update-group-modal.component'
import { ScheduleComponent } from '../components/schedule/schedule.component';
import { AddGroupModalComponent } from './../components/add-group-modal/add-group-modal.component'

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    SpecialsPageRoutingModule,
  ],
  declarations: [SpecialsPage,AddSpecModalComponent, UpdateSpecModalComponent, GroupsModalComponent,UpdateGroupModalComponent,ScheduleComponent, AddGroupModalComponent],
  entryComponents: [AddSpecModalComponent,UpdateSpecModalComponent,GroupsModalComponent,UpdateGroupModalComponent,ScheduleComponent, AddGroupModalComponent],
  providers: [SpecialsPage]
})
export class SpecialsPageModule {}
