import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment'


@Injectable({
  providedIn: 'root'
})
export class ProfilepageService {

  constructor( private _http:HttpClient) { }


  fetchProfile(user):Observable<any>
  {
    //console.log(user);
    
    return this._http.get(`${environment.baseUrl}users/profile?username=${user}`);

  }

  deleteprofilepic(data):Observable<any>{
   return this._http.delete(`${environment.baseUrl}files/remove`,data)
  }

  uploadProfilePic(data):Observable<any>
  {
    // console.log(data)
    return this._http.post(`${environment.baseUrl}files/upload`,data);
  }
  

  fetchProfilePic(loggedUsername):Observable<any>
  {
    // console.log(loggedUsername);
    
    return this._http.get(`${environment.baseUrl}files/uploaded/pic?username=${loggedUsername}`,{responseType:'blob'});

  }


   //get citys 

   fetchcitysstates():Observable<any>{
    return this._http.get(`${environment.baseUrl}statescitys/getcitys`)
   }

  

}
