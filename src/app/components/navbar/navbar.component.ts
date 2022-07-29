import { Component, OnInit } from '@angular/core';
import { GlobalService } from 'src/app/services/global.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss']
})
export class NavbarComponent implements OnInit {

  collapseAside: boolean = false;

  

  constructor(
    public global: GlobalService
  ) { }

  ngOnInit(): void {
  }

  hideAside(){ 
    this.collapseAside = !this.collapseAside;
    this.global.publish({aside: this.collapseAside});
  }

}
