import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  textContent = [];
  currentMsg = '';
  constructor() {
  }

  ngOnInit() {
  }

  msgPush() {
    this.textContent.push(this.currentMsg);
    this.currentMsg = '';
  }

}
