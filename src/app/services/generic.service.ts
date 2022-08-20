import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenericService {
  public dataforchgpwd
  public email
  public role
  public firstname
  public lastname
  public username 
  public phone 
  public scode 
  public showtopnav:boolean =false;
  public searchkeyword;
  public activated;
  public page;
  public limit;
  public companyId;
  public uid;
  public isDeleted;
  public token;
  // public loggedinUserName:any;
  
  constructor() { }
}
