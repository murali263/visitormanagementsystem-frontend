import { AfterViewInit, Component, OnInit, ViewChild } from "@angular/core";
import { Router } from "@angular/router";
import { GlobalService } from "../services/global.service";
import {MatSort,Sort} from "@angular/material/sort";
//import {LiveAnnouncer} from "@angular/cdk/a11y";
import {sezlist} from '../model/sezlist'
import {
  MatDialog,

  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AddsezComponent } from "../addsez/addsez.component";
import { DeletedialogComponent } from "../deletedialog/deletedialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { PageEvent } from "@angular/material/paginator";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { GenericService } from "../services/generic.service";
import { DashboardService } from "../dashboard.service";
// import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: "app-superadmin",
  templateUrl: "./superadmin.component.html",
  styleUrls: ["./superadmin.component.scss"],
})
export class SuperadminComponent implements OnInit  {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: MatTableDataSource<any>;
  sezArray: any;
  adminArray: any;
  adminExsit: boolean;
  SezCount: number;
  length: number;
  pageIndex: number;
  pageSize: number;
  pageSizeOptions: number[] = [5, 10, 20];
  pageEvent: PageEvent;
  page: number = 1;
  limit: number = 1000;
  skip: number = 1;
  eventValue: boolean;
  searchedText: any = "";
  noData: boolean = false;
  count: any;
  tableData: any = [];
  // totalCount

  constructor(
    private router: Router,
    private _gservice: GlobalService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar,
    private dataservice: GenericService,
    private _dashboard:DashboardService
  //  private _liveannounce:LiveAnnouncer
  ) {}
 
  ngOnInit() {
    this.getAdminAndSezList();
 
  }
 


   onChartClick(event) {
    console.log(event);
  }





  

  displayedColumns: string[] = [
    "sezName",
    "location",
    "admin",
    "email",
    "phonenumber",
    "account_Status",
    "actions",
  ];

  //get admins and sez's in SEZ Array
  getAdminAndSezList() {
    if (this.eventValue) {
      this.skip = parseInt(localStorage.getItem("skip"));
      this.limit = parseInt(localStorage.getItem("limit"));
    }

    //To Delete Searchkeywords stored in service
    delete this.dataservice.searchkeyword;
    //admin and sez serivices

    this._gservice.fetchSez(this.page, this.limit).subscribe((sezs) => {
      this.tableData = sezs.res.results
    // console.log('table',this.tableData)
      if(sezs['message']=="relogin"){
        this._snackBar.open('Session expired . Please relogin','ok',{duration:5000});
       }
      else{
              //  this.limit=sezs.totalCount.length
      this.count = sezs["totalCount"].length;
      // console.log("sez", this.count);
      this._gservice
        .fetchAdminsForSezList(sezs?.res?.results)
        .subscribe((admins) => {
          this.sezArray = sezs.res.results;
          //console.log('one',this.sezArray)
          // console.log("admins", admins?.res);
          // console.log("admins", admins?.res.reverse());

          this.adminArray = admins?.res;
          // this.sezArray = sezs.res.results.reverse();
          // console.log('two',this.sezArray);
          // console.log(this.sezArray.length);
          // console.log(this.adminArray == true);

          if (this.adminArray.length) {
            // console.log("admin true");
            for (let sez of this.sezArray) {
              for (let admin of this.adminArray) {
                if (admin.scode == sez.scode) {
                  for (let adminkeys in admin) {
                    if (adminkeys == "sname" || adminkeys == "sezlocation") {
                    } else {
                      sez[adminkeys] = admin[adminkeys];
                    }
                  }
                }
              }
            }
          }
    

      this.dataSource = sezs;
          this.dataSource = new MatTableDataSource(this.sezArray);
         this.dataSource.sort = this.sort
          this.dataSource.paginator = this.paginator;
        });
      // console.log("admins", this.adminArray);
      }

    });
  }

  updateaccStatus(event, data) {
    this._gservice.updateaccSts(data).subscribe((res) => {});
  }




  //add function


  addDialog(data) {
    // console.log("data", data);
    let dialogRef = this.dialog.open(AddsezComponent, {
      width: "400px",
      data: data,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "success") {
        this.ngOnInit();
      } else {

      }
    });
  }






  //update function 



  updateDailog(updateObj) {
    // console.log("update obj", updateObj.obj);
    let dialogRef = this.dialog.open(AddsezComponent, {
      width: "400px",
      data: updateObj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result == "success") {
        this.ngOnInit();
      }
    });
  }







  // delete function

  deleteDailog(deleteObj) {
    // console.log(deleteObj.obj);
    let dialogRef = this.dialog.open(DeletedialogComponent, {
      data: deleteObj.obj,
    });
    dialogRef.afterClosed().subscribe((result) => {
      // console.log("result", result);
      if (result == true) {
        // console.log("deletesucess");
        if (deleteObj.obj.username) {
          //archie
          this._gservice.archiveUser(deleteObj.obj).subscribe((data) => {
            if (data["res"] == "deleted") {
              //del
              this._gservice
                .deleteUser(deleteObj.obj.username)
                .subscribe((data) => {
                  if (data.message == "success") {
                    this._snackBar.open("Deleted Successfully..!!", "ok", {
                      duration: 2000,
                    });
                    this.ngOnInit();
                  } else if (data.res == !"success") {
                    this._snackBar.open("Delete Failed", "ok", {
                      duration: 2000,
                    });
                  }
                });
            }
          });
        } else {
          this._gservice.archiveSez(deleteObj.obj).subscribe((data) => {
            if (data["res"] == "archived") {
              this._gservice.deleteSez(deleteObj.obj.scode).subscribe(
                (data) => {
                  this._snackBar.open("Deleted sez Successfully..!!", "ok", {
                    duration: 2000,
                  });
                  this.ngOnInit();
                },
                (err) => {
                  // console.log("error");
                }
              );
            }
          });
        }
      }
    });
  }

  getPageLimit(event) {
    this.eventValue = true;
    // setTimeout(() => {
      // console.log(event);
    // }, 2000);
    if (event.pageSize > event.length) {
      this.length = event.pageSize;
      localStorage.setItem("skip", this.skip.toString());
      localStorage.setItem("limit", this.length.toString());
      this.getAdminAndSezList();
    }
    if (event.pageIndex > 0) {
      let pageCount = event.pageIndex * event.pageSize + event.pageSize;
      if (event.length < pageCount) {
        this.length = pageCount;
        // console.log("length", this.length);
        localStorage.setItem("skip", this.skip.toString());
        localStorage.setItem("limit", this.length.toString());
        this.getAdminAndSezList();
      }
    }
  }





  // announceSortChange(sortState:Sort){
  //   if(sortState.direction){
  //     this._liveannounce.announce(`Sorted ${sortState.direction}ending`)
  //   }
  //   else{
  //     this._liveannounce.announce(`Sorting cleared`)
  //   }
  // }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  // applyFilter(event) {
  //   console.log(event.target.value);
  //   this.dataservice.searchkeyword = event.target.value;
  //   if (event.target.value) {
  //     this._gservice.fetchSez().subscribe((sezs) => {

  //     this._gservice.fetchUsers().subscribe((admins) => {
  //       this.adminArray = admins?.res;

  //         // console.log("search results", sezs.res);
  //         this.sezArray = sezs?.res;

  //         if (this.adminArray.length) {
  //           // console.log("admin true");
  //           for (let sez of this.sezArray) {
  //             for (let admin of this.adminArray) {
  //               if (admin.scode == sez.scode) {
  //                 for (let adminkeys in admin) {
  //                   sez[adminkeys] = admin[adminkeys];
  //                 }
  //               }
  //             }
  //           }
  //         }
  //         this.dataSource = new MatTableDataSource(this.sezArray);
  //       });
  //     });
  //   } else {
  //     this.noData = true;
  //     this.getAdminAndSezList();
  //   }
  // }
  sortData(sort: Sort) {
    const data = this.sezArray.slice();
    if (!sort.active || sort.direction === '') {
      this.sortData = data;
      return;
    }


    this.sortData = data.sort((a, b) => {
      const isAsc = sort.direction === 'asc';
      switch (sort.active) {
        case 'sname':
          return this.compare(a.sname, b.sname, isAsc);
        default:
          return 0;
      }
    });
  }


 compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
  clear() {
    this.searchedText = "";
  }
}
