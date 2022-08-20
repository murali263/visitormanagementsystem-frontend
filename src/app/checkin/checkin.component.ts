import { Component, Inject, OnInit } from "@angular/core";
import { inject } from "@angular/core/testing";
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GlobalService } from "../services/global.service";
@Component({
  selector: "app-checkin",
  templateUrl: "./checkin.component.html",
  styleUrls: ["./checkin.component.scss"],
})
export class CheckinComponent implements OnInit {
  constructor(
    public global: GlobalService,
    @Inject(MAT_DIALOG_DATA) public data: any, 
    public snackbar: MatSnackBar,
    public fb: FormBuilder,
    public dialogRef: MatDialogRef<CheckinComponent>
  ) {}

  ngOnInit(): void {
    // console.log("===================>",this.data);
  }
  otpform = this.fb.group({
    verificationCode: ["", Validators.required],
  });

  updateCheckInandOut() { 
    let inputData = {
      phoneNumber: this.data.phoneNumber,
      checkinUid:localStorage.getItem('uid'),
      checkoutUid:localStorage.getItem('uid'),
      verificationCode: this.otpform.value.verificationCode,
    };
    console.log(inputData)
    if (this.data.verificationCode == this.otpform.value.verificationCode) {
      if (this.data.status == "checkIn") {
        this.global.visitorcheckin(inputData).subscribe((data: any) => {
          console.log("data", data);
          if (data) {
            this.dialogRef.close("updated");
            this.snackbar.open("Checkin Successfull", "ok", { duration: 2000 });
          }
        });
      } else if (this.data.status == "checkOut") {
        let inputDataCheckOut ={
          phoneNumber: this.data.phoneNumber,
          checkoutUid:localStorage.getItem('uid'),
          verificationCode: this.otpform.value.verificationCode,
        }
       console.log(inputData)
        this.global.visitorcheckout(inputDataCheckOut).subscribe((data: any) => {
     
          if (data) {
            this.dialogRef.close("updated");
            this.snackbar.open("Checkout Successfull", "ok", { duration: 2000 });
          }
        });
      }
    } else {
      this.snackbar.open("Please enter valid 4-digit otp number", "ok", {
        duration: 2000,
      });
    }
  }

 
}
