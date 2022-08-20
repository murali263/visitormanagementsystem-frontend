import { Component, ElementRef, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, NgModel, Validators } from "@angular/forms";
import { GenericService } from "../services/generic.service";
import { MatDialog } from "@angular/material/dialog";
import { AddcompanyComponent } from "../addcompany/addcompany.component";
import { GlobalService } from "../services/global.service";
import { DeletedialogComponent } from "../deletedialog/deletedialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort, Sort } from "@angular/material/sort";

@Component({
  selector: "app-companies",
  templateUrl: "./companies.component.html",
  styleUrls: ["./companies.component.scss"],
})
export class CompaniesComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  // @ViewChild("closebutton") closebutton;
  @ViewChild('closebutton') closebutton : ElementRef
  addCompanyform: FormGroup;
  companyvisitordata;
  data;
  pComanyname;
  subCompanies = [];
  Companies: any = [];
  sub: any = [];
  deleteSub: any = [];
  companyArr2: MatTableDataSource<any>;
  companyArr: MatTableDataSource<any>;
  displayedColumns: string[] = [
    "companyname",
    "Admin",
    "ContactName",
    "email",
    "status",
    "actions",
    "subcompany",
  ];
  subCompaniesnames: string[] = [
    "Company",
    "SPOC",
    "Contact No",
    "Email Address",
    "Status",
    "Action",
  ];

  constructor(
    private _fb: FormBuilder,
    private dataservice: GenericService,
    private _gservice: GlobalService,
    private dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initailizeForm();
    this.getCompaniesdata();
  }
  initailizeForm() {
    this.addCompanyform = this._fb.group({
      companyname: ["", Validators.required],
      scode: [this.dataservice.scode],
    });
  }
  addcompany() {
    const dialogref = this.dialog.open(AddcompanyComponent, {
      width: "1000px",
      panelClass: "deletedialog",
    });
    dialogref.afterClosed().subscribe((data) => {
      if (data == "saved") {
        this.getCompaniesdata();
      }
    });
  }

  viewcompany(obj) {
    this.pComanyname = obj.companyname;
    this.sub = this.subCompanies.filter((subcompanylist) => {
      return subcompanylist.parentCompanyId == obj.companyId;
    });
    this.companyArr2 = this.sub;
    this.companyArr2 = new MatTableDataSource(this.sub);
    this.companyArr2.paginator = this.paginator;
  }

  getCompaniesdata() {
    this.subCompanies = [];
    this.Companies = [];
    this._gservice.getCompanies().subscribe((data) => {
      data.filter((X) => {
        if (X.type) {
          this.subCompanies.push(X);
        } else {
          this.Companies.push(X);
        }
      });
      this.companyArr = this.Companies;
      this.companyArr = new MatTableDataSource(this.Companies);
      this.companyArr.sort = this.sort;
      this.companyArr.paginator = this.paginator;
    });
  }

  updateaccStatus(event, data) {
    this._gservice.updateaccSts(data).subscribe((res) => {
      if (res.updated == true) {
        this._snackBar.open("Updated successfully", "ok", { duration: 3000 });
      }
    });
  }
  updateparentcompany(obj) {
    const dialogRef = this.dialog.open(AddcompanyComponent, {
      width: "1000px",
      panelClass: "deletedialog",
      data: { updatecompany: obj },
    });
    dialogRef.afterClosed().subscribe((obj) => {
      if (obj == "saved") {
        this.getCompaniesdata();
      }
    });
  }

  updatesubcompanystatus(event, data) {
    this._gservice.updatestatussubcompany(data).subscribe((res) => {
      if (res.updated == true) {
        this._snackBar.open("Updated subcompany status successfully", "ok", {
          duration: 3000,
        });
      }
    });
  }

  public closeModel() {
    console.log('hlo',this.closebutton)
    // this.closebutton.nativeElement.hide();
    this.closebutton.nativeElement.click();
  }
  // delte companies

  deleteCompany(obj) {
    let company = {
      companyId: obj.companyId,
    };
    let sub = ([] = this.subCompanies.filter((x) => {
      return x.parentCompanyId == obj.companyId;
    }));
    if (sub.length > 0) {
      this._snackBar.open("please delete subcompines","ok",{
        duration: 3000,
      });
    } else {
      const dialogRef = this.dialog.open(DeletedialogComponent, {
        width: "400px",
      });
      dialogRef.afterClosed().subscribe((data) => {
        if (data == true) {
          this._gservice.deletecompany(company).subscribe((res) => {
            this.getCompaniesdata();
          });
        }
      });
    }
  }

  deletesubCompany(obj) {
    let company = {
      companyId: obj.companyId,
    };
    this.closebutton.nativeElement.click();
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == true) {
        this._gservice.deletecompany(company).subscribe((res) => {
          console.log(res);
          this.getCompaniesdata();
        });
      }
    });
  }

  sortData(sort: Sort) {
    const data = this.companyvisitordata.slice();

    if (!sort.active || sort.direction === "") {
      this.companyvisitordata = data;
    } else {
      this.companyvisitordata = data.sort((a, b) => {
        const aValue = (a as any)[sort.active];
        const bValue = (b as any)[sort.active];
        return (aValue < bValue ? -1 : 1) * (sort.direction === "asc" ? 1 : -1);
      });
    }
  }

  addSubCompany(company: any) {
    const dialogref = this.dialog.open(AddcompanyComponent, {
      width: "1000px",
      panelClass: "deletedialog",
      data: { companyData: company, type: "subCompany" },
    });
    dialogref.afterClosed().subscribe((data) => {
      if (data == "saved") {
        this.getCompaniesdata();
      }
    });
  }
}
