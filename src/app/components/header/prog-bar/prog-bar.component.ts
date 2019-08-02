import { Component, OnInit } from '@angular/core';
import { Router, NavigationStart, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-prog-bar',
  templateUrl: './prog-bar.component.html',
  styleUrls: ['./prog-bar.component.scss']
})
export class ProgBarComponent implements OnInit {

  constructor(private router: Router){}
  color = 'primary';
  mode = 'determinate';
  value = 0;
  bufferValue = 0;
  interval = 0;
  ngOnInit() {
  }

  clearTimer() { clearInterval(this.interval); }
  routeChange() {
    this.router.events.subscribe((evt) => {
      if ((evt instanceof NavigationStart)) {
        this.interval = window.setInterval(() => {
          this.value += 10;
        }, 10);
      }
      if ((evt instanceof NavigationEnd)) {
        this.value = 0;
        this.clearTimer();
      }
    });
  }

}
