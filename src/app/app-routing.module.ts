import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from './pages/userForm/UserForm.component';
import { AnalyticsComponent } from './pages/analytics/analytics.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'user-form',

    component: UserFormComponent,
  },
  {
    path: 'analytics',

    component: AnalyticsComponent,
  },
  {
    path: '',

    pathMatch: 'full',
    component: UserFormComponent,
  },
  {
    path: '**',

    pathMatch: 'full',
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {
  constructor() {

  }
}
