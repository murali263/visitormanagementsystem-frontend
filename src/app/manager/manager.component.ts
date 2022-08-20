
import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormGroup, } from '@angular/forms';
import { GlobalService } from '../services/global.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { ProfilepageService } from '../profilepage.service';
import { MatSort } from '@angular/material/sort';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  addManagerform: FormGroup;
  managerObj: any;
  editmanager:any;
  constructor(private _fb: FormBuilder,
    private _gservice: GlobalService,
    public dialogRef: MatDialogRef<ManagerComponent>,
    public dialog: MatDialog,
    public profile: ProfilepageService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data,) { }
//-------------------------username validation messages----------------------//
emptyUserName =  'Please enter a username';
minlengthUserName = 'user name must be at least 3 characters long';
maxlengthUserName = 'username cannot exceed 5 characters';
userNamePattern = 'username should be in alphanumeric only';
//-----------------------phone number validation messages----------------------//
emptyPhoneNumber = 'You must enter a phonenumber';
maxlengthPhoneNumber = 'phonenumber cannot exceed 10 characters';
minlengthPhoneNumber = 'phonenumber must be at least 3 characters long';
PhoneNumberPattern = 'phonenumber should be in numericals only';
//---------------------------------zipcode---------------------------------------------//
maxlengthzip = 'maxlength must be at least 6 characters';
zipPattern = 'Zipcode should be in numericals only';
//--------------------------------common validation-----------------------------------------//
characterspattern = 'accept  alphanumeric only';
//-------------------------password-----------------------------------------------//

minlengthpassword = 'password must be at least 5 characters long';
maxlengthpassword = 'password cannot exceed 7 characters';
passwordPattern = 'password  should contains Eg:(Abc@123)';
//-----------------------------------------------------------------------------------------//

  ngOnInit(): void {
    this.initailizeForm()
    if (this.data && this.data.updatecompany) {
      this.editmanager = this.data.updatecompany;
      this.MangerPatch();
    } else {
      this.addManager()
    }
  }
  initailizeForm() {
    this.addManagerform = this._fb.group({
      fname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ]),
      ],
      userName: ['',[
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(10),
       
      ],],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),
      ],],
      Department: ['', Validators.required],

    });
  }

  MangerPatch() {
    this.addManagerform.patchValue({
      fname:this.editmanager.fname,
      lname:this.editmanager.lname,
      userName: this.editmanager.userName,
      email: this.editmanager.email,
      phoneNumber: this.editmanager.phoneNumber,
      idProof: this.editmanager.idProof,
      Address: this.editmanager.Address,
      city: this.editmanager.city,
      pincode: this.editmanager.pincode,
      Department: this.editmanager.Department,
    });
  }





addManager() {   
  if (this.addManagerform.valid) {
    if (this.managerObj) {
      this.managerObj = this.addManagerform.value;
      this.managerObj.companyId = this.editmanager.companyId;
      this._gservice.Manager_Date_Updated(this.managerObj).subscribe((res) => {
        if(res){
          this._snackBar.open('Manager is updated', 'ok', { duration: 5000 });
          this.dialogRef.close('saved');
        }
      });
    }
    else {
      this.managerObj = this.addManagerform.value;
      this.managerObj.companyId = localStorage.getItem('companyId');
      console.log(this.managerObj)
      this._gservice.createManager(this.managerObj).subscribe((res) => {
        if (res['message'] == "relogin") {
          this._snackBar.open('Session expired . Please relogin', 'ok', { duration: 5000 });
        }
        if (res['message'] == 'saved') {
          this._snackBar.open('Manager is saved', 'ok', { duration: 3000 });
          this.dialogRef.close('saved');
        }
      });
    }
  }
  else {
    this._snackBar.open('Please fill all fields', 'ok', { duration: 3000 });
  }
}



  //making the first letter caps
  caps(value) {
    let arr = value.target.value.charAt(0).toUpperCase().concat(value.target.value.slice(1, value.target.value.length));
    document.getElementById(value.target.id)['value'] = arr;
  }

  letterOnly(event:any){
    return /^[a-zA-Z ]+$/i.test(event.key)
  }
}
