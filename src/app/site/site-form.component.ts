import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, Params, Data } from '@angular/router';

import { Site } from '../site'
import { StService } from '../st.service'
import { MessageService } from '../message.service'

@Component({
  selector: 'app-site-form',
  templateUrl: './site-form.component.html'
})

export class SiteFormComponent implements OnInit {

  @Input() formMode: string

  site: Site;
  errors: Array<string>;

  constructor(private _location: Location, private route: ActivatedRoute, private router: Router, private stService: StService, private messageService: MessageService) {
    this.formMode = this.route.snapshot.data['formMode']
  }

  ngOnInit() {

    this.messageService.clear()

    this.site = {
      title: '',
      desc: '',
      body: '',
      createdAt: new Date(),
      updatedAt: new Date()
    }

    if(this.formMode == 'edit') {
      this.stService.getSiteById(parseInt(this.route.snapshot.paramMap.get('id'))).then(data => {
        this.site = data
      })
    }

  }

  onSubmit() {

    if(this.formMode == 'add') {
      this.stService.addSite(this.site)
      this.messageService.clear()
      this.messageService.add({
        type: 'success',
        msg: 'Сайт успешно добавлен'
      })
    }else if(this.formMode == 'edit') {
      this.stService.updateSite(this.site)
      this.messageService.add({
        type: 'success',
        msg: 'Сайт успешно обновлен'
      })
    }

  }

  onBack() {
    this._location.back()
  }

}
