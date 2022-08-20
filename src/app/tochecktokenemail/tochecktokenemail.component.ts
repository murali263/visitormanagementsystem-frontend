import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { GenericService } from '../services/generic.service';
import { GlobalService } from '../services/global.service';

@Component({
  selector: 'app-tochecktokenemail',
  templateUrl: './tochecktokenemail.component.html',
  styleUrls: ['./tochecktokenemail.component.scss']
})
export class TochecktokenemailComponent implements OnInit {

  token;
  show_email;
  constructor(
    private activatedRoute: ActivatedRoute,
    private _snackbar:MatSnackBar,
    private _gservice: GlobalService,
    private dataService: GenericService,
    private route : Router


  ) { 
    this.activatedRoute.params.subscribe(params => {
      // console.log(params);
      
      if(params['token']){
       _gservice.verify_token(params).subscribe((data)=>{
        // console.log(data);

        if(data['res']=='existed'){

          this.dataService.dataforchgpwd = data['userdata'];
          // console.log(data['userdata']);
          
          route.navigate(['/set-new-password']);

        }
        if(data['res']=='expired'){
           _snackbar.open('link is expired','ok',{duration:3000})

          route.navigate(['/login']);

        }
        
       })
      }
      else{
      //  this.show_email=false;
      }
    //  console.log(this.token); // Print the parameter to the console. 
 });
  }

  ngOnInit(): void {
    
  }

}
