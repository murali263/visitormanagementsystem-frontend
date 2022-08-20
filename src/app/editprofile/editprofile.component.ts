import { invalid } from '@angular/compiler/src/render3/view/util';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.component.html',
  styleUrls: ['./editprofile.component.scss']
})
export class EditprofileComponent implements OnInit {
  updateForm: FormGroup;
  emailAlredyExist = "";
  usernamecheck;
  constructor(private fb: FormBuilder, @Inject(MAT_DIALOG_DATA) public dataFromEditProfile,
    private _snackBar: MatSnackBar, public dialogRef: MatDialogRef<EditprofileComponent>, private _gservice: GlobalService) { }

  ngOnInit(): void {
    // console.log(this.dataFromEditProfile);
    // console.log("dataFromEditProfile");
    console.log("------->", this.dataFromEditProfile);

    this.initailizeForm()
  }
  initailizeForm() {
    this.updateForm = this.fb.group({
      // fname:[ this.dataFromEditProfile.fname, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]$')])],
      // lname: [ this.dataFromEditProfile.lname, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]$')])],
      email: [this.dataFromEditProfile.email, [Validators.required, Validators.pattern("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")]],
      username: [this.dataFromEditProfile.username, [Validators.required]],
      phone: [this.dataFromEditProfile.phonenumber, [Validators.required, Validators.pattern("^[0-9]{10}$")]],
      uid: [this.dataFromEditProfile.uid]
    })
  }

  update() {
    if (this.updateForm.valid) {
      this._gservice.updateAdmin(this.updateForm.value).subscribe((data) => {
        console.log("update admin resp", data);

        if (data.res == "success") {
          this._snackBar.open('Updated Successfully..!!', 'ok', { duration: 2000 });
          this.dialogRef.close();
        }
        else if (data.res = !true) {
          this._snackBar.open('Update Failed', 'ok', { duration: 2000 });
        }
      }, (err) => {
        console.log(err);
        //  let key = Object.keys(err.error.keyPattern);
        //  this._snackBar.open(${key[0]} already exists, 'ok', { duration: 2000 });

      })
    }
    else {
      this._snackBar.open('Please fill all the fields..!!', 'ok', { duration: 2000 });
    }
  }

  updateprofile() {
    console.log("------>", this.updateForm);


    if (this.updateForm.valid) {
      this._gservice.updateAdmin(this.updateForm.value).subscribe((data) => {
        this._snackBar.open('profile Added success..!!', 'ok', { duration: 2000 });
        this.initailizeForm()
        this.dialogRef.close('success');
        console.log('profile updated', data)
      },
        (err) => {
          this.dialogRef.close('fail')
          this._snackBar.open('username alredy existed..!!', 'ok', { duration: 2000 });
          console.log('profile not updated ', err.error)
        }
      )
    }
  }

  // updateprofile(){

  //   if(this.updateForm.valid){
  //     console.log(this.updateForm.value);
  //     this._gservice.updateprofileinfo(this.updateForm.value).subscribe((data)=>{
  //       this.usernamecheck = data;

  //       if(this.usernamecheck.length >0){
  //         this.emailAlredyExist = "Email Alredy Exist";
  //         console.log('email alredy existed')
  //       }
  //       else{
  //         this.emailAlredyExist = "";
  //         console.log('not')
  //       }
  //       console.log(data),err=>{
  //         console.log(err)
  //       }
  //     })
  //   }

  // }

}
