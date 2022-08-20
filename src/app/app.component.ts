import { Component, HostListener } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, ActivatedRouteSnapshot, Router } from '@angular/router';
import { Observable, Subject, Subscription } from 'rxjs';
import { ProfilepageService } from './profilepage.service';
import { GenericService } from './services/generic.service'
//import {DashboardService} from './dashboard.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title = 'vms';
  navToggle = true;
  hamburgerOpened: boolean = false;
  subscription: Subscription;

  private storageSub = new Subject<string>();
  constructor(public dataservice: GenericService, private router: Router, private route: ActivatedRoute) {
    // window.addEventListener('storage', (e) => {
    //   console.log(e);
    // })
    // window.onstorage = (e: any) => {
    //   console.log(e);
    // }
    // this.subscription = this.router.events.subscribe((event: any) => {
    //   console.log("outside",event.url);
    //   let url = event.url;

     
    //   if (url != undefined && url==['/sign-in']) {
    //     console.log("Inside",);
    //     this.dataservice.showtopnav = false;
    //     localStorage.clear();
       

    //   }else {
    //     this.dataservice.email = localStorage.getItem('email');
    //     this.dataservice.username = localStorage.getItem('username');
    //     this.dataservice.role = localStorage.getItem('role');
    //     this.dataservice.scode = localStorage.getItem('scode');
    //     if (localStorage.getItem('token')) {
    //       this.dataservice.showtopnav = true;
    //     }
    //   }
     
    // });

  }
  toggleNav() {
    this.navToggle = !this.navToggle;
    this.navToggle = true;
  }
  toggleOnSelect() {
    this.navToggle = false;
  }
  ngOnInit(): void {


    

    
  }
}
