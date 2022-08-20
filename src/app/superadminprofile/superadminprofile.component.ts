import { HttpClient } from "@angular/common/http";
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from "@angular/core";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { DomSanitizer } from "@angular/platform-browser";
//import { runInThisContext } from 'vm';
import { ChangepasswordComponent } from "../changepassword/changepassword.component";
import { EditprofileComponent } from "../editprofile/editprofile.component";
import { ProfilepageService } from "../profilepage.service";

@Component({
  selector: "app-superadminprofile",
  templateUrl: "./superadminprofile.component.html",
  styleUrls: ["./superadminprofile.component.scss"],
})
export class SuperadminprofileComponent implements OnInit {
  selectedFile: File = null;
  fd = new FormData();
  @ViewChild("myProfileImage") myImage: ElementRef;
  constructor(
    private ps: ProfilepageService,
    private http: HttpClient,
    private domSanitizer: DomSanitizer,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  loggedInUsername: any;
  profileObj: any;
  url = "";
  showUploadBtn: boolean = false;

  empid: any;
  profiledata: object;
  dispaly: boolean = false;

  //after picture was uploaded
  file: File;
  imageurl: any = "../../assets/images/dummypic.jpg";

  ngOnInit(): void {
    this.loggedInUsername = localStorage.getItem("username");  
    this.getProfile();
    this.getProfilePic();
  }

  getProfile() {
    this.ps.fetchProfile(localStorage.getItem("username")).subscribe((data) => {
      if (data["message"] == "relogin") {
        this._snackBar.open("Session expired . Please relogin", "ok", {
          duration: 5000,
        });
      } else {
        this.profileObj = data?.res;
      }
    });
  }


  fileUpload(event) {
    this.showUploadBtn = true;
    this.file = event.target.files[0];
    this.url = event.target.results;
  }

  
  

  uploadExcel(data) {  
    this.showUploadBtn = false;
    let formdata = new FormData();
    formdata.append("image", this.file);
    formdata.append("username", this.loggedInUsername);
    this.ps.uploadProfilePic(formdata).subscribe((res) => {
      this.getProfilePic();
    });
  }

  async getProfilePic() {
    let photo = await this.ps
      .fetchProfilePic(this.loggedInUsername)
      .toPromise();
    if (photo.type == "application/json") {
      return;
    }
    console.log(photo);
    let objectURL = URL.createObjectURL(photo);
    this.imageurl = this.domSanitizer.bypassSecurityTrustUrl(objectURL);
    localStorage.setItem("prifilepicChanged", "yes");

    // console.log(this.imageurl);
    localStorage.setItem(
      "profilepic",
      this.imageurl["changingThisBreaksApplicationSecurity"].toString()
    );
    // console.log(this.imageurl)
    // console.log(this.imageurl['changingThisBreaksApplicationSecurity'])
  }

  // removeprofilepic(event){
  //   this.imageurl= this.domSanitizer.bypassSecurityTrustUrl('')
  //   localStorage.removeItem("profilepic")
  //   console.log('hello')
  //  // this.file=event.target.files[1];
  //   let formdata = new FormData();
  //  formdata.append("image",this.file);
  //  formdata.append("username",this.loggedInUsername);
  //   this.ps.deleteprofilepic(formdata).subscribe((res:any)=>{
  //     console.log(res)
  //   this.deleteprofile()
  //   })
  //  // this.imageurl.splice(1,1)
  // }

  async removeprofilepic() {
    this.imageurl = "../../assets/images/dummypic.jpg";
    let myUrl = "http://localhost:4200/assets/images/dummypic.jpg";

    let image_data = await this.http
      .get<any>(myUrl, { responseType: "blob" as "json" })
      .toPromise();
    this.file = new File([image_data], "myImage.png", {
      type: "image/jpeg",
      lastModified: Date.now(),
    });
    let formdata = new FormData();
    formdata.append("image", this.file);
    formdata.append("username", this.loggedInUsername);
    this.ps.uploadProfilePic(formdata).subscribe((res) => {
      this.getProfilePic();
    });
  }

  updateDailog(updateObj) {
    let dialogRef = this.dialog.open(EditprofileComponent, {
      width: "400px",
      data: updateObj[0],
    });
    dialogRef.afterClosed().subscribe((data) => {
      if (data == "success") {
        this.getProfile();
      }
    });
  }


  closeDialog() {
    this.dialog.closeAll();
  }
}
function objectURL(objectURL: any): any {
  throw new Error("Function not implemented.");
}
