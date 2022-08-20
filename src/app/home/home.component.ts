import { Component, OnInit } from "@angular/core";
import { FormBuilder, Validators } from "@angular/forms";
import { GlobalService } from "../services/global.service";
import { GenericService } from "../services/generic.service";
import { Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatDialog } from "@angular/material/dialog";
import { ForgotpasswordComponent } from "../forgotpassword/forgotpassword.component";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
})
export class HomeComponent implements OnInit {
  userObj: any;
  token: any;
  typeOfUser: any;
  hide = true;

  constructor(
    private fb: FormBuilder,
    private _gservice: GlobalService,
    public _dialog: MatDialog,
    private route: Router,
    private dataservice: GenericService,
    private _snackbar: MatSnackBar
  ) {}

  ngOnInit() {}
  loginForm = this.fb.group({
    username: ["", Validators.required],
    password: ["Welcome@123", Validators.required],
  });
  submit() {
    if (this.loginForm.invalid) {
      this._snackbar.open("Please enter the valid creditinals", "ok", {
        duration: 3000,
        panelClass: ["blue-snackbar"],
      });
    }
    if (this.loginForm.valid) {
      this._gservice.login(this.loginForm.value).subscribe((res) => {
        if (res.message == "logged in") {
          this.token = res.token;
          this.userObj = res?.user;
          this.dataservice.showtopnav = true;
          this.typeOfUser = localStorage.getItem("role");
          if (this.userObj.role == "superadmin") {
            this.data();
            this.route.navigate(["/navbar/dashboard"]);
          } else if (
            this.userObj.role == "admin" ||
            this.userObj.role == "manager"
          ) {
            this.data();
            this.route.navigate(["/navbar/dashboard"]);
          } else if (this.userObj.role == "guard") {
            this.data();
            this.route.navigate(["/navbar/vistorDetails"]);
          }
        } else {
          this._snackbar.open(res.message, "ok", {
            duration: 3000,
            panelClass: ["blue-snackbar"],
          });
        }
      });
    }
  }

  data() {
    localStorage.setItem("token", this.token);
    localStorage.setItem("email", this.userObj.email);
    localStorage.setItem("scode", this.userObj.scode);
    localStorage.setItem("username", this.userObj.username);
    localStorage.setItem("role", this.userObj.role);
    localStorage.setItem("companyId", this.userObj.companyId);
    localStorage.setItem("uid", this.userObj.uid);
    this.dataservice.email = this.userObj.email;
    this.dataservice.firstname = this.userObj.fname;
    this.dataservice.lastname = this.userObj.lname;
    this.dataservice.role = this.userObj.role;
    this.dataservice.username = this.userObj.username;
    this.dataservice.scode = this.userObj.scode;
    this.dataservice.uid = this.userObj.uid;
  }

  forgotpassword() {
    let dialogRef = this._dialog.open(ForgotpasswordComponent, {
      width: "800px",
      height: "400px",
    });
    dialogRef.afterClosed();
  }
}
