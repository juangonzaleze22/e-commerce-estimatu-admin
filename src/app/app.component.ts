import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { trigger, state, style, animate, transition } from '@angular/animations';
import { Router } from '@angular/router';

import * as Feather from 'feather-icons';
import { GlobalService } from './services/global.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ opacity: 0 }),
            animate('1s ease-out',
              style({ opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ opacity: 1 }),
            animate('.25s ease-in',
              style({ opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class AppComponent implements OnInit, AfterViewInit {

  subscription: Subscription;
  suscriptionLogin: Subscription


  login: boolean;
  collapseMenu;

  constructor(
    private global: GlobalService,
    private _router: Router
  ) { }

  ngOnInit(): void {
    localStorage.setItem('lang', '1');

    this.subscription = this.global.observable().subscribe(data => {
      this.collapseMenu = data["aside"]
    });

    this.suscriptionLogin = this.global.isLoggedIn$.subscribe(login => {
      this.login = login;
      console.log("login", login);
      if (!login) {
        setTimeout(() => {
          Feather.replace();
        }, 100);
      }
    })


    this.getDataUser();

  }

  ngAfterViewInit() {
    setTimeout(() => {
      Feather.replace();
    }, 100);
  }

  
  getDataUser() {
    const user = localStorage.getItem('token')
    if (!user) {
      this.login = true
    } else if (user.length > 0) {
      this.login = false
      /* this._router.navigate(['dashboard']) */
    }
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.suscriptionLogin.unsubscribe();
  }

}
