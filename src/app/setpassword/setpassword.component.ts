import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GenericService } from '../services/generic.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-setpassword',
  templateUrl: './setpassword.component.html',
  styleUrls: ['./setpassword.component.scss']
})
export class SetpasswordComponent implements OnInit {

  passwordresetForm:FormGroup;
  userData;
  constructor(
    private _fb:FormBuilder,
    private dataservice:GenericService,
    private _gservice:GlobalService,
    private _snackBar: MatSnackBar,
    private router : Router
  ) {
   }

  ngOnInit(): void {
    this.userData = this.dataservice.dataforchgpwd
    //  console.log(this.userData);
     
    this.initailizeForm()

  }
  initailizeForm(){
    this.passwordresetForm = this._fb.group({
      password:['',Validators.required],
      cpassword:['',Validators.required],
      username:[this.userData['username'],Validators.required],
      email:[this.userData['email'],Validators.required]
    });
  }

  reset_password(){
    // console.log(this.passwordresetForm.value);

    if(this.passwordresetForm.valid){
      if(this.passwordresetForm.value['password'] == this.passwordresetForm.value['cpassword']){
        this._gservice.reset_password(this.passwordresetForm.value).subscribe((res)=>{
          if(res['message'] == 'reseted'){
            this._snackBar.open('password reseted successfully','ok',{ duration: 3000 });
             this.router.navigate(['/login'])
          }
          
        })
      }
      else if(this.passwordresetForm.value['password'] != this.passwordresetForm.value['cpassword']){
        this._snackBar.open('password and confrim password must be same','ok',{duration:3000});
      }
    }
    if(!this.passwordresetForm.valid){
      this._snackBar.open('Please fill all fields','ok',{duration:3000});
    }

  


  }
}
