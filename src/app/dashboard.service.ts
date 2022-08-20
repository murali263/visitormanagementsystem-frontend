import { Injectable } from '@angular/core';
import { Observable, ObservableInput } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { GenericService } from './services/generic.service';
import { catchError, tap } from 'rxjs/operators';
import {sezlist} from '../app/model/sezlist'

@Injectable({
  providedIn: 'root'
})

export class DashboardService {

    private graphURL ="../assets/data/sez.json"
  errorHandler: (err: any, caught: Observable<any>) => ObservableInput<any>;

  constructor(private _http:HttpClient, private dataService : GenericService) { }




  getgraph():Observable<sezlist[]>{
    return this._http.get<sezlist[]>(this.graphURL);
    }

  getTotalCompanies(): Observable<any>
  {
    return this._http.get(`${environment.baseUrl}company/d-TotalCompanies`);

  }
  getTotalUsers(): Observable<any>
  {
    return this._http.get(`${environment.baseUrl}users/d-TotalUsers`);
  }
  getTotalVisitors(): Observable<any>
  {
    return this._http.get(`${environment.baseUrl}company/d-allCompanies`);
  }
  getTotalSezs(): Observable<any>
  {
    // console.log("d board total sez")
    return this._http.get(`${environment.baseUrl}sezs/d-TotalSezs`);
  }

  //selected Sez Details
  getSezUsers(scode): Observable<any>
  {
    return this._http.get(`${environment.baseUrl}users/d-getSezUsers?scode=${scode}`); 
    //  .pipe(tap(scode =>alert(JSON.stringify(scode))),
    // catchError(this.errorHandler));
  }

  
  getSezCompanies(scode?:string): Observable<any>
  {
   // console.log(scode);

    if (scode) {
     // console.log(scode);

      return this._http.get(`${environment.baseUrl}company/get-CompanyList?scode=${scode}`)
    } else {
      return this._http.get(`${environment.baseUrl}company/get-CompanyList?scode=${this.dataService.scode}`)
    }
  }
  getSezVisitors(scode): Observable<any>
  {
    // console.log(scode);

    return this._http.get(`${environment.baseUrl}visitor/visitorslog?scode=${scode}`);
  }


// admin dashboard data

// to get the guards
getTotalGuards(): Observable<any> {
  // var page=page
  var role;
  if (this.dataService.role == 'admin') {
    role = 'guard'
    return this._http.get(`${environment.baseUrl}users/getUsers?role=${role}&scode=${this.dataService.scode}`);
  }

}


// to get the admins count
getTotaladmins(): Observable<any> {

  if (this.dataService.role == 'admin'||this.dataService.role == 'subadmin') {
   let role1 = 'admin';
   let role2 = 'subadmin';
    return this._http.get(`${environment.baseUrl}users/d-getSezUsers?role1=${role1}&role2=${role2}&scode=${this.dataService.scode}`);
  }

}

// to get the sez object
getSez():Observable<any>{
  return this._http.get(`${environment.baseUrl}sezs/d-TotalSezs?scode=${this.dataService.scode}`);

}

getVisitorsByWeek(dates)
{
  // console.log(dates);

  return this._http.get(`${environment.baseUrl}visitor/VisitorsByWeek?dates=${dates}`);
}
getVisitorsByMonth(year)
{
  // console.log(year);

  return this._http.get(`${environment.baseUrl}visitor/VisitorsByMonth?year=${year}&sez_code=${this.dataService.scode}`);
}
getVisitorsByYear(year):Observable<any>
{
  // console.log(year);

  return this._http.get(`${environment.baseUrl}visitor/VisitorsByYear?year=${year}`);
}
//  to get the total noofvisitors

gettotal_visitors(scode?:string){
  if(scode){
    // console.log(scode);

    return this._http.get(`${environment.baseUrl}visitor/get_noofvisitors?sez_code=${scode}`)

  }
  else{
    return this._http.get(`${environment.baseUrl}visitor/get_noofvisitors?sez_code=${this.dataService.scode}`)

  }
}

// to get the totalvisitors weekly wise

getvisitorsweek(dates){

  return this._http.get(`${environment.baseUrl}visitor/sez_visitorsRange?dates=${dates}&sez_code=${this.dataService.scode}`);

}
// to get the total no.ofvisitors monthly wise

getVisitorsmonthwise(year){
  return this._http.get(`${environment.baseUrl}visitor/VisitorsByMonthsez?year=${year}&sez_code=${this.dataService.scode}`);
}
// to get the total no. of visitors yearly wise

getVisitorsyearwise(year){
  return this._http.get(`${environment.baseUrl}visitor/VisitorsByYearsez?year=${year}&sez_code=${this.dataService.scode}`);
}
//to get total visitors count
fetchTotalVisitorsCount(){

  return this._http.get(`${environment.baseUrl}visitor/AllVisitors`);

}


//visitorbymonth

visitorbymonth(){
  return this._http.get(`${environment.baseUrl}visitor/sez_visitorsRange`)
}





//visitors count api
visitorscount(){
 return this._http.get(`${environment.baseUrl}visitor/get/count`)
}
//companys count api
companycount(){
 return this._http.get(`${environment.baseUrl}company/comp/count`)
}

}
