import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { formatDate } from '@angular/common'
import { DomSanitizer } from '@angular/platform-browser';

import { Site } from '../app.component'
import { StService } from '../st.service'
import { MessageService } from '../message.service'

@Component({
  selector: 'app-site',
  templateUrl: './site.component.html',
  styleUrls: ['./site.component.scss']
})
export class SiteComponent implements OnInit {

  @Input() site: Site

  @Output()
  remove: EventEmitter<Site> = new EventEmitter()

  jsonFileUrl

  constructor(private stService: StService, private sanitizer: DomSanitizer, private messageService: MessageService) {}

  ngOnInit() {
    this.stService.getSiteById(this.site.id).then(
        site => {
          let jsonFile = new Blob([JSON.stringify(site)], {type: 'application/json'})
          this.jsonFileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(jsonFile));
        },
        error => {
            console.log(error);
        }
    );
  }

  delete() {
    this.stService.deleteSite(this.site.id).then(
        () => {
          this.remove.emit(this.site);
          this.messageService.clear()
          this.messageService.add({
            type: 'success',
            msg: 'Сайт успешно удален'
          })
        },
        error => {
            console.log(error);
        }
    );
  }

  getDate(par:string = 'created') {
    return formatDate((par == 'created') ? this.site.createdAt : this.site.updatedAt, 'd LLLL y в H:mm', 'ru')
  }

}
