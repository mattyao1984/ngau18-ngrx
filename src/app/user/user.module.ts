import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { MaterialModule } from '../lib/material/material.module';
import { ReactiveFormsModule } from '@angular/forms';
import { UserComponent } from './user.component';
import { UserSearchComponent } from './user-search/user-search.component';

@NgModule({
  imports: [
    CommonModule,
    UserRoutingModule,
    MaterialModule,
    ReactiveFormsModule
  ],
  declarations: [UserProfileComponent, UserComponent, UserSearchComponent]
})
export class UserModule { }
