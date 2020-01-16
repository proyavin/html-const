import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {

  private db
  private dbName: string

  constructor() {

    this.dbName = 'html-const'

    let dbRequest = indexedDB.open(this.dbName, 2)
    let _this = this

    dbRequest.onupgradeneeded = function() {    
      if (!_this.db.objectStoreNames.contains('sites')) {
        _this.db.createObjectStore('sites', {keyPath: 'id', autoIncrement: true})
      }
      
    }

    dbRequest.onsuccess = function() {
      _this.db = dbRequest.result
    }
  }

  async saveSite(site) {
    let sitesTransaction = this.db.transaction("sites", "readwrite")
    let sites = sitesTransaction.objectStore("sites")

    site.createdAt = site.updatedAt = new Date()

    let addedSiteResult = await sites.add(site)

  }

  updateSite() {

  }

  async getAllSites() {
      let sitesTransaction = await this.db.transaction("sites", "readwrite");
      let sites = await sitesTransaction.objectStore("sites");

      return await sites.getAll().result

  }

  deleteSite() {

  }

  exportSite() {

  }

}
