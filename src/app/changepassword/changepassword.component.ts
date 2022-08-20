import { Component, Inject, OnInit } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {
  MatDialog,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { GenericService } from "../services/generic.service";
import { GlobalService } from "../services/global.service";

@Component({
  selector: "app-changepassword",
  templateUrl: "./changepassword.component.html",
  styleUrls: ["./changepassword.component.scss"],
})
export class ChangepasswordComponent implements OnInit {
  localUsername;
  localCompanyid;
  localEmail;
  hide = true;
  hide1 = true;
  hide2 = true;
  passwordresetForm: FormGroup;
  constructor(
    private _fb: FormBuilder,
    private dataservice: GenericService,
    private _gservice: GlobalService,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.initailizeForm();
  }
  initailizeForm() {
    this.passwordresetForm = this._fb.group({
      old_password: ["", Validators.required],
      new_password: ["", Validators.required],
      username: ["", Validators.required],
    });
  }

  reset_password() {
    let payload: any = {};
    payload.old_password = this.passwordresetForm.value.old_password;
    payload.new_password = this.passwordresetForm.value.new_password;
    payload.username = localStorage.getItem("username");

    this._gservice.change_password(payload).subscribe((res) => {
      console.log(res);
      if (res["message"] == "reseted") {
        this._snackBar.open("password reseted successfully", "ok", {
          duration: 3000,
        });
      }
      if (res["message"] == "Invalid password") {
        this._snackBar.open("Invalid old password", "ok", { duration: 3000 });
      }
    });
  }
}
