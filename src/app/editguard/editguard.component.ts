import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { GlobalService } from '../services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ProfilepageService } from '../profilepage.service';


@Component({
  selector: 'app-editguard',
  templateUrl: './editguard.component.html',
  styleUrls: ['./editguard.component.scss']
})
export class EditguardComponent implements OnInit {
  selectedStateDistricts:any=[];
  states:any= [];
  dataone;
  updgrdForm: FormGroup;
  aadharno: any;
  updateeddata = [];
  constructor(private _fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) public data,
    public dialogRef: MatDialogRef<EditguardComponent>,
    private _gservice: GlobalService,
    private profile : ProfilepageService,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.initailizeForm()
    this.profile.fetchcitysstates().subscribe((res:any)=>{
     console.log(res)
       this.states = res ,err=>{
         console.log(err)
       }
     })
  }
  initailizeForm() {
    this.updgrdForm = this._fb.group({
      fname: [this.data.fname, Validators.required],
      lname: [this.data.lname, Validators.required],
      username: [this.data.username, Validators.required],
      phone: [this.data.phonenumber, Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern("[0-9 ]{12}")])],
      email: [this.data.email, Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      password: [this.data.password, Validators.required],
      aadharno: [this.data.aadharno, Validators.compose([Validators.required,])],
     //aadharno: [this.data.aadharno, Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(10)])],
     role: [this.data.role, Validators.required],
      isActive: [this.data.isActive, Validators.required],
      address: this._fb.group({
        doorno: [this.data.address['doorno'], Validators.required],
        street: [this.data.address['street'], Validators.required],
        city: [this.data.address['city'], Validators.required],
        state: [this.data.address['state'], Validators.required],
        zip: [this.data.address['zip'], Validators.compose([Validators.required, Validators.minLength(6),Validators.maxLength(6),Validators.pattern('[1-9]{1}[0-9]{5}')])],

      })

    });
  }


  // mychange(val){
  //   const self = this;
  //   let aadhar = val.split('-').join('')
  //   if(aadhar.length>0){
  //     aadhar = aadhar.match(new RegExp('.{1,4}','g')).join('-');
  //   }
  //   console.log('this is aadhar number' + aadhar)
  //   this.aadharno == aadhar

  // }





  
  changeState(data){
    console.log('e')
    this.selectedStateDistricts = this.states[data].districts
  }
  caps(value) {

    let arr = value.target.value.charAt(0).toUpperCase().concat(value.target.value.slice(1, value.target.value.length));
    // console.log(arr);

    // console.log(value.target.id);
    // console.log(value.target.value);
    document.getElementById(value.target.id)['value'] = arr;
  }
  // addgrd(){
  //   console.log(this.updgrdForm.value);

  //   if(this.updgrdForm.valid){
  //     this._gservice.updateagrd(this.updgrdForm.value).subscribe((res:any)=>{
  //       console.log(res)
  //       if(res.updated == true){
  //         this.dialogRef.close('updated')
  //         this._snackBar.open('Updated successfully', 'ok', { duration: 2000 });
  //       }
  //     },err=>console.log(err))
  //   }
  // }
  addgrd(){
    
    this._gservice.updateagrd(this.updgrdForm.value).subscribe((res:any)=>{
      this.updateeddata = res
      this._snackBar.open('Updated successfully', 'ok', { duration: 2000 })
      this.dialogRef.close('updateeddata')
    },err=>{
      console.log(err)
    })
  }







  // addgrd() {
  //    console.log(this.updgrdForm.value);
  //   if (this.updgrdForm.valid) {
  //     this._gservice.updateagrd(this.updgrdForm.value).subscribe((res) => {
  //        console.log(res);
  //       if (res.updated == true) {
  //         this.dialogRef.close('updated')
  //         this._snackBar.open('Updated successfully', 'ok', { duration: 2000 });
  //       }

  //     })
  //   }


  // }

}
