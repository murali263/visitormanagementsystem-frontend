import { Component, OnInit } from "@angular/core";
import { FormControl } from "@angular/forms";
import { Router, ActivatedRoute } from "@angular/router";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { GlobalService } from "../services/global.service";
import { GenericService } from "../services/generic.service";

@Component({
  selector: "app-resetpassword",
  templateUrl: "./resetpassword.component.html",
  styleUrls: ["./resetpassword.component.scss"],
})
export class ResetpasswordComponent implements OnInit {
  form: any;
  token: any;
  CurrentState: any;
  hide = true;
  hide1 = true;
  isVerified = true;

  constructor(
    public router: Router,
    private fb: FormBuilder,
    private genric: GenericService,
    private global: GlobalService,
    private arouter: ActivatedRoute
  ) {
    this.CurrentState = "Wait";
    this.arouter.params.subscribe((params) => {
      this.token = params.token;
      this.verifyToken();
    });
  }

  ngOnInit(): void {
    this.formbuilder();
  }
  formbuilder() {
    this.form = this.fb.group({
      newPassword: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          ),
        ],
      ],
      confirmPassword: [
        "",
        [
          Validators.required,
          Validators.pattern(
            "(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[$@$!#^~%*?&,.<>\"'\\;:{\\}\\[\\]\\|\\+\\-\\=\\_\\)\\(\\)\\`\\/\\\\\\]])[A-Za-z0-9d$@].{7,}"
          ),
        ],
      ],
    });
  }
  get newPassword() {
    return this.form.get("newPassword");
  }
  get confirmPassword() {
    return this.form.get("confirmPassword");
  }

  verifyToken() {
    let obj: any = {};
    obj.token = this.token;
    this.global.verify_token(obj).subscribe(
      (data) => {
        this.CurrentState = "Verified";
      },
      (err) => {
        this.CurrentState = "NotVerified";
      }
    );
  }

  reset() {
    if (this.form.valid) {
      let obj = {
        password: this.form.value.confirmPassword,
        token: this.token,
      };

      this.isVerified = true;
      this.global.reset_password(obj).subscribe((data) => {
        this.form.reset();
        this.router.navigate(["/login"]);
      });
    } else {
      this.isVerified = false;
    }
  }

  Validate(passwordFormGroup: FormGroup) {
    const new_password = passwordFormGroup.controls.newPassword.value;
    const confirm_password = passwordFormGroup.controls.confirmPassword.value;

    if (confirm_password.length <= 0) {
      return null;
    }

    if (confirm_password !== new_password) {
      return {
        doesNotMatch: true,
      };
    }
    return null;
  }
}
