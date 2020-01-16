import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { registerLocaleData } from '@angular/common';
import { HttpClientModule } from "@angular/common/http";
import localeRu from '@angular/common/locales/ru';
import {NgxPaginationModule} from 'ngx-pagination';

import { AppRoutingModule } from './app-routing.module';
import { AppDbModule } from './app-db.module';
import { AppComponent } from './app.component';
import { SiteComponent } from './site/site.component';
import { SiteFormComponent } from './site/site-form.component';
import { HomeComponent } from './home/home.component';
import { MessagesComponent } from './messages/messages.component';

registerLocaleData(localeRu, 'ru')

@NgModule({
  declarations: [
    AppComponent,
    SiteComponent,
    SiteFormComponent,
    HomeComponent,
    MessagesComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    AppDbModule,
    HttpClientModule,
    NgxPaginationModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
