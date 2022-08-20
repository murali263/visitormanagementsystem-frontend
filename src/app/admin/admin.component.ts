import { Component, Inject, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder, FormArray } from '@angular/forms';
import { GlobalService } from '../services/global.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GenericService } from '../services/generic.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { ProfilepageService } from '../profilepage.service';
import { MatSort } from '@angular/material/sort';
import { LiveAnnouncer } from '@angular/cdk/a11y';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  addGuardform: any;
  members: FormArray
  guardObj: any;
  editGuard: any;
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

//--------------------------------common validation-----------------------------------------//
characterspattern = 'accept  alphanumeric only';
//-------------------------password-----------------------------------------------//

minlengthpassword = 'password must be at least 5 characters long';
maxlengthpassword = 'password cannot exceed 7 characters';
passwordPattern = 'password  should contains Eg:(Abc@123)';
//-----------------------------------------------------------------------------------------//


  constructor(private _fb: FormBuilder,
    private _gservice: GlobalService,
    public dialog: MatDialog,
    public dialogRef: MatDialogRef<AdminComponent>,
    public profile: ProfilepageService,
    private _snackBar: MatSnackBar,
    @Inject(MAT_DIALOG_DATA) public data,
  ) { }



  ngOnInit(): void {
    this.initailizeForm()
    if (this.data && this.data.updateGuard) {
      this.editGuard = this.data.updateGuard;
      this.guardPatch();
    } else {
      this.addGuard()
    }
  }
  initailizeForm() {
    this.addGuardform = this._fb.group({
      fname: [
        '',
        Validators.compose([
          Validators.required,
          Validators.pattern('[a-zA-Z][a-zA-Z ]+'),
        ]),
      ],
    
      userName: ['',[
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(5),
      ],
],
      email: ['', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$'),
      ]),
],
      phoneNumber: ['', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(10),
        Validators.pattern('[1-9]{1}[0-9]{9}'),
      ],
],
      
      ActiveLocation: ['', Validators.required],
     
    });
  }

  guardPatch() {
    this.addGuardform.patchValue({
      fname:this.editGuard.fname,
      userName: this.editGuard.userName,
      email: this.editGuard.email,
      phoneNumber: this.editGuard.phoneNumber,
      ActiveLocation: this.editGuard.ActiveLocation,
    });
  }

  addGuard() {   
    // console.log(this.addGuardform.value) 
    if (this.addGuardform.valid) {
      if (this.editGuard) {
        this.guardObj = this.addGuardform.value;
        this.guardObj.companyId = this.editGuard.companyId;
        this._gservice.Guard_Data_Updated(this.guardObj).subscribe((res) => {
          if(res){
            this._snackBar.open('Guard is updated', 'ok', { duration: 5000 });
            this.dialogRef.close('saved');
          }
        });
      }
      else {
        this.guardObj = this.addGuardform.value;
        this.guardObj.companyId = localStorage.getItem('companyId');
        this._gservice.createGuard(this.guardObj).subscribe((res) => {
          if (res['message'] == "relogin") {
            this._snackBar.open('Session expired . Please relogin', 'ok', { duration: 5000 });
          }
          if (res['message'] == 'saved') {
            this._snackBar.open('Guard is saved', 'ok', { duration: 3000 });
            this.dialogRef.close('saved');
          }
        });
      }
    }
    else {
      this._snackBar.open('Please fill all fields', 'ok', { duration: 3000 });
    }
  }
  letterOnly(event:any){
    return /^[a-zA-Z ]+$/i.test(event.key)
  }
}




