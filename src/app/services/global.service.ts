import { Injectable } from "@angular/core";
import {
  HttpClient,
  HttpErrorResponse,
  HttpHeaders,
} from "@angular/common/http";
import { Observable, Subject } from "rxjs";
import { environment } from "../../environments/environment";
import { GenericService } from "./generic.service";
import { tap, catchError } from "rxjs/operators";

@Injectable({
  providedIn: "root",
})
export class GlobalService {
  // httpHeaders: HttpHeaders = new HttpHeaders();

  headerDict = {
    "Content-Type": "application/json",
    // 'Accept': 'application/json',
    // 'Access-Control-Allow-Headers': 'Content-Type',
    // 'Access-Control-Allow-Origin':'*',
    // 'Access-Control-Allow-Headers': 'X-Requested-With',
    authorization: "b8416f2680eb194d61b33f9909f94b9d",
  };

  requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };

  constructor(private _http: HttpClient, private dataService: GenericService) {}
  adminExisted: boolean;
  isLoading = new Subject<boolean>();
  show() {
    this.isLoading.next(true);
  }
  hide() {
    this.isLoading.next(false);
  }
  // to Login
  login(data): Observable<any> {
    return this._http.post(`${environment.baseUrl}users/login`, data);
  }
  //Guards
  creategruad(data): Observable<any> {
    return this._http.post(`${environment.baseUrl}users/create-users`, data);
  }

  //to create Sez
  createSez(data): Observable<any> {
    return this._http.post(`${environment.baseUrl}sezs/create-sez`, data);
  }

  creating(data): Observable<any> {
    return this._http.post(`${environment.baseUrl}sezs/creatingsez`, data);
  }
  //to create user
  createUser(data): Observable<any> {
    return this._http.post(`${environment.baseUrl}users/create-users`, data);
  }

  // to get users(admin,superadmin)
  fetchUsers(page?: number, limit?: number): Observable<any> {
    var role;
    if (this.dataService.searchkeyword != undefined) {
      return this._http.get(
        `${environment.baseUrl}users/getUsers?searchkeyword=${this.dataService.searchkeyword}`
      );
    }
    if (
      this.dataService.role == "admin" ||
      this.dataService.role == "subadmin"
    ) {
      role = "guard";
      return this._http.get(
        `${environment.baseUrl}users/getUsers?role=${role}&&scode=${this.dataService.scode}&page=${page}&limit=${limit}`
      );
    }
    if (this.dataService.role == "superadmin") {
      role = "admin";
      return this._http.get(
        `${environment.baseUrl}users/getUsers?role=${role}&page=${page}&limit=${limit}`
      );
    } else {
      return this._http.get(`${environment.baseUrl}users/getTotalUsers`);
    }
  }

  // to get subadmin
  fetchsub(): Observable<any> {
    var role;
    if (this.dataService.role == "admin") {
      return this._http.get(
        `${environment.baseUrl}users/getUsers?role=${role}`
      );
    }
  }

  fetchsubadmin(page?: number, limit?: number): Observable<any> {
    var role;
    if (this.dataService.searchkeyword) {
      return this._http.get(
        `${environment.baseUrl}users/getUsers?searchkeyword=${this.dataService.searchkeyword}`
      );
    }
    if (this.dataService.role == "admin") {
      role = "subadmin";
      return this._http.get(
        `${environment.baseUrl}users/getUsers?role=${role}&&scode=${this.dataService.scode}&page=${page}&limit=${limit}`
      );
    }
  }

  // to get sezs
  fetchSez(page?: number, limit?: number): Observable<any> {
    if (this.dataService.searchkeyword) {
      return this._http.get(
        `${environment.baseUrl}sezs/get-SezList?searchkeyword=${this.dataService.searchkeyword}`
      );
    } else {
      return this._http.get(
        `${environment.baseUrl}sezs/get-SezList?page=${page}&limit=${limit}`
      );
    }
  }

  // to delete users
  deleteGuards(data): Observable<any> {
    return this._http.delete(
      `${environment.baseUrl}users/delete-guard/${data}`
    );
  }

  // to update useracc status
  updateaccSts(obj): Observable<any> {
    return this._http.put(`${environment.baseUrl}company/updatecompany`, obj);
  }
  updatestatussubcompany(obj): Observable<any> {
    return this._http.put(
      `${environment.baseUrl}company/updatestatussubcompany`,
      obj
    );
  }

  // to update users
  updateagrd(obj): Observable<any> {
    return this._http.put(`${environment.baseUrl}users/update-details`, obj);
  }
  updateSez(changeObj): Observable<any> {
    return this._http.put(`${environment.baseUrl}sezs/update-sez`, changeObj);
  }
  updateSezInAdmin(changeObj): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}users/update-SezInAdmin`,
      changeObj["updatedObj"]
    );
  }
  updateAdmin(changeObj): Observable<any> {
    return this._http.put(
      `${environment.baseUrl}users/update-details`,
      changeObj
    );
  }

  updateprofileinfo(data) {
    return this._http.put(
      `${environment.baseUrl}users/updateuserdetails`,
      data
    );
  }

  updateAdminoneprofile(updateone): Observable<any> {
    return this._http.put(
      `${environment.baseUrl}users/updateone.uid`,
      updateone
    );
  }

  // to get sez companies
  getCompanies(scode?: string): Observable<any> {
    return this._http.get(`${environment.baseUrl}company/get-CompanyList`);
  }
  // to get Total companies
  getTotalCompanies(): Observable<any> {
    return this._http.get(`${environment.baseUrl}company/get-TotalCompanyList`);
  }

  // for add company
  createCompanies(obj): Observable<any> {
    return this._http.post(`${environment.baseUrl}company/create-company`, obj);
  }
  // createCompany(obj): Observable<any> {

  // let httpHeaders = new HttpHeaders();
  // httpHeaders.append('Access-Control-Allow-Origin','*');
  // httpHeaders.append("Access-Control-Allow-Headers", "X-Requested-With");
  // httpHeaders.append('Content-Type', 'application/json');
  // httpHeaders.append('authorization', 'b8416f2680eb194d61b33f9909f94b9d');
  // httpHeaders.append("Access-Control-Expose-Headers", "responseType");

  // this.httpHeaders.append('Host','http://portal2.prospectatech.com');
  // this.httpHeaders.append('Origin','http://localhost:4200');

  // return this._http.post(`http://portal2.prospectatech.com/epwebservices/v1/updateCompanyDetail`,obj, this.requestOptions );
  // }

  //delete User
  deleteUser(obj): Observable<any> {
    return this._http.delete(`${environment.baseUrl}users/delete-user/${obj}`);
  }
  //archive
  archiveUser(obj): Observable<any> {
    return this._http.post(`${environment.baseUrl}archive/soft-delete`, obj);
  }

  deleteSez(obj): Observable<any> {
    return this._http.delete(`${environment.baseUrl}sezs/delete-sez/${obj}`);
  }

  archiveSez(obj): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}SezArchive/soft-delete_sez`,
      obj
    );
  }

  activateUserAcc(obj): Observable<any> {
    return this._http.post(`${environment.baseUrl}users/activate-user`, obj);
  }

  // _________to get the todays visitors_______________

  getvisitoringdata(): Observable<any> {
    return this._http.get(`${environment.baseUrl}visitor/todaysvisitors`);
  }

  gettodaysvisitors(vechileno?: String): Observable<any> {
    if (vechileno) {
      return this._http.get(
        `${environment.baseUrl}visitor/?scode=${this.dataService.scode}&vehicle_number=${vechileno}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    } else {
      return this._http.get(
        `${environment.baseUrl}visitor/?scode=${this.dataService.scode}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    }
  }

  // ________to update in-time __________

  updatein_time(obj) {
    return this._http.put(`${environment.baseUrl}visitor/in_time`, obj);
  }

  // ________to update out-time _____________

  updateout_time(obj) {
    return this._http.put(`${environment.baseUrl}visitor/out_time`, obj);
  }

  // ________to get visitors logs __________

  getvisitorlog(): Observable<any> {
    return this._http.get(`${environment.baseUrl}visitor/visitorslog`).pipe(
      tap((data) => alert(JSON.stringify(data))),
      catchError(this.errorHandler)
    );
  }
  errorHandler(error: HttpErrorResponse) {
    //s return Observable.throw(error.message || "server error.");
    return observableThrowError(error.message || "Server Error");
  }

  getttingvis(data): Observable<any> {
    return this._http.get(`${environment.baseUrl}visitor/asone`, data);
  }

  toget_vistorslog(start?: string, end?: string, company_code?: string) {
    if (start != "" && end != "" && company_code == "") {
      return this._http.get(
        `${environment.baseUrl}visitor/visitorslog?start_date=${start}&end_date=${end}&scode=${this.dataService.scode}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    } else if (
      start != "" &&
      end != "" &&
      company_code != "" &&
      start != undefined &&
      end != undefined &&
      company_code != undefined
    ) {
      return this._http.get(
        `${environment.baseUrl}visitor/visitorslog?start_date=${start}&end_date=${end}&scode=${this.dataService.scode}&company_code=${company_code}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    } else if (start == "" && end == "" && company_code != "") {
      return this._http.get(
        `${environment.baseUrl}visitor/visitorslog?scode=${this.dataService.scode}&company_code=${company_code}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    } else if (
      (start == "" && end == "" && company_code == "") ||
      (start == undefined && end == undefined && company_code == undefined)
    ) {
      return this._http.get(
        `${environment.baseUrl}visitor/visitorslog?scode=${this.dataService.scode}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    }
  }

  fetchAdminsForSezList(obj): Observable<any> {
    return this._http.post(
      `${environment.baseUrl}users/getAdminsForSezList`,
      obj
    );
  }

  // _______ to change the password _________

  change_password(obj): Observable<any> {
    return this._http.post(`${environment.baseUrl}users/change_password`, obj);
  }

  // ____ to reset password /forgot password_____

  forgot_password(obj): Observable<any> {
    return this._http.post(`${environment.baseUrl}forgot/reset`, obj);
  }

  // to verify link token

  verify_token(obj): Observable<any> {
    return this._http.post(`${environment.baseUrl}forgot/valid-token`, obj);
  }

  // change password using forgot password

  reset_password(obj): Observable<any> {
    return this._http.post(`${environment.baseUrl}forgot/new-password`, obj);
  }

  // delete company

  deletecompany(obj): Observable<any> {
    console.log("api-->", obj);

    return this._http.post(`${environment.baseUrl}company/deleteCompanys`, obj);
  }

  //___________________ all visitor data ________

  // visitordata(data):Observable<any>{
  //   return this._http.get(`${environment.baseUrl}/visitor/asone`,data)
  // }

  vlognotin_out;

  // ________to get visitors logs who are not checkin or checkout__________

  toget_vlognotin_out(start?: string, end?: string, company_code?: string) {
    if (start != "" && end != "" && company_code == "") {
      return this._http.get(
        `${environment.baseUrl}visitor/vlognotin_out?start_date=${start}&end_date=${end}&scode=${this.dataService.scode}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    } else if (
      start != "" &&
      end != "" &&
      company_code != "" &&
      start != undefined &&
      end != undefined &&
      company_code != undefined
    ) {
      return this._http.get(
        `${environment.baseUrl}visitor/vlognotin_out?start_date=${start}&end_date=${end}&scode=${this.dataService.scode}&company_code=${company_code}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    } else if (start == "" && end == "" && company_code != "") {
      return this._http.get(
        `${environment.baseUrl}visitor/vlognotin_out?scode=${this.dataService.scode}&company_code=${company_code}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    } else if (
      (start == "" && end == "" && company_code == "") ||
      (start == undefined && end == undefined && company_code == undefined)
    ) {
      return this._http.get(
        `${environment.baseUrl}visitor/vlognotin_out?scode=${this.dataService.scode}&page=${this.dataService.page}&limit=${this.dataService.limit}`
      );
    }
  }

  getToken() {
    return !!localStorage.getItem("token");
  }

  createSubCompanies(companyObj) {
    return this._http.post(
      `${environment.baseUrl}company/subCompany`,
      companyObj
    );
  }

  createGuard(obj) {
    return this._http.post(`${environment.baseUrl}guard/create-guard`, obj);
  }

  getGuard(companyId) {
    return this._http.get(
      `${environment.baseUrl}guard/get-guards?companyId=${companyId}`
    );
  }

  deleteGuard(obj) {
    return this._http.delete(
      `${environment.baseUrl}guard/delete-guard?guardId=${obj.guardId}`
    );
  }
  visitorDeleteData(obj) {
    return this._http.delete(
      `${environment.baseUrl}visitor/delete-visitor?companyId=${obj.companyId}`
    );
  }

  createManager(obj) {
    return this._http.post(`${environment.baseUrl}manager/create-manager`, obj);
  }

  getManager(companyId) {
    return this._http.get(
      `${environment.baseUrl}manager/get-manager?companyId=${companyId}`
    );
  }

  deleteManager(obj) {
    return this._http.delete(
      `${environment.baseUrl}manager/delete-manager?managerId=${obj.managerId}`
    );
  }

  createVistor(obj) {
    return this._http.post(
      `${environment.baseUrl}visitor/visitordatainsert`,
      obj
    );
  }
  getVistor(companyId, Action) {
    return this._http.get(
      `${environment.baseUrl}visitor/get-vistor?companyId=${companyId}&Action=${Action}`
    );
  }

  getVisitorListData(companyId, visitDate) {
    return this._http.get(
      `${environment.baseUrl}visitor/get-vistor?companyId=${companyId}&visitDate=${visitDate}`
    );
  }
  getVisitorFilterData(obj) {
    return this._http.post(`${environment.baseUrl}visitor/visitor-list`, obj);
  }
  updateVisitorsStatus(obj): Observable<any> {
    return this._http.put(
      `${environment.baseUrl}visitor/visitor_update_data`,
      obj
    );
  }

  parent_company_updated(company_update) {
    return this._http.put(
      `${environment.baseUrl}company/parent_update_data`,
      company_update
    );
  }

  Guard_Data_Updated(guard_update) {
    return this._http.put(
      `${environment.baseUrl}guard/update_guard_data`,
      guard_update
    );
  }
  Manager_Date_Updated(manager_update) {
    return this._http.put(
      `${environment.baseUrl}manager/update_manager_data`,
      manager_update
    );
  }

  visitorcheckin(data: any) {
    return this._http.post(`${environment.baseUrl}visitor/check_in`, data);
  }
  visitorcheckout(data: any) {
    return this._http.post(`${environment.baseUrl}visitor/check_out`, data);
  }

  //get citys

  fetchcitysstates(): Observable<any> {
    return this._http.get(`${environment.baseUrl}statescitys/getcitys`);
  }

  getsubcomp(companyId) {
    return this._http.get(
      `${environment.baseUrl}company/get-subcompanies?companyId=${companyId}`
    );
  }

  // filters visitors list

  getSearchfilter(data) {
    return this._http.post(`${environment.baseUrl}visitor/search`, data);
  }
}
function observableThrowError(arg0: any): Observable<any> {
  throw new Error("Function not implemented.");
}
