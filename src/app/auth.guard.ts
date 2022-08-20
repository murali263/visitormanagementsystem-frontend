import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { GlobalService } from './services/global.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private _gservice : GlobalService, private router : Router){

  }
  canActivate():boolean{
    if(this._gservice.getToken()){
     return true
    }
    else{
      this.router.navigate(['/login']);
      return false
    }
  }
   
  
  
}
