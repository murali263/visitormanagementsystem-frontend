import { Component, OnInit, ViewChild } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GenericService } from "../services/generic.service";
import { MatDialog } from "@angular/material/dialog";
import { GlobalService } from "../services/global.service";
import { DeletedialogComponent } from "../deletedialog/deletedialog.component";
import { MatSnackBar } from "@angular/material/snack-bar";
import { MatPaginator } from "@angular/material/paginator";
import { MatTableDataSource } from "@angular/material/table";
import { MatSort } from "@angular/material/sort";
import { ManagerComponent } from "../manager/manager.component";
@Component({
  selector: "app-manager-list",
  templateUrl: "./manager-list.component.html",
  styleUrls: ["./manager-list.component.scss"],
})
export class ManagerListComponent implements OnInit {
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  addCompanyform: FormGroup;
  data;
  searchedText: String = "";
  //-------------------------username validation messages----------------------//
  emptyUserName = "Please enter a username";
  minlengthUserName = "user name must be at least 3 characters long";
  maxlengthUserName = "username cannot exceed 20 characters";
  userNamePattern = "username should be in alphanumeric only";
  //-----------------------phone number validation messages----------------------//
  emptyPhoneNumber = "You must enter a phonenumber";
  maxlengthPhoneNumber = "phonenumber cannot exceed 10 characters";
  minlengthPhoneNumber = "phonenumber must be at least 3 characters long";
  PhoneNumberPattern = "phonenumber should be in numericals only";
  //---------------------------------zipcode---------------------------------------------//
  maxlengthzip = "maxlength must be at least 6 characters";
  zipPattern = "Zipcode should be in numericals only";
  //--------------------------------common validation-----------------------------------------//
  characterspattern = "accept  alphanumeric only";
  //-------------------------password-----------------------------------------------//

  minlengthpassword = "password must be at least 5 characters long";
  maxlengthpassword = "password cannot exceed 7 characters";
  passwordPattern = "password  should contains Eg:(Abc@123)";
  //-----------------------------------------------------------------------------------------//
  managerArr :any=[]
  isVisible:boolean = false
  displayedColumns: string[] = [
    "FullName",
    "Phone Number",
    "Email",
    "Department",
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
    this.getmanagerdata();
  }
  initailizeForm() {
    this.addCompanyform = this._fb.group({
      companyname: ["", Validators.required],
      scode: [this.dataservice.scode],
    });
  }
  addmanager() {
    const dialogref = this.dialog.open(ManagerComponent, {
      width: "1000px",
      panelClass: "deletedialog",
    });
    dialogref.afterClosed().subscribe((data) => {
      if (data == "saved") {
        this.ngOnInit();
      }
    });
  }
  getmanagerdata() {
    let companyId = localStorage.getItem("companyId");
    this._gservice.getManager(companyId).subscribe((data: any) => {
      this.managerArr = data;
      if(this.managerArr.length ===0){
        this.isVisible = true;
      }else{
        this.isVisible = false;
      }
      this.managerArr = new MatTableDataSource(data);
      this.managerArr.sort = this.sort;
      this.managerArr.paginator = this.paginator;
    });
  }
  deleteCompany(obj) {
    const dialogRef = this.dialog.open(DeletedialogComponent, {
      width: "400px",
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == true) {
        this._gservice.deleteManager(obj).subscribe((res) => {
          if (res["delete"] == true) {
            this.getmanagerdata();
            this._snackBar.open("Deleted successfully", "ok", {
              duration: 3000,
            });
          }
        });
      }
    });
  }
  updateMangerData(obj) {
    const dialogRef = this.dialog.open(ManagerComponent, {
      width: "800px",
      panelClass: "deletedialog",
      data: { updatecompany: obj },
    });
    dialogRef.afterClosed().subscribe((obj) => {
      if (obj == "saved") {
        this.getmanagerdata();
      }
    });
  }
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.managerArr.filter = filterValue.trim().toLowerCase();
  }
}
