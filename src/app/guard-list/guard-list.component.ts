import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { GenericService } from '../services/generic.service';
import { MatDialog } from '@angular/material/dialog';
import { GlobalService } from '../services/global.service';
import { DeletedialogComponent } from '../deletedialog/deletedialog.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort'
import { DashboardService } from '../dashboard.service';
import { AdminComponent } from '../admin/admin.component';

@Component({
  selector: "app-guard-list",
  templateUrl: "./guard-list.component.html",
  styleUrls: ["./guard-list.component.scss"],
})
export class GuardListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  addCompanyform: FormGroup;
  companyvisitordata;
  data;
  searchedText: String = '';
  gaurdArr: any=[];
  isVisible:boolean = false;
  displayedColumns: string[] = [
    "Location/WorkArea",
    "FullName",
    "Phone Number",
    "Email",
    "actions",
  ];

  constructor(
    private _fb: FormBuilder,
    private dataservice: GenericService,
    private _gservice: GlobalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getGuarddata();
  }

  initailizeForm() {
    this.addCompanyform = this._fb.group({
      companyname: ["", Validators.required],
      scode: [this.dataservice.scode],
    });
  }

  addGuard() {
    const dialogref = this.dialog.open(AdminComponent, {
      width: "800px",
      panelClass: "deletedialog",
    });
    dialogref.afterClosed().subscribe((data) => {
      if (data == "saved") {
        this.ngOnInit();
      }
    });
  }
  getGuarddata() {
    let companyId = localStorage.getItem("companyId");
    this._gservice.getGuard(companyId).subscribe((data: any) => {
      this.gaurdArr = data;
      if(this.gaurdArr.length === 0){
        this.isVisible = true;
      }else{
        this.isVisible = false;
      }
      this.gaurdArr = new MatTableDataSource(data);
      this.gaurdArr.sort = this.sort;
      this.gaurdArr.paginator = this.paginator;
    });
  }

  // delte companies

  deleteGuard(obj) {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == true) {
        this._gservice.deleteGuard(obj).subscribe((res) => {
          if (res["delete"] == true) {
            this.getGuarddata();
            this._snackBar.open("Deleted successfully", "ok", {
              duration: 3000,
            });
          }
        });
      }
    });
  }

  updateguard(obj) {
    const dialogRef = this.dialog.open(AdminComponent, {
      width: "1000px",
      panelClass: "deletedialog",
      data: { updateGuard: obj },
    });
    dialogRef.afterClosed().subscribe((obj) => {
      if (obj == "saved") {
        this.getGuarddata();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.gaurdArr.filter = filterValue.trim().toLowerCase();
  }
}
