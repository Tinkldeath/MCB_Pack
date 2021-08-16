import { UsersComponent } from '../../components/users/users.component';
import { PostsComponent } from '../../components/posts/posts.component';
import { SubjectsComponent } from '../../components/subjects/subjects.component';
import { CategoriesComponent } from '../../components/categories/categories.component';
import { ChangePasswordComponent } from '../../components/change-password/change-password.component';
import { ChangeLoginComponent } from '../../components/change-login/change-login.component';
import { AddCategoryComponent } from '../../components/add-category/add-category.component';
import { AddSubjectComponent } from '../../components/add-subject/add-subject.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AccountPageRoutingModule } from './account-routing.module';

import { AccountPage } from './account.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AccountPageRoutingModule
  ],
  entryComponents: [],
  declarations: [AccountPage,CategoriesComponent,SubjectsComponent, PostsComponent, UsersComponent, ChangePasswordComponent,
     ChangeLoginComponent, AddCategoryComponent, AddSubjectComponent]
})
export class AccountPageModule {}
