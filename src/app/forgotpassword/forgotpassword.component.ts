import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../services/generic.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-forgotpassword',
  templateUrl: './forgotpassword.component.html',
  styleUrls: ['./forgotpassword.component.scss']
})
export class ForgotpasswordComponent implements OnInit {

  token;
  show_email;
  constructor(
    private fb: FormBuilder,
    private _gservice: GlobalService,
    private router: Router,
    private dataservice: GenericService,
    private _snackbar:MatSnackBar,
    private activatedRoute: ActivatedRoute
  ) { 
    this.activatedRoute.queryParams.subscribe(params => {
       this.token = params['token'];
       if(this.token!=undefined){
        this.show_email=true;
        this._snackbar.open('Reset password link is sent to your email', 'ok',{duration:1000 });
       }
       else{
        this._snackbar.open('No user on this email', 'ok',{duration:1000 })
        this.show_email=false;
       }
      // console.log(this.token); // Print the parameter to the console. 
  });
  }
  emailForm:FormGroup;

  ngOnInit(): void {
    this.initailizeForm()

  }

  initailizeForm(){

    this.emailForm = this.fb.group({
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])]
    });
  }


  submit(){
    // console.log(this.emailForm.value);
    
    this._gservice.forgot_password(this.emailForm.value).subscribe((res)=>{

      console.log(res);
      // this.router.navigate(['resetpassword'])
      if(res){
        this._snackbar.open('Reset password link is sent to your email', 'ok',{duration:1000 });
        this.router.navigate(['resetpassword'])
      
       
      }
      if(res['message']=="Invalid email"){
        this._snackbar.open('No user on this email', 'ok',{duration:1000 });
      }
      
    })
    
  }
}
