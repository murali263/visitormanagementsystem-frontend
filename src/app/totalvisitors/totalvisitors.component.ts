import { Component, OnInit, ViewChild } from "@angular/core";
import { VistorformComponent } from "../vistorform/vistorform.component";
import { MatDialog } from "@angular/material/dialog";
import { GlobalService } from "../services/global.service";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
@Component({
  selector: "app-totalvisitors",
  templateUrl: "./totalvisitors.component.html",
  styleUrls: ["./totalvisitors.component.scss"],
})
export class TotalvisitorsComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  displayedColumns: string[] = [
    "visitorname",
    "contactnumber",
    "visitdate",
    "visittime",
    "intime",
    "outtime",
  ];
  public start: Date = new Date("");
  public end: Date = new Date("");
  start_date: any;
  end_date: any;
  totalvisitorList: MatTableDataSource<any>;
  constructor(public dialog: MatDialog, public global: GlobalService) {}

  ngOnInit(): void {
    this.getVisitorsList();
  }

  getVisitorsList() {
    let companyId = localStorage.getItem("companyId");
    let Action = "All";
    this.global.getVistor(companyId, Action).subscribe(
      (res: any) => {
        this.totalvisitorList = res;
        this.totalvisitorList = new MatTableDataSource(res);
        this.totalvisitorList.paginator = this.paginator;
        this.totalvisitorList.sort = this.sort;
      },
      (err) => {
        console.log(err);
      }
    );
  }

  getVistorFilter(data: any) {
    let payload: any = {
      startDate: this.convert(data?.startDate),
      endDate: this.convert(data?.endDate),
      companyId: localStorage.getItem("companyId"),
    };
    this.global.getVisitorFilterData(payload).subscribe((res: any) => {
      console.log(res);
      this.totalvisitorList = new MatTableDataSource(res);
    });
  }
  convert(str) {
    var date = new Date(str),
      mnth = ("0" + (date.getMonth() + 1)).slice(-2),
      day = ("0" + date.getDate()).slice(-2);
    return [date.getFullYear(), mnth, day].join("-");
  }
  searchText(event) {}
}
