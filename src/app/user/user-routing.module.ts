import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { UserProfileComponent } from './containers/user-profile/user-profile.component';
import { UserComponent } from './user.component';
import { UserSearchComponent } from './containers/user-search/user-search.component';

const routes: Routes = [
  {
    path: '', component: UserComponent,
    children: [
      {
        path: '',
        component: UserSearchComponent
      },
      { path: 'profile', component: UserProfileComponent, pathMatch: 'full' },
      { path: 'profile/:id', component: UserProfileComponent, pathMatch: 'full' },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
