import { Component, OnInit } from "@angular/core";
import { VistorformComponent } from "../vistorform/vistorform.component";
import { MatDialog } from "@angular/material/dialog";
import { GlobalService } from "../services/global.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatSnackBar } from "@angular/material/snack-bar";
import { CheckinComponent } from "../checkin/checkin.component";

@Component({
  selector: "app-visitordetails",
  templateUrl: "./visitordetails.component.html",
  styleUrls: ["./visitordetails.component.scss"],
})
export class VisitordetailsComponent implements OnInit {
  displayedColumns: string[] = [
    "visitorname",
    "contactnumber",
    "visitdate",
    "visittime",
    "reference",
    "checkinout",
  ];

  searchedText: String = "";
  datasource: MatTableDataSource<any>;
  totalvisitorList: MatTableDataSource<any>;
  paginator: any;
  sort: any;
  value: any = [];
  searchfield: any = [];

  constructor(
    private dialog: MatDialog,
    public global: GlobalService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.getVisitors();
  }

  addVisitor() {
    const dialogref = this.dialog.open(VistorformComponent, {
      width: "1000px",
      panelClass: "deletedialog",
    });
    dialogref.afterClosed().subscribe((data) => {
      if (data == "saved") {
        this.ngOnInit();
      }
    });
  }

  getVisitors() {
    let visitDate: any = new Date().toLocaleDateString();
    let companyId = localStorage.getItem("companyId");
    this.global.getVisitorListData(companyId, visitDate).subscribe(
      (data: any) => {
        this.datasource = data;
        this.datasource = new MatTableDataSource(data);
        this.datasource.sort = this.sort;
        this.datasource.paginator = this.paginator;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  //-------------------------------------check in -------------------------------//

  checkinupdate(data: any) {
    data.status = "checkIn";
    const dialogRef = this.dialog.open(CheckinComponent, {
      width: "600px",
      data: data,
    });
    dialogRef.afterClosed().subscribe((res) => {
      if (res == "updated") {
        this._snackBar.open("Successfully Updated", "ok", { duration: 3000 });
        this.getVisitors();
      }
    });
  }
  //---------------------------------------check out -----------------------------------//
  checkoutupdate(updatedata: any) {
    updatedata.status = "checkOut";
    console.log("checkOut", updatedata);

    const dialogRef = this.dialog.open(CheckinComponent, {
      width: "600px",
      data: updatedata,
    });
    dialogRef.afterClosed().subscribe((res: any) => {
      if (res == "updated") {
        this.getVisitors();
      }
      (err: any) => {
        console.log(err);
      };
    });
  }

  searchText(name: any) {
    this.searchfield = name;
    let inputData = {
      searchkeyword: this.searchfield,
    };
    console.log("search", this.searchfield);
    this.global.getSearchfilter(inputData).subscribe((res) => {
      console.log(res);
      const filterValue = name;
      this.datasource.filter = filterValue.trim().toLowerCase();
    });
  }
}
