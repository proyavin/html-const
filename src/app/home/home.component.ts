import { Component, OnInit } from '@angular/core';
import { NgxIndexedDBService } from 'ngx-indexed-db';

import { StService } from '../st.service'
import { ImportService } from '../import.service'
import { MessageService } from '../message.service'

import { Site } from '../site'

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})

export class HomeComponent implements OnInit {

  searchRequest: string = ''
  sitesShow: Array<Site>
  sitesCount: number
  sitesSort: string
  sort: string = 'ASC'
  sitesAll

  constructor(private stService: StService, private importService: ImportService, private messageService: MessageService) {
    this.sitesShow = new Array()
  }

  ngOnInit() {
    this.getSites()
    this.messageService.clear()
  }

  getSites() {
    this.stService.getAll().then(
        sites => {
          if(this.sort == 'DESC') {
            this.sitesAll = sites.reverse()
          }else if(this.sort == 'ASC') {
            this.sitesAll = sites
          }
          this.sitesShow = this.sitesAll
          this.sitesCount = this.sitesAll.length
        },
        error => {
            console.log(error);
        }
    )
  }

  searchSites() {
    console.log(this.sitesShow)
    if(this.sitesAll.length > 0) {
      this.sitesShow = this.sitesAll.filter(site => {
        if(
            site.title.toLowerCase().includes(this.searchRequest.toLowerCase()) ||
            site.desc.toLowerCase().includes(this.searchRequest.toLowerCase())
          ) {
          return site
        }
      })
    }
  }

  impotJson(fileInput: any) {
    if (fileInput.target.files && fileInput.target.files[0]) {
      let reader = new FileReader();
      let _this = this

      reader.onload = function (e : any) {
        _this.importService.getData(e.target.result)
          .subscribe((data: any[]) => {
            if(data[1] != undefined) {
              for(let i = 0; i < data.length; i++) {
                _this.stService.addSite(data[i])
              }
            }else {
              _this.stService.addSite(data)
            }
            _this.getSites()
            fileInput.target.value = ''
          });
      }

      reader.readAsDataURL(fileInput.target.files[0]);
    }
  }

  onRemoveSite(site: Site) {
    this.getSites()
  }

  sortItems(sort: string) {
    this.sort = sort
    this.getSites()
  }

}
