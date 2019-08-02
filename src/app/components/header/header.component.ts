import { Component, OnInit } from '@angular/core';
import { ProgBarComponent } from './prog-bar/prog-bar.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  logo = '../../assets/angular.svg';

  constructor() { }

  ngOnInit() {
  }

}
