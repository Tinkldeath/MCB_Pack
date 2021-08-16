import { ViewSubjectsComponent } from './../components/view-subjects/view-subjects.component';
import { ViewAuthorsComponent } from './../components/view-authors/view-authors.component';
import { ViewCategoriesComponent } from './../components/view-categories/view-categories.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { HomePage } from './home.page';
import { MainComponent } from '../components/main/main.component';

import { HomePageRoutingModule } from './home-routing.module';

import { Ng2SearchPipeModule } from 'ng2-search-filter';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    HomePageRoutingModule,
    Ng2SearchPipeModule
  ],
  declarations: [HomePage, MainComponent, ViewCategoriesComponent, ViewAuthorsComponent,ViewSubjectsComponent],
  entryComponents: []
})
export class HomePageModule {}
