import { Component, OnInit, ViewChild } from "@angular/core";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { AdminComponent } from "../admin/admin.component";
import { ManagerComponent } from "../manager/manager.component";
import { MatTableDataSource } from "@angular/material/table";
import { MatPaginator } from "@angular/material/paginator";
import { GlobalService } from "../services/global.service";
import { AddcompanyComponent } from "../addcompany/addcompany.component";
import { VistorformComponent } from "../vistorform/vistorform.component";
import { Router, RouterModule } from "@angular/router";

@Component({
  selector: "app-companyinfo",
  templateUrl: "./companyinfo.component.html",
  styleUrls: ["./companyinfo.component.scss"],
})
export class CompanyinfoComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  subcompany: MatTableDataSource<any>;
  data;
  displayedColumns: string[] = [
    "Company",
    "Admin",
    "Contact No",
    "Email Address",
    "City",
    "ZipCode",
  ];

  constructor(
    private dialog: MatDialog,
    private _gservice: GlobalService,
    public router: Router
  ) {}

  ngOnInit(): void {
    this.getsubcomp();
  }

  getsubcomp() {
    let companyId = localStorage.getItem("companyId");
    this._gservice.getsubcomp(companyId).subscribe((data: any) => {
      this.subcompany = data;
      this.subcompany = new MatTableDataSource(data);
      this.subcompany.paginator = this.paginator;
    });
  }

  addSubCompany() {
    let payload = {
      username: localStorage.getItem("username"),
      companyId: localStorage.getItem("companyId"),
    };
    console.log(payload);

    const dialogref = this.dialog.open(AddcompanyComponent, {
      width: "1000px",
      panelClass: "deletedialog",
      data: { companyData: payload, type: "subCompany" },
    });
    dialogref.afterClosed().subscribe((data) => {
      if (data == "saved") {
        this.getsubcomp();
      }
    });
  }

  addVisitor() {
    const dialogref = this.dialog.open(VistorformComponent, {
      width: "1000px",
    });
    dialogref.afterClosed().subscribe((data) => {
      if (data == "saved") {
        this.router.navigate(["/totalvisitor"]);
      }
    });
  }
}
