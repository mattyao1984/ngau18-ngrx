import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';

const routes: Routes = [
    { path: '',  redirectTo:  'home',  pathMatch:  'full' },
    { path: 'home', loadChildren: './home/home.module#HomeModule'}, 
    { path: 'user', loadChildren: './user/user.module#UserModule'} 
  ];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
