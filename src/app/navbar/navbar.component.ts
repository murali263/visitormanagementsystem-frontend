import { Component, OnInit, Output } from "@angular/core";
import { Router } from "@angular/router";
import { EventEmitter } from "@angular/core";
import { GenericService } from "../services/generic.service";
import { ProfilepageService } from "../profilepage.service";
import { DomSanitizer } from "@angular/platform-browser";
import {MediaChange,MediaObserver} from '@angular/flex-layout';

@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.scss"],
})
export class NavbarComponent implements OnInit {
  imageurl: any = "../../assets/images/dummypic.jpg";
  username: any;
  url: any;
  profile: any;
  loggedInUsername: any;
  token: any;
  showtopnav: boolean;
  title = 'vms';
  navToggle = true;
  fname :any;
  lname:any;
  isExpanded = false;
  isShowing = true;
  role:any

  @Output() hamburgerMenuClicked = new EventEmitter();
  constructor(
    private route: Router,
    public dataservice: GenericService,
    public ps:ProfilepageService
    
  ) {
   
  }

  ngOnInit(): void {
    this.getProfile();
    this.getUserName()
    this.token = localStorage.getItem('token');
  this.dataservice.email = localStorage.getItem('email');
        this.dataservice.username = localStorage.getItem('username');
        this.dataservice.role = localStorage.getItem('role');
  }
  onChange(){
    this.isShowing=false
}
  onClick(){
    this.isShowing = true
  }

  getUserName(){
    this.loggedInUsername = this.dataservice.username || localStorage.getItem("username");
  }

  getProfile() {
    this.ps.fetchProfile(localStorage.getItem("username")).subscribe((data) => {
      this.profile = data?.res;
    });
  }
 

  logout() {
    localStorage.clear();
    this.dataservice.showtopnav = false;
    this.route.navigate(["/login"]);
  }
}
