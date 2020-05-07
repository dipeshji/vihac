import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from '../app/initialComponent/home/home.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'user',
    loadChildren: () => import('./registerModule/signup/signup.module')
      .then(loadModule => loadModule.SignupModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
