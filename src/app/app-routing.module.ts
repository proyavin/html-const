import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/home.component'
import { SiteFormComponent } from './site/site-form.component'

const routes: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'site/new', component: SiteFormComponent,
    data: {
      formMode: 'add'
    }
  },
  {
    path: 'site/:id/edit', component: SiteFormComponent,
    data: {
      formMode: 'edit'
    }
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
