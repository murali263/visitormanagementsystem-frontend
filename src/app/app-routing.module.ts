import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ActivateaccountComponent } from './activateaccount/activateaccount.component';
import { AddadminComponent } from './addadmin/addadmin.component';
import { AddsezComponent } from './addsez/addsez.component';
import { AdminComponent } from './admin/admin.component';
import { AdmindashboardComponent } from './admindashboard/admindashboard.component';
import { AdminprofileComponent } from './adminprofile/adminprofile.component';
import { AuthGuard } from './auth.guard';
import { CompaniesComponent } from './companies/companies.component';
import { ForgotpasswordComponent } from './forgotpassword/forgotpassword.component';
import { HomeComponent } from './home/home.component'
import { NotlistedvisitorsComponent } from './notlistedvisitors/notlistedvisitors.component';
import { SetpasswordComponent } from './setpassword/setpassword.component';
import { SuperadminComponent } from './superadmin/superadmin.component';
import { SuperadmindashboardComponent } from './superadmindashboard/superadmindashboard.component';
import { SuperadminprofileComponent } from './superadminprofile/superadminprofile.component';
import { TochecktokenemailComponent } from './tochecktokenemail/tochecktokenemail.component';
import { TodayvisitorsComponent } from './todayvisitors/todayvisitors.component';
import { VisitorslogComponent } from './visitorslog/visitorslog.component';
import { SezusersandsezdetailsComponent } from '../app/sezusersandsezdetails/sezusersandsezdetails.component';
import { ChangepasswordComponent } from './changepassword/changepassword.component';
import { ResetpasswordComponent } from './resetpassword/resetpassword.component';
import { GuardListComponent } from './guard-list/guard-list.component';
import { ManagerListComponent } from './manager-list/manager-list.component';
import { CompanyinfoComponent } from './companyinfo/companyinfo.component';
import { VistorformComponent } from './vistorform/vistorform.component';
import { VisitordetailsComponent } from './visitordetails/visitordetails.component';
import {CheckinComponent} from './checkin/checkin.component'
import { TotalvisitorsComponent } from './totalvisitors/totalvisitors.component';
import {NavbarComponent} from './navbar/navbar.component'
const routes: Routes = [
  {
    path:'',
    redirectTo:'login',
    pathMatch:"full"
  },
  {
    path:"login",
    component:HomeComponent
  },

  { path: 'guards', component: AdminComponent, canActivate: [AuthGuard] },
  { path: 'admindashboard', component: AdmindashboardComponent, canActivate: [AuthGuard] },
  
  { path: 'addadmin', component: AddadminComponent, canActivate: [AuthGuard] },
  
  { path: 'superadmin', component: SuperadminComponent, canActivate: [AuthGuard] },
  { path: 'addsez', component: AddsezComponent, canActivate: [AuthGuard] },
 
  { path: 'adminprofile', component: AdminprofileComponent, canActivate: [AuthGuard] },
 
  { path: 'visitors', component: TodayvisitorsComponent },
  { path: 'visitorslog', component: VisitorslogComponent, canActivate: [AuthGuard] },
  { path: 'forgot_password', component: ForgotpasswordComponent },
  { path: 'checkemail/:token', component: TochecktokenemailComponent },
  { path: 'set-new-password', component: SetpasswordComponent },
  { path: 'activate/:token', component: ActivateaccountComponent },
  { path: 'visitor', component: NotlistedvisitorsComponent},
  { path: 'sez', component: SezusersandsezdetailsComponent },
 
  { path: 'resetpassword/:token', component: ResetpasswordComponent },
  
 
  { path: 'manager', component: ManagerListComponent },

  { path: 'vistorForm', component: VistorformComponent },
 
  {path:'checkin',component:CheckinComponent},

  {path:'navbar',component:NavbarComponent,
canActivate:[AuthGuard],children:[
  { path: 'dashboard', component: SuperadmindashboardComponent, canActivate: [AuthGuard] },
  { path: 'companies', component: CompaniesComponent, canActivate: [AuthGuard] },
  { path: 'profile', component: SuperadminprofileComponent, canActivate: [AuthGuard] },
  { path: 'managerList', component: ManagerListComponent },
  { path: 'guardList', component: GuardListComponent },
  { path: 'companyinfo', component: CompanyinfoComponent },
  { path: 'vistorDetails', component: VisitordetailsComponent,canActivate: [AuthGuard]},
  {path:'totalvisitor',component:TotalvisitorsComponent,canActivate: [AuthGuard]},
  { path: 'configsettings', component: ChangepasswordComponent, canActivate: [AuthGuard] },
]
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
