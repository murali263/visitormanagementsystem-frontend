import { Component, OnInit,ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar,MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition, } from '@angular/material/snack-bar';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { EditguardComponent } from '../editguard/editguard.component';
import { GenericService } from '../services/generic.service';
import { GlobalService } from '../services/global.service';
import { MatTableDataSource } from '@angular/material/table';
import { ProfilepageService } from '../profilepage.service';
import {MatSort, Sort} from '@angular/material/sort';
import { MatPaginator, PageEvent } from '@angular/material/paginator';
//import { UidaivalidationService } from  '../services/uidaivalidation.service';
import {Validator} from 'format-utils'
@Component({
  selector: 'app-addadmin',
  templateUrl: './addadmin.component.html',
  styleUrls: ['./addadmin.component.scss']
})
export class AddadminComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator; 
  @ViewChild(MatSort) sort:MatSort;
  horizontalPosition: MatSnackBarHorizontalPosition = 'right';
  verticalPosition: MatSnackBarVerticalPosition = 'top';
  durationInSeconds = 5;
  hide = true;
 
  addadminForm: FormGroup;
  displayedColumns: string[] = ['First name', 'Username', 'Phone number', 'account_Status', 'actions'];
  dataSource;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;
  page: number = 1;
  limit: number = 5;
  eventValue: boolean;
  count: number;
  currentpage
  previouspage
  nextlimit
  prelimit
  nextpage
  prepage
  data
  searchedText: number;
  pagesize;
  subadmin:any = [];
  states:any = [];
  selectedStateDistricts:any=[];
  selectedTab: number;

  constructor(private _fb: FormBuilder,
    private _gservice: GlobalService,
    private dataservive: GenericService,
    public profile :ProfilepageService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dataservice: GenericService,
   // private uidaiValidate:UidaivalidationService
     ) { }

  ngOnInit(): void {
    this.initailizeForm()
    
    
    
  
    this.getsubadmins()
    //this.addadmin()
   // this.getsubdata()
   
   

   
    this.profile.fetchcitysstates().subscribe(data=>{
      this.states = data,err=>{
        console.log(err)
      }
    })
  }

  initailizeForm() {
    this.addadminForm = this._fb.group({
      fname: ['', Validators.required],
      lname: ['', Validators.required],
      username: ['', Validators.required],
      phonenumber: ['', Validators.compose([Validators.required, Validators.minLength(10),Validators.maxLength(10),Validators.pattern('[1-9]{1}[0-9]{9}')])],
    
      password: ['', Validators.required],
     // aadharno: ['', Validators.compose([Validators.required, Validators.minLength(12), Validators.maxLength(12), Validators.pattern('[1-9]{1}[0-9]{11}')])],
      // aadharno: ['', Validators.compose([Validators.required,])],
       aadharno: ['', Validators.compose([Validators.required])],
      role: ['subadmin', Validators.required],
      email: ['', Validators.compose([Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])],
      address: this._fb.group({
        doorno: ['', Validators.required],
        street: ['', Validators.required],
        city: ['', Validators.required],
        state: ['', Validators.required],
        zip: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(6), Validators.pattern('[1-9]{1}[0-9]{5}')])],

      })

    });
  }
//   addadmin(){
// //     console.log('hello')
// // console.log(this.addadminForm.value)
// if(this.addadminForm.valid){
//   this._gservice.creategruad(this.addadminForm.value).subscribe(res=>{
//     this.subadmin = res
// console.log(res);
// this._snackBar.open('New admin data added successfully','ok',{
// horizontalPosition: this.horizontalPosition,
// verticalPosition: this.verticalPosition,
// duration: this.durationInSeconds * 1000,
// });
// this.addadminForm.reset()
//   })
// }
//   }

  
  changeState(data){
   // console.log('e')
    //const filterValue = value.toLowerCase();
    this.selectedStateDistricts = this.states[data].districts.sort()
    //return this.selectedStateDistricts.filter(selectedStateDistricts => selectedStateDistricts.toLowerCase().includes(filterValue));
  }



  changeTab() {
    this.selectedTab =0;
  }
  addadmin() {
     console.log(this.addadminForm);
    // console.log(this.addgrdForm.controls['address']['controls']);


    if (this.addadminForm.valid) {
      console.log(this.addadminForm.value);
      this.addadminForm.value.scode = this.dataservive.scode
      this._gservice.creategruad(this.addadminForm.value).subscribe((data) => {
         console.log(data);
        if(data['message']=="relogin"){
          this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
       }
     else{
      this.getsubadmins();
      this._snackBar.open('Successfully Added ','ok',{duration:2000})
      //this._snackBar.open(data.message, 'ok', { duration: 2000 });
     // formDirective.resetForm();
      this.addadminForm.patchValue({ role: "subadmin" })
      this.changeTab()
    this.addadminForm.reset()
     }

      }
        , (err) => {
          console.log(err);
          let key = Object.keys(err.error.keyPattern);
          this._snackBar.open(`${key[0]} already exists`, 'ok', { duration: 2000 });
          // formDirective.resetForm();
          this.addadminForm.patchValue({ role: "subadmin" })
          // this.addadminForm.reset();
        }
      )

       console.log(this.addadminForm.value)
    }
    else {
      // console.log("invalid");
      this._snackBar.open('Please fill the all fields', 'ok', { duration: 2000 });
    }
  }
  showtable: boolean



getsubdata(){
  this._gservice.fetchsub().subscribe(res =>{
    console.log('get',res),err =>console.log(err)
  })
}


getsubadmins() {
  // console.log("qwertyuioiuytre");

  this._gservice.fetchsubadmin(this.page,this.limit).subscribe((data:any) => {
console.log('data working'+data);

    if(data['message']=="relogin"){
      this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
   }
 else{
  this.data = data?.res?.results;
   // console.log(this.data)
    this.count = data?.count;
    // this.nextpage=data?.res?.next?.page
    // this.nextlimit=data?.res?.next?.limit
    // this.prepage=data?.res?.previous?.page
    // this.prelimit=data?.res?.previous?.limit
    // console.log(this.count);
    // this.dataSource = new MatTableDataSource(this.data);
    // this.dataSource.sort = this.sort
    
     this.dataSource.paginator=this.paginator;
 }

  },err=>{
    console.log(err)
  })
}
  deletegraud(userdata) {
    // console.log(userdata);
    const dialogRef = this.dialog.open(DeletedialogComponent, { width: '400px' });
    dialogRef.afterClosed().subscribe(data => {
      // console.log(data);
      if (data == true) {

        this._gservice.deleteGuards(userdata.username).subscribe((res) => {
          // console.log(res);
          if (res.delete == true) {
            this.getsubadmins()
            this._snackBar.open('Deleted successfully', 'ok', { duration: 3000 });
          }
        });

      }
    })
  }
  

  updateaccStatus(event, data) {
    // console.log(event);
    // console.log(data);
    this._gservice.updateaccSts(data).subscribe((res) => {
      // console.log(res);
      if (res.updated == true) {
        // this.getsubadmins()
        this._snackBar.open('Updated successfully', 'ok', { duration: 3000 });
      }

    })

  }

  editguard(element) {
    // console.log(element)
    const dialogRef = this.dialog.open(EditguardComponent, { panelClass: 'editdialog', data: element });
    dialogRef.afterClosed().subscribe(data => {
      if (data == 'updated') {
        this.getsubadmins()
      }
    })
  }

  applyFilter(event) {
    // console.log(event.target.value);
    this.dataservice.searchkeyword = event.target.value
    if (event.target.value) {
      this._gservice.fetchsubadmin().subscribe((admins) => {
        // console.log(admins);

        this.data = admins?.res
        this.dataSource = new MatTableDataSource(this.data);


        //   this._gservice.fetchSez().subscribe((sezs) => {
        //     console.log("search results",sezs.res)
        //     this.sezArray=sezs?.res

        //     if (this.adminArray.length) {
        //       console.log("admin true")
        //       for (let sez of this.sezArray) {
        //         for (let admin of this.adminArray) {
        //           if (admin.scode == sez.scode) {
        //             for (let adminkeys in admin) {
        //               sez[adminkeys] = admin[adminkeys]
        //             }
        //           }
        //         }
        //       }
        //     }
        // this.dataSource = new MatTableDataSource(this.sezArray);

        //   }) 
      })
    }
    else {
      // this.getAdminAndSezList()
      this.getsubadmins()
    }
  }

  clear() {
    // this.searchedText=""
  }

  getPageLimit(event?: any) {
    this.page = event?.pageIndex + 1;
    this.limit = event?.pageSize
    // console.log(this.page,this.limit);

    // console.log(this.length)
    this.eventValue = true;

    // console.log(event);
    this.currentpage = event?.pageIndex
    this.previouspage = event?.previousPageIndex
    this.pagesize = event?.pageSize

    if (this.currentpage > this.previouspage) {
      if (event?.pageSize >= this.count) {
        // console.log(event.pageSize, this.count);
        if (event.pageIndex == 0) {
          this.prepage = event.pageIndex + 1
          this.nextpage = event.pageIndex + 1
        }

        this.nextlimit = this.count;
        this.prelimit = this.count;
        // console.log(this.nextlimit,this.prelimit,"qwertrewqwert");


      }
      if (event?.pageSize < this.count) {
        // console.log(event.pageSize, this.count);
        if (event.pageIndex == 0) {
          this.prepage = event.pageIndex + 1
          this.nextpage = event.pageIndex + 1
        }
        this.nextlimit = event.pageSize;
        this.prelimit = event.pageSize;
        // console.log(this.nextlimit, this.prelimit, "qwertrewqwert");


      }
      this.page = this.nextpage;
      this.limit = this.nextlimit;

      let sezArray = []
      this.dataSource = new MatTableDataSource(sezArray);
      this.getsubadmins()
      // console.log("next")
      

    }
    if (this.currentpage < this.previouspage) {
      if (event?.pageSize >= this.count) {
        // console.log(event.pageSize, this.count);
        if (event.pageIndex == 0) {
          this.prepage = event.pageIndex + 1
          this.nextpage = event.pageIndex + 1
        }
        this.nextlimit = this.count;
        this.prelimit = this.count;
        // console.log(this.nextlimit, this.prelimit, "qwertrewqwert");


      }
      if (event?.pageSize < this.count) {
        // console.log(event.pageSize, this.count);
        if (event.pageIndex == 0) {
          this.prepage = event.pageIndex + 1
          this.nextpage = event.pageIndex + 1
        }
        else {
          this.prepage = event.pageIndex + 1
          // this.nextpage=event.pageIndex+1
        }
        this.nextlimit = event.pageSize;
        this.prelimit = event.pageSize;
        // console.log(this.nextlimit, this.prelimit, "qwertrewqwert");

      }
      this.page = this.prepage;
      this.limit = this.prelimit;
      let sezArray = []
      this.dataSource = new MatTableDataSource(sezArray);

      // console.log("previous")
      this.getsubadmins()


    }
    if (this.currentpage == this.previouspage) {
      // console.log(this.prelimit, "page size");
      if (event?.pageSize >= this.count) {
        // console.log(event.pageSize,this.count);
        // console.log(event.pageIndex, "page no.");

        this.nextlimit = this.count;
        this.prelimit = this.count;
        // console.log(this.nextlimit, this.prelimit, "qwertrewqwert");


      }
      if (event?.pageSize < this.count) {
        // console.log(event.pageSize,this.count);
        // console.log(event.pageIndex, "page no.");
        if (event.pageIndex == 0) {
          this.prepage = event?.pageIndex + 1
        }
        else {
          this.prepage = event?.pageIndex + 1
        }

        this.nextlimit = event?.pageSize;
        this.prelimit = event?.pageSize;
        // console.log(this.nextlimit, this.prelimit, "qwertrewqwert");


      }
      if (this.prelimit == undefined) {
        this.prelimit = event?.pageSize;

      }

      // console.log(this.prepage, "page no");
      // console.log(this.prelimit, "page size");
      this.page = this.prepage;
      this.limit = this.prelimit;
      let sezArray = []
      this.dataSource = new MatTableDataSource(sezArray);

      // console.log("previous")
      this.getsubadmins()

    }



    this.eventValue = true;

  }



  //to make the first letter caps
  caps(value) {

    let arr = value.target.value.charAt(0).toUpperCase().concat(value.target.value.slice(1, value.target.value.length));
    // console.log(arr);

    // console.log(value.target.id);
    // console.log(value.target.value);
    document.getElementById(value.target.id)['value'] = arr;
  }











  sortData(sort: Sort) {
    const dataon = this.data.slice();
    if (!sort.active || sort.direction === '') {
      this.data = dataon
      return;
    }

    this.data = dataon.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'fname':
          return compare(a.fname, b.fname, isAsc);
          case 'lname':
            return compare(a.lname, b.lname, isAsc);
       
        default:
          return 0;
      }
    });
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}












