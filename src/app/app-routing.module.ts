import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {path:'', redirectTo:'login',pathMatch:'full'},
  {path: 'login', loadChildren: () => import('./components/users/login/login.module').then(m => m.LoginModule) }, { path: 'admin-manager', loadChildren: () => import('./components/users/admin-manager/admin-manager.module').then(m => m.AdminManagerModule) }, { path: 'simulator', loadChildren: () => import('./components/users/simulator/simulator.module').then(m => m.SimulatorModule) },
  { path: 'admin-manager', loadChildren: () => import('./components/users/admin-manager/admin-manager.module').then(m => m.AdminManagerModule) },
  { path: 'simulator', loadChildren: () => import('./components/users/simulator/simulator.module').then(m => m.SimulatorModule) }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
