import { HttpEvent, HttpHandler, HttpHeaders, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthinterceptorService implements HttpInterceptor {

  constructor() { }
  intercept(req : HttpRequest<any> , next : HttpHandler ):Observable<HttpEvent<any>>
  {
    //  get token from localstorge
    var signedToken = localStorage.getItem('token');

    // if the token is there,
    //  add the token to the req obj and forward it to next interceptor or api
    // console.log(req['url'].indexOf('http://portal2.prospectatech.com/epwebservices/v1/updateCompanyDetail'));
    if(signedToken && req['url'].indexOf('http://portal2.prospectatech.com/epwebservices/v1/updateCompanyDetail')== -1)
    {
      // console.log(signedToken);
      
      // console.log(req);
        var clonedReqObj =req.clone({
          headers : req.headers.set("Authorization","Bearer "+signedToken)
        });
        // console.log("cloned req obj is",clonedReqObj);
        return next.handle(clonedReqObj);
        
    }
    else if(signedToken && req['url'].indexOf('http://portal2.prospectatech.com/epwebservices/v1/updateCompanyDetail') == 0){

     

      
      return next.handle(clonedReqObj);
    }
    // if token is not found
    else
    {
      return next.handle(req);
    }

  
  }

}
