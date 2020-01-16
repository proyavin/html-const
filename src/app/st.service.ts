import { Injectable } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

@Injectable({
  providedIn: 'root'
})
export class StService {

  constructor(private dbService: NgxIndexedDBService) {
    this.dbService.currentStore = 'sites';
  }

  getSiteById(id) {
    return this.dbService.getByKey(id)
  }

  getAll() {
    return this.dbService.getAll()
  }

  addSite(site) {
    if(site.id) delete site.id
    site.createdAt = site.updatedAt = new Date()

    console.log(site)

    return this.dbService.add(site)
  }

  updateSite(site) {
    site.updatedAt = new Date()

    return this.dbService.update(site)
  }

  deleteSite(id) {
    return this.dbService.delete(id)
  }

}
