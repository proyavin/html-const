import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MessageService {

  constructor() { }

  messages: object[] = [];

  add(message: object) {
    this.messages.push(message);
  }

  clear() {
    this.messages = [];
  }
}
