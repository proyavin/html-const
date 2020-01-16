import { Component } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

export interface Site {
  id?: number;
  title: string,
  desc: string,
  body: string,
  updatedAt: Date|null,
  createdAt: Date|null
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})

export class AppComponent {
  title = 'html-const';

  constructor(private dbService: NgxIndexedDBService){
    dbService.currentStore = 'people';
  }
}
