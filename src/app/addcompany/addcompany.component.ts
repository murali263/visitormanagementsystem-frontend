import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators, FormArray } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { GenericService } from "../services/generic.service";
import { GlobalService } from "../services/global.service";
import { MatSnackBar } from "@angular/material/snack-bar";

@Component({
  selector: "app-addcompany",
  templateUrl: "./addcompany.component.html",
  styleUrls: ["./addcompany.component.scss"],
})
export class AddcompanyComponent implements OnInit {
  addCompanyform: FormGroup;
  members: FormArray;
  companyAdmins: FormArray;
  companyObj: any;
  editCompany: any;
  subCompany: any;
  parentcompanyname;
  states: any = [];
  selectedStateDistricts: any = [];
  constructor(
    private _fb: FormBuilder,
    private dataservice: GenericService,
    public dialogRef: MatDialogRef<AddcompanyComponent>,
    private _gservice: GlobalService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data
  ) {}
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
  ngOnInit(): void {
    this._gservice.fetchcitysstates().subscribe((data) => {
      (this.states = data),
        (err) => {
          console.log(err);
        };
    });

    this.initailizeForm();
    if (this.data && this.data.updatecompany) {
      this.editCompany = this.data.updatecompany;

      console.log(this.parentcompanyname);
      this.companyPatch();
      this.spocPatch();
    } else if (this.data && this.data.companyData) {
      this.subCompany = this.data.companyData;
      this.parentcompanyname = this.data.companyData.companyname;
    }
  }
  initailizeForm() {
    this.addCompanyform = this._fb.group({
      companyname: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z][a-zA-Z ]+"),
        ],
      ],
      companylogo: [''],
      addressline1: ["", [Validators.required, Validators.minLength(3)]],
      addressline2: ["", [Validators.required, Validators.minLength(3)]],
      country: [
        "",
        [
          Validators.required,
          Validators.minLength(3),
          Validators.pattern("[a-zA-Z][a-zA-Z ]+"),
        ],
      ],
      state: ["", [Validators.required]],
      city: ["", [Validators.required]],
      pincode: ["", Validators.required],
      scode: [this.dataservice.scode],
      spoc: this._fb.array([this.spocForm()]),
      companyAdmin: this._fb.array([this.companyAdminForm()]),
    });
  }

  // for adding company
  companyPatch() {
    this.addCompanyform.patchValue({
      companyname: this.editCompany.companyname,
      companylogo: this.editCompany.companylogo,
      addressline1: this.editCompany.addressline1,
      addressline2: this.editCompany.addressline2,
      state: this.editCompany.state,
      country: this.editCompany.country,
      city: this.editCompany.city,
      pincode: this.editCompany.pincode,
      scode: this.dataservice.scode,
      GST: this.editCompany.GST,
    });
  }

  spocPatch() {
    let spoc = this.addCompanyform.get("spoc") as FormArray;
    for (let i = 0; i < this.editCompany.spoc.length; i++) {
      spoc.controls[i].patchValue({
        SpocName: this.editCompany.spoc[i].SpocName,
        Spoccontact: this.editCompany.spoc[i].Spoccontact,
        SpocEmail: this.editCompany.spoc[i].SpocEmail,
        role: this.editCompany.spoc[i].role,
      });
    }
  }

  parentCompany() {
    this.parentcompanyname = this.data.companyData.companyname;
  }

  addCompany() {
    if (this.addCompanyform.valid) {
      if (this.editCompany && this.editCompany?.companyId) {
        this.companyObj = this.addCompanyform.value;
        this.companyObj.companyId = this.editCompany.companyId;
        this._gservice
          .parent_company_updated(this.companyObj)
          .subscribe((res) => {
            this._snackBar.open("update succefully", "ok", { duration: 5000 });
            this.dialogRef.close("saved");
          });
      } else {
        if (this.data?.type) {
          this.companyObj = this.addCompanyform.value;
          this.companyObj.type = this.data.type;
          this.companyObj.parentCompanyId = this.subCompany.companyId;
          this._gservice
            .createSubCompanies(this.companyObj)
            .subscribe((res) => {
              if (res["message"] == "relogin") {
                this._snackBar.open("Session expired . Please relogin", "ok", {
                  duration: 5000,
                });
              }
              if (res["message"] == "saved") {
                this._snackBar.open("Company is saved", "ok", {
                  duration: 3000,
                });
                this.dialogRef.close("saved");
              }
            });
        } else {
          this.companyObj = this.addCompanyform.value;
          this._gservice.createCompanies(this.companyObj).subscribe((res) => {
            if (res["message"] == "relogin") {
              this._snackBar.open("Session expired . Please relogin", "ok", {
                duration: 5000,
              });
            }
            if (res.message == "saved") {
              this._snackBar.open("Company is saved", "ok", { duration: 3000 });
              this.dialogRef.close("saved");
            }
          });
        }
      }
    } else {
      this._snackBar.open("Please fill All fields", "ok", { duration: 3000 });
    }
  }

  changeState(data) {
    this.selectedStateDistricts = this.states[data].districts.sort();
  }
  Autocapitalization(value) {
    let arr = value.target.value
      .charAt(0)
      .toUpperCase()
      .concat(value.target.value.slice(1, value.target.value.length));
    document.getElementById(value.target.id)["value"] = arr;
  }

  spocForm(): FormGroup {
    return this._fb.group({
      SpocName: [],
      Spoccontact: "",
      SpocEmail: "",
      role: "admin",
    });
  }
  companyAdminForm(): FormGroup {
    return this._fb.group({
      AdminName: "",
      AdminContact: "",
      AdminEmail: "",
    });
  }

  addSpoc() {
    this.members = this.addCompanyform.get("spoc") as FormArray;
    this.members.push(this.spocForm());
  }
  addCompanyAdmin() {
    this.companyAdmins = this.addCompanyform.get("companyAdmin") as FormArray;
    this.companyAdmins.push(this.companyAdminForm());
  }

  removeSpoc(i: number) {
    // *ngIf="addCompanyform.controls.addBuddies.controls.length > 2"
    if ((this.addCompanyform.get("spoc") as FormArray).length > 1) {
      (this.addCompanyform.get("spoc") as FormArray).removeAt(i);
    }
  }

  removeAdmin(i: number) {
    (this.addCompanyform.get("companyAdmin") as FormArray).removeAt(i);
  }
}
