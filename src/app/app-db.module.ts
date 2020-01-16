import { NgModule } from '@angular/core';
import { NgxIndexedDBModule, DBConfig } from 'ngx-indexed-db';

const dbConfig: DBConfig = {
  name: 'html-const',
  version: 1,
  objectStoresMeta: [{
    store: 'sites',
    storeConfig: { keyPath: 'id', autoIncrement: true },
    storeSchema: []
  }]
};

@NgModule({
  imports: [NgxIndexedDBModule.forRoot(dbConfig)],
  exports: [NgxIndexedDBModule]
})
export class AppDbModule { }
