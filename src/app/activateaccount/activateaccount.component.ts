import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../services/generic.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-activateaccount',
  templateUrl: './activateaccount.component.html',
  styleUrls: ['./activateaccount.component.scss']
})
export class ActivateaccountComponent implements OnInit {
  activationtoken: any;
  constructor(
    private _router: Router,
    private activatedRoute: ActivatedRoute,
    private _gservice:GlobalService,
    private router:Router,
    private _snackbar:MatSnackBar
  ) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params => {
      
      this.activationtoken = params['token']
      // console.log(this.activationtoken);
    })
   this.accept()
     this.router.navigate(['/login'])

  }

 accept()
   {
    this._gservice.activateUserAcc({token:this.activationtoken}).subscribe(resp => {
     if(resp['res']=="activated") 
     {
      this._snackbar.open("Account Activated Succesfully", 'ok', { duration: 6000 })
     }
      // alert(resp['message'])
    })
  }

}
