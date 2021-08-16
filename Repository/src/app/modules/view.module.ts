import { NgModule } from '@angular/core';
import { ViewSubjectsComponent } from './../components/view-subjects/view-subjects.component';
import { ViewAuthorsComponent } from './../components/view-authors/view-authors.component';
import { ViewCategoriesComponent } from './../components/view-categories/view-categories.component';
import { Ng2SearchPipeModule } from 'ng2-search-filter';
import { MainComponent } from '../components/main/main.component';
import { IonicModule } from '@ionic/angular';

@NgModule({
  imports: [
    IonicModule,
    Ng2SearchPipeModule
  ],
  declarations: [
    MainComponent, ViewCategoriesComponent, ViewAuthorsComponent,ViewSubjectsComponent
  ],
  exports : [
    MainComponent, ViewCategoriesComponent, ViewAuthorsComponent,ViewSubjectsComponent
  ]
})

export class ViewModule{}
