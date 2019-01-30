import { Injectable,Injector } from '@angular/core';
import {AuthService} from '../auth.service';
import {
  HttpEvent, 
  HttpInterceptor, 
  HttpHandler, 
  HttpRequest,
   HttpUserEvent, HttpErrorResponse, HttpResponse 
} from '@angular/common/http'


import {throwError as observableThrowError,  Observable ,  BehaviorSubject } from 'rxjs';

import {take,tap, filter, catchError, switchMap, finalize} from 'rxjs/operators';


@Injectable()//{providedIn: 'root'}

export class InterceptService  implements HttpInterceptor {
 public user_name:any;
 public token :any;
 public user:any;
    isRefreshingToken: boolean=false
    tokenSubject: BehaviorSubject<string> = new BehaviorSubject<string>(null);
 

    constructor(private authService: AuthService,private injector: Injector) { }
    
    addToken(req: HttpRequest<any>, token: string): HttpRequest<any> {
        return req.clone({ setHeaders: { Authorization: 'Bearer ' +token }})
    }

	// intercept request,CHECK EXP and add token
  	intercept(request: HttpRequest<any>, next: HttpHandler):Observable<HttpEvent<any>> {

    
	  console.log("----request----");
      let length= request.urlWithParams.length;
      console.log(length)
      let user_name=request.urlWithParams.split('/').pop();
     
     let token=sessionStorage.getItem('temp_token');
     console.log('FROM INTERCEPTOR : '+user_name+' '+token);
	  
		 console.log("--- end of request---");
 

	    return next.handle(this.addToken(request, token))
	    .pipe(
	        tap(event => {
	          if (event instanceof HttpResponse) {
	             
	            console.log(" all looks good");
				console.log(event.status);
				
	          }
	        }, error => {

				if (error instanceof HttpErrorResponse) {
                    switch ((<HttpErrorResponse>error).status) {
                        case 403:
                            return this.handle403Error(error);
                        case 401:
                            return this.handle401Error(request, next);
                        default:
                            return observableThrowError(error);
                    }
                } else {
                    return observableThrowError(error);
                }
					 

				}
	          
	        )
	      )

    };
    handle403Error(error) {
        if (error && error.status === 403  ||error.error || error.error.error === 'invalid_grant') {
            // If we get a 400 and the error message is 'invalid_grant', the token is no longer valid so logout.
            console.log("invalid grant OR no token");
            console.log(error);
        }

        return observableThrowError(error);
    }

    handle401Error(req: HttpRequest<any>, next: HttpHandler) {
        if (!this.isRefreshingToken) {
            this.isRefreshingToken = true;
            console.log("refreshing token....")
            console.log();
            this.authService.refreshToken().subscribe(data=>{
                this.token=data;
                console.log("refresh token :"+this.token);
            },error=>{
                console.log(error);
            });
            

            // Reset here so that the following requests wait until the token
            // comes back from the refreshToken call.
         
        }
    }
  
 
}
