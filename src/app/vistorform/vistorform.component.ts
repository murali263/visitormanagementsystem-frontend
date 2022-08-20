import { Component, OnInit, ViewChild } from "@angular/core";
import { Validators, FormBuilder, FormGroup } from "@angular/forms";
import { GlobalService } from "../services/global.service";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { GenericService } from "../services/generic.service";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { ProfilepageService } from "../profilepage.service";
import { MatSort } from "@angular/material/sort";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { formatDate } from "@angular/common";

@Component({
  selector: "app-vistorform",
  templateUrl: "./vistorform.component.html",
  styleUrls: ["./vistorform.component.scss"],
})
export class VistorformComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  addvisitorform: FormGroup;
  visitorObj: any;
  selectedInTime: any;
  currentTime: any;
  currentDate: Date;
  //-------------------------username validation messages----------------------//
  emptyUserName = "Please enter a username";
  minlengthUserName = "user name must be at least 3 characters long";
  maxlengthUserName = "username cannot exceed 20 characters";
  userNamePattern = "username should be in alphanumeric only";
  //-----------------------phone number validation messages----------------------//
  emptyPhoneNumber = "You must enter a phonenumber";
  maxlengthPhoneNumber = "phonenumber cannot exceed 10 characters";
  minlengthPhoneNumber = "phonenumber must be at least 3 characters long";
  PhoneNumberPattern = "phonenumber should be in numericals only";
  //---------------------------------zipcode---------------------------------------------//
  maxlengthzip = "maxlength must be at least 6 characters";
  zipPattern = "Zipcode should be in numericals only";
  //--------------------------------common validation-----------------------------------------//
  characterspattern = "accept  alphanumeric only";
  //-------------------------password-----------------------------------------------//

  minlengthpassword = "password must be at least 5 characters long";
  maxlengthpassword = "password cannot exceed 7 characters";
  passwordPattern = "password  should contains Eg:(Abc@123)";
  //-----------------------------------------------------------------------------------------//

  constructor(
    private _fb: FormBuilder,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<VistorformComponent>,
    public profile: ProfilepageService,
    private _snackBar: MatSnackBar,
    private _gservice: GlobalService
  ) {}

  ngOnInit(): void {
    this.initailizeForm();
    this.currentDate = new Date();

  }
  initailizeForm() {
    this.addvisitorform = this._fb.group({
      visitorName: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z ]+"),
        ]),
      ],
      referenceBy: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("[a-zA-Z][a-zA-Z ]+"),
        ]),
      ],
      phoneNumber: [
        "",
        [
          Validators.required,
          Validators.minLength(10),
          Validators.maxLength(10),
          Validators.pattern("[1-9]{1}[0-9]{9}"),
        ],
      ],
      visitDate: ["", Validators.required],
      vehicleNumber: [
        "",
      ],
      visitingFrom: ["", Validators.required],
      members: ["", Validators.required],
      email: [
        "",
        Validators.compose([
          Validators.required,
          Validators.pattern("^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$"),
        ]),
      ],
      visitTime: ["", Validators.required],
      AdditionalInfo: ["", Validators.required],
    });
  }

  selectInTime(value: string) {
    if (value !== "") {
      this.selectedInTime = value;
    }
  }

  addVisitor() {
  
    if (this.addvisitorform.valid) {
      this.visitorObj = this.addvisitorform.value;
      this.visitorObj.visitDate =
        this.visitorObj.visitDate.toLocaleDateString();

      this.visitorObj.companyId = localStorage.getItem("companyId");

      this._gservice.createVistor(this.visitorObj).subscribe((res) => {
        this.dialogRef.close("saved");
        if (res["message"] == "relogin") {
          this._snackBar.open("Session expired . Please relogin", "ok", {
            duration: 5000,
          });
        }
        if (res["message"] == "saved") {
          this._snackBar.open("Vistor is saved", "ok", { duration: 3000 });
          this.dialogRef.close("saved");
        }
      });
    } else {
      this._snackBar.open("Please enter company name", "ok", {
        duration: 3000,
      });
    }
  }
}
