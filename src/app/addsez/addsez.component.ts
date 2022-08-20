import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { GlobalService } from '../services/global.service';
import { MatSnackBar } from '@angular/material/snack-bar';


@Component({
  selector: 'app-addsez',
  templateUrl: './addsez.component.html',
  styleUrls: ['./addsez.component.scss']
})
export class AddsezComponent implements OnInit {
  sezForm: FormGroup;
  hide = true;
  sez;
  sezname="";
  adminForm: FormGroup;
  updateForm: FormGroup;
  condition: boolean;
  constructor(private fb: FormBuilder, private _gservice: GlobalService, private router: Router,
    @Inject(MAT_DIALOG_DATA) public dataFromSuperAdmin, public dialogRef: MatDialogRef<AddsezComponent>,
    private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.disableAdmin()
    this.initailizeForm();
    this.addAdmin();
    // console.log(this.dataFromSuperAdmin);

    //Disabling admin fields in update form if admin nor registered
    //   if (this.dataFromSuperAdmin?.obj.username == undefined) {
    //     console.log("conistion")
    //     this.condition = true;
    //   }
    //   else {
    //     this.condition = false;
    //   }
  }


  initailizeForm() {
    if (this.dataFromSuperAdmin?.block == "addsez") {
      this.sezForm = this.fb.group({
        sname: ['', Validators.required],
        sezlocation: ['', Validators.required],
      });
    }
    // console.log("sezobj", this.dataFromSuperAdmin.sezObj)
    if (this.dataFromSuperAdmin.block == "addadmin") {
      this.adminForm = this.fb.group({
        fname: ['',Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
        lname: ['',Validators.compose([Validators.required, Validators.maxLength(50),Validators.pattern('^[a-zA-Z ]*$')])],
        email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$')])],
        username: ['', Validators.required],
        password: ['', Validators.required],
        phonenumber: ['', Validators.compose([Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('[1-9]{1}[0-9]{9}')])],
        role: ['admin',],
        //sname mandatory for serch purpose
        sname: [this.dataFromSuperAdmin?.sezObj?.sname],
        sezlocation: [this.dataFromSuperAdmin?.sezObj?.sezlocation],
        scode: [this.dataFromSuperAdmin?.sezObj?.scode]
      });
    }

    if (this.dataFromSuperAdmin.block == "update") {
      this.updateForm = this.fb.group({
        updateSez: this.fb.group({
          sname: [this.dataFromSuperAdmin.obj.sname, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
          sezlocation: [this.dataFromSuperAdmin.obj.sezlocation, Validators.compose([Validators.required,Validators.pattern('^[a-zA-Z ]*$')])],
          scode: [this.dataFromSuperAdmin.obj.scode],
          // sid:[this.dataFromSuperAdmin.obj.sid],
        }),
        updateAdmin: this.fb.group(
          {
            fname: [{ value: this.dataFromSuperAdmin.obj.fname, disabled: this.condition }, Validators.required],
            lname: [{ value: this.dataFromSuperAdmin.obj.lname, disabled: this.condition }, Validators.required],
            email: [{ value: this.dataFromSuperAdmin.obj.email, disabled: this.condition }, Validators.required,],
            username: [{ value: this.dataFromSuperAdmin.obj.username, disabled: this.condition }, Validators.required,],
            phone: [{ value: this.dataFromSuperAdmin.obj.phonenumber, disabled: this.condition }, Validators.required,],
            sname: [],
            sezlocation: [],
          })
      })

    }

  }
  
  // addSez() {

  //   if (this.sezForm.valid) {
  //     // console.log("valid");
  //     this._gservice.creating(this.sezForm.value).subscribe((data) => {
  //       //console.log(data);
  //        if (data.res = "success") {
  //         this.dialogRef.close("success");
  //         this._snackBar.open('SEZ Added success..!!', 'ok', { duration: 2000 });
  //       } 
  //       else {
  //         this.dialogRef.close("fail");
  //         this._snackBar.open('SEZ Added fail..!!', 'ok', { duration: 2000 });
  //       } 
  //     },
  //     (err) => {
  //       this.dialogRef.close("fail");
  //       this._snackBar.open('SEZ Name Already Exists..!!', 'ok', { duration: 2000 });
  //       console.log('Sez not inserted ',err.error)
  //     }
  //     )
  //   }
  
  // }

  addSez() {

    if (this.sezForm.valid) {
      // console.log("valid");
      this._gservice.createSez(this.sezForm.value).subscribe((data) => {
        if (data.res = "success") {
          this.dialogRef.close("success");
          this._snackBar.open('SEZ Added Successfully..!!', 'ok', { duration: 2000 });

        }
        else {
          // console.log("failed");
          if(data['message']=="relogin"){
            this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
           }
          else{
          this._snackBar.open('Add SEZ Failed', 'ok', { duration: 2000 });
          }
        }
      })
    }
    else {
      // console.log("snackbar");
      this._snackBar.open('Please fill all the fields..!!', 'ok', { duration: 2000 });


    }
  }

addAdmin(){
//console.log(this.adminForm.getRawValue())
this._gservice.createUser(this.adminForm.value).subscribe((data)=>{
  console.log("admin resp" , data)
  if(data = "success"){
    this.dialogRef.close("success");
    this._snackBar.open('Admin Added Successfully..!!', 'ok', { duration: 2000 });
  }
  else if(data != "fail"){
    this.dialogRef.close("fail");
            this._snackBar.open(' Failed to Add Admin', 'ok', { duration: 2000 });
            }
 
  
},err => {
  console.log(err)
        this.dialogRef.close("fail");
        this._snackBar.open('SEZ Name Already Exists..!!', 'ok', { duration: 2000 });
        console.log('Sez not inserted ',err)
      })
}



  // addAdmin() {
  //   // console.log(this.adminForm.getRawValue())
  //   if (this.adminForm.valid) {
  //     // console.log("admin", this.adminForm)
  //     // this.adminForm.value.name=this.adminForm.value.fname+this.adminForm.value.lname
  //     this._gservice.createUser(this.adminForm.value).subscribe((data) => {
  //       // console.log("admin resp", data)
  //       if (data.res == "success") {
  //         this.dialogRef.close("success");
  //         this._snackBar.open('Admin Added Successfully..!!', 'ok', { duration: 2000 });
  //       }
  //       else {
  //         if(data['message']=="relogin"){
  //           this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
  //          }
  //         else{
  //         this._snackBar.open(' Failed to Add Admin', 'ok', { duration: 2000 });
  //         }
  //       }
  //     }, (err) => {
  //       // console.log(err);
  //       let key = Object.keys(err.error.keyPattern);
  //       this._snackBar.open(`${key[0]} already exists`, 'ok', { duration: 2000 });
  //       // formDirective.resetForm();
  //       // this.addgrdForm.patchValue({ role: "guard" })
  //       // this.addgrdForm.reset();
  //     })
  //   }
  //   else {
  //     this._snackBar.open('Please fill all the fields..!!', 'ok', { duration: 2000 });

  //   }

  // }
    // var updateSezUsername ={
    //   username:this.adminForm.value.username,
    //   scode:this.dataFromSuperAdmin.scode
    // }
    //   this._gservice.updateSez(updateSezUsername).subscribe((data)=>{
    //     console.log("admin created",data)
    // })
  //}
  //navigate to superadmin dashboard
  mainpage() {
    // console.log("navigate tomain page")
    this.router.navigate(['./superadmin'])
  }


  update() {
    // console.log("updated", this.updateForm.value.updateAdmin);
    // console.log("main", this.updateForm.value);
    // console.log("main", this.updateForm);
    // console.log("boolean", this.updateForm.valid);
    // console.log("boolean", this.updateForm);

    if (this.updateForm.valid) {
      this._gservice.updateSez(this.updateForm.value.updateSez).subscribe((data) => {
        // console.log(data.updatedObj.sname)
        // console.log(data.updatedObj.sezlocation)
        //FOR updating sez details in admin obj for filtering purpose(Data filter by sez name)
        // this.updateSezInAdmin(data)
        if (data.updated == true && this.updateForm.value.updateAdmin) {

          this.updateForm['controls'].updateAdmin.patchValue({sezlocation:this.updateForm['value']['updateSez']['sezlocation']});
          this.updateForm['controls'].updateAdmin.patchValue({sname:this.updateForm['value']['updateSez']['sname']});


        // console.log(this.updateForm)

          this._gservice.updateAdmin(this.updateForm.value.updateAdmin).subscribe((data) => {
            // console.log("update admin resp", data);

            if (data.res == "success") {
              this._snackBar.open('Updated Successfully..!!', 'ok', { duration: 2000 });
              this.dialogRef.close("success");
            }
            else if (data.res = !true) {
              this._snackBar.open('Update Failed', 'ok', { duration: 2000 });
            }
          }, (err) => {
            // console.log(err);
            let key = Object.keys(err.error.keyPattern);
            this._snackBar.open(`${key[0]} already exists`, 'ok', { duration: 2000 });
            // formDirective.resetForm();
            // this.addgrdForm.patchValue({ role: "guard" })
            // this.addgrdForm.reset();
          })
        }
        else if (data.updated == true) {
          this._snackBar.open('Updated sez Successfully..!!', 'ok', { duration: 2000 });
          this.dialogRef.close("success");
        }
      }, (err) => {
        // console.log("error")
      })
    }
    else {
      this._snackBar.open('Please fill all the fields..!!', 'ok', { duration: 2000 });
    }
  }


  updateSezInAdmin(updatedSezDetails) {
    this._gservice.updateSezInAdmin(updatedSezDetails).subscribe((data) => {
    })
  }
  disableAdmin() {
    // console.log(this.dataFromSuperAdmin?.obj?.username);

    if (this.dataFromSuperAdmin?.obj?.username == undefined) {
      // console.log("diable admin condition true");

      this.condition = true;
      // console.log(this.condition)
    }
    else {
      this.condition = false

    }
  }

//making the first letter caps
caps(value){

  let arr = value.target.value.charAt(0).toUpperCase().concat(value.target.value.slice(1,value.target.value.length));
  // console.log(arr);

  // console.log(value.target.id);
  // console.log(value.target.value);
  document.getElementById(value.target.id)['value'] = arr;
}
}
