import { BrowserModule } from "@angular/platform-browser";
import { NgModule,CUSTOM_ELEMENTS_SCHEMA } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { HomeComponent } from "./home/home.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import { AdminComponent } from "./admin/admin.component";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { MatTabsModule } from "@angular/material/tabs";
import { MatInputModule } from "@angular/material/input";

import { MatToolbarModule } from "@angular/material/toolbar";
import { NavbarComponent } from "./navbar/navbar.component";
import { MatTableModule } from "@angular/material/table";
import { SuperadminComponent } from "./superadmin/superadmin.component";
import { AddsezComponent } from "./addsez/addsez.component";
import { MatCardModule } from "@angular/material/card";
import { MatButtonModule } from "@angular/material/button";
import { MatSlideToggleModule } from "@angular/material/slide-toggle";
import { MatDialogModule } from "@angular/material/dialog";
import { EditguardComponent } from "./editguard/editguard.component";
import { MatIconModule } from "@angular/material/icon";
import { AuthinterceptorService } from "./authinterceptor.service";
import { LeftnavComponent } from "./leftnav/leftnav.component";
import { DeletedialogComponent } from "./deletedialog/deletedialog.component";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { AdmindashboardComponent } from "./admindashboard/admindashboard.component";
import { AddadminComponent } from "./addadmin/addadmin.component";
import { CompaniesComponent } from "./companies/companies.component";
import { AddcompanyComponent } from "./addcompany/addcompany.component";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatPaginatorModule } from "@angular/material/paginator";
import { SuperadmindashboardComponent } from "./superadmindashboard/superadmindashboard.component";
import { ChartsModule } from "ng2-charts";
import { AdminprofileComponent } from "./adminprofile/adminprofile.component";
import { SuperadminprofileComponent } from "./superadminprofile/superadminprofile.component";
import { MatListModule } from "@angular/material/list";
import { VisitorslogComponent } from "./visitorslog/visitorslog.component";
import { TodayvisitorsComponent } from "./todayvisitors/todayvisitors.component";
import { EditprofileComponent } from "./editprofile/editprofile.component";
import { ConvertFrom24To12FormatPipe } from "./convert-from24-to12-format.pipe";
import { VisitordetailsComponent } from "./visitordetails/visitordetails.component";
import { DateRangePickerModule } from "@syncfusion/ej2-angular-calendars";
import { MatSelectModule } from "@angular/material/select";
import { ChangepasswordComponent } from "./changepassword/changepassword.component";
import { ForgotpasswordComponent } from "./forgotpassword/forgotpassword.component";
import { TochecktokenemailComponent } from "./tochecktokenemail/tochecktokenemail.component";
import { SetpasswordComponent } from "./setpassword/setpassword.component";
import { NotlistedvisitorsComponent } from "./notlistedvisitors/notlistedvisitors.component";
import { AuthGuard } from "./auth.guard";
import { SampleComponent } from "./sample/sample.component";
import { AadharcardDirective } from "./directives/aadharcard.directive";
import { MatSortModule } from "@angular/material/sort";
import { AlphabeticalPipe } from "./alphabetical.pipe";
import { SezusersandsezdetailsComponent } from "./sezusersandsezdetails/sezusersandsezdetails.component";
import { MatGridListModule } from "@angular/material/grid-list";
import { FirstletterDirective } from "./directives/firstletter.directive";
import { FirstletterPipe } from "./pipes/firstletter.pipe";
import { ProfileComponent } from "./profile/profile.component";
import { ResetpasswordComponent } from "./resetpassword/resetpassword.component";
import { GuardListComponent } from "./guard-list/guard-list.component";
import { ManagerListComponent } from "./manager-list/manager-list.component";
import { ManagerComponent } from "./manager/manager.component";
import { CompanyinfoComponent } from "./companyinfo/companyinfo.component";
import { VistorformComponent } from "./vistorform/vistorform.component";
import { NgxMaterialTimepickerModule } from "ngx-material-timepicker";
import { MatDatepickerModule } from "@angular/material/datepicker";
import { MatNativeDateModule } from "@angular/material/core";
import { CheckinComponent } from "./checkin/checkin.component";
import {MatTooltipModule} from '@angular/material/tooltip';
import { TotalvisitorsComponent } from './totalvisitors/totalvisitors.component';
import { ActivatedRouteSnapshot } from "@angular/router";
import {MatSidenavModule} from '@angular/material/sidenav';
import {FlexLayoutModule} from '@angular/flex-layout';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AdminComponent,
    NavbarComponent,
    SuperadminComponent,
    AddsezComponent,
    EditguardComponent,
    LeftnavComponent,
    DeletedialogComponent,
    AdmindashboardComponent,
    AddadminComponent,
    CompaniesComponent,
    AddcompanyComponent,
    SuperadmindashboardComponent,
    AdminprofileComponent,
    SuperadminprofileComponent,
    VisitorslogComponent,
    TodayvisitorsComponent,
    EditprofileComponent,
    ConvertFrom24To12FormatPipe,
    VisitordetailsComponent,
    ChangepasswordComponent,
    ForgotpasswordComponent,
    TochecktokenemailComponent,
    SetpasswordComponent,
    NotlistedvisitorsComponent,
    SampleComponent,
    AadharcardDirective,
    AlphabeticalPipe,
    SezusersandsezdetailsComponent,
    FirstletterDirective,
    FirstletterPipe,
    ProfileComponent,
    ResetpasswordComponent,
    GuardListComponent,
    ManagerListComponent,
    ManagerComponent,
    CompanyinfoComponent,
    VistorformComponent,
    CheckinComponent,
    TotalvisitorsComponent,
    
  ],
  exports:[
    MatDatepickerModule,

    MatNativeDateModule
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatNativeDateModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    MatTabsModule,
    MatInputModule,
    MatToolbarModule,
    MatSidenavModule,
    MatTableModule,
    MatCardModule,
    MatButtonModule,
    MatSlideToggleModule,
    MatDialogModule,
    MatIconModule,
    MatSortModule,
    MatFormFieldModule,
    MatSnackBarModule,
    MatPaginatorModule,
    ChartsModule,
    MatListModule,
    MatDatepickerModule,
    FlexLayoutModule,
    DateRangePickerModule,
    MatSelectModule,
    MatGridListModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
 
    
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthinterceptorService,
      multi: true,
       
      
    },
    AuthGuard,
    MatDatepickerModule,
      MatNativeDateModule,
      
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
